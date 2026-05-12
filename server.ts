import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      price: 1999.00,
      imageUrl: "/images/t-shirts/trust-black-t-shirt.jpeg",
      category: "MEN",
      variants: [
        { id: "black", name: "Black", imageUrl: "/images/t-shirts/trust-black-t-shirt.jpeg" },
        { id: "beige", name: "Beige", imageUrl: "/images/t-shirts/trust-beige-t-shirt.jpeg" }
      ]
    }
  ];

  // API Routes
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
