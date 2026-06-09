import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('✅ Firebase Admin initialized');
  } catch (error) {
    console.warn('⚠️  Firebase Admin not configured. Set FIREBASE_* env variables.');
  }
}

// Auth Middleware
async function authenticateUser(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

// Admin Middleware
async function requireAdmin(req: any, res: any, next: any) {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    req.dbUser = user;
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database for now (replacing Prisma/PG for the live demo)
  let products = [
    {
      id: "trust-tshirt",
      name: "Trust T-Shirt",
      description: "Premium heavyweight cotton tee featuring the 'Trust' series design. A reminder to trust in the process and the purpose.",
      price: 999.00,
      imageUrl: "/images/t-shirts/trust-black-t-shirt.jpeg",
      category: "MEN",
      variants: [
        { id: "black", name: "Black", imageUrl: "/images/t-shirts/trust-black-t-shirt.jpeg" },
        { id: "beige", name: "Beige", imageUrl: "/images/t-shirts/trust-beige-t-shirt.jpeg" }
      ]
    }
  ];

  // ============================================
  // USER ROUTES
  // ============================================

  // Create or update user in database (called after Firebase signup)
  app.post("/api/users/create", authenticateUser, async (req, res) => {
    try {
      const { firebaseUid, email, name, photoURL } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { firebaseUid },
      });

      if (existingUser) {
        return res.status(200).json({ message: 'User already exists', user: existingUser });
      }

      // Create new user
      const user = await prisma.user.create({
        data: {
          firebaseUid,
          email,
          name,
          photoURL,
          role: 'CUSTOMER',
        },
      });

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
      console.error('Create user error:', error);
      res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
  });

  // Get current user profile
  app.get("/api/users/me", authenticateUser, async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebaseUid: req.user.uid },
        include: {
          orders: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error: any) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
  });

  // Update user profile
  app.put("/api/users/update", authenticateUser, async (req, res) => {
    try {
      const { name, username, phone } = req.body;

      // Check if username is already taken by another user (case-insensitive)
      if (username) {
        const existingUser = await prisma.user.findFirst({
          where: {
            username: {
              equals: username,
              mode: 'insensitive', // Case-insensitive comparison
            },
            firebaseUid: { not: req.user.uid },
          },
        });

        if (existingUser) {
          return res.status(400).json({ error: 'Username already taken' });
        }
      }

      // Update user
      const user = await prisma.user.update({
        where: { firebaseUid: req.user.uid },
        data: {
          name,
          username,
          phoneNumber: phone,
        },
      });

      res.json({ message: 'Profile updated successfully', user });
    } catch (error: any) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
  });

  // ============================================
  // PRODUCT ROUTES
  // ============================================
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.post("/api/admin/products", (req, res) => {
    // Admin middleware would go here
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  // ============================================
  // RUNNING GROUP ROUTES
  // ============================================

  // Register for running group
  app.post("/api/running-group/register", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, experience, goals } = req.body;

      // Check if already registered
      const existing = await prisma.runningGroupMember.findUnique({
        where: { email },
      });

      if (existing) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const member = await prisma.runningGroupMember.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          experience,
          goals,
        },
      });

      res.status(201).json({ message: 'Registration successful', member });
    } catch (error: any) {
      console.error('Running group registration error:', error);
      res.status(500).json({ error: 'Failed to register', details: error.message });
    }
  });

  // Get all running group members (admin only)
  app.get("/api/admin/running-group/members", authenticateUser, requireAdmin, async (req, res) => {
    try {
      const members = await prisma.runningGroupMember.findMany({
        orderBy: { createdAt: 'desc' },
      });

      res.json(members);
    } catch (error: any) {
      console.error('Get members error:', error);
      res.status(500).json({ error: 'Failed to fetch members', details: error.message });
    }
  });

  // ============================================
  // ORDER ROUTES
  // ============================================

  // Create order (authenticated users only)
  app.post("/api/orders/create", authenticateUser, async (req, res) => {
    try {
      const { items, shippingAddress, totalAmount, paymentId } = req.body;

      // Find user in database
      const user = await prisma.user.findUnique({
        where: { firebaseUid: req.user.uid },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create order with items
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          totalAmount,
          status: 'PENDING',
          shippingAddress,
          paymentId,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error: any) {
      console.error('Create order error:', error);
      res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
  });

  // Get user's orders
  app.get("/api/orders/my-orders", authenticateUser, async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebaseUid: req.user.uid },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const orders = await prisma.order.findMany({
        where: { userId: user.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json(orders);
    } catch (error: any) {
      console.error('Get orders error:', error);
      res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
    }
  });

  // Get all orders (admin only)
  app.get("/api/admin/orders", authenticateUser, requireAdmin, async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json(orders);
    } catch (error: any) {
      console.error('Get all orders error:', error);
      res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
    }
  });

  // Update order status (admin only)
  app.patch("/api/admin/orders/:orderId/status", authenticateUser, requireAdmin, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status },
      });

      res.json({ message: 'Order status updated', order });
    } catch (error: any) {
      console.error('Update order status error:', error);
      res.status(500).json({ error: 'Failed to update order status', details: error.message });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
