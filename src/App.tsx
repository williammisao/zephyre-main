import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import Ethos from './components/Ethos';
import RunningGroup from './components/RunningGroup';
import CheckoutPage from './components/CheckoutPage';
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CartSidebar from './components/CartSidebar';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import { Toaster } from 'react-hot-toast';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <SmoothScroll />
        <ScrollToTop />
        <main className="min-h-screen">
          {/* <CustomCursor /> */}
          <Toaster position="bottom-right" />
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/shop" element={<ShopView />} />
            <Route path="/product/:id" element={<ProductDetailView />} />
            <Route path="/ethos" element={<Ethos />} />
            <Route path="/space" element={<RunningGroup />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>

          {/* Footer */}
          <footer className="bg-brand-bg py-32 border-t border-white/10 overflow-hidden relative">
          {/* Animated Background Text */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[120px] md:text-[200px] font-black italic opacity-[0.02] pointer-events-none"
          >
            ZEPHYRE • STRENGTH • FAITH • ZEPHYRE • STRENGTH • FAITH •
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-2">
                <img src="/images/zephyre.PNG" alt="Zephyre Logo" className="h-12 w-auto brightness-0 invert mb-8" />
                <p className="text-white/40 max-w-sm mb-12 text-[11px] uppercase tracking-[0.2em] font-bold leading-relaxed">
                  Elite performance apparel rooted in faith. Forged in the furnace of discipline. Built to honor the gift of breath.
                </p>
                <div className="flex gap-8">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black border-b border-white/20 pb-1 cursor-pointer hover:border-brand-accent transition-colors">Instagram</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black border-b border-white/20 pb-1 cursor-pointer hover:border-brand-accent transition-colors">Twitter</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black border-b border-white/20 pb-1 cursor-pointer hover:border-brand-accent transition-colors">Vimeo</span>
                </div>
              </div>
              <div>
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px] mb-10 text-brand-accent">Logistics</h3>
                <ul className="space-y-6 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Supply Chain</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Performance Test</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Fulfillment</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Global Export</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px] mb-10 text-brand-accent">Kingdom</h3>
                <ul className="space-y-6 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">The Vision</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Ethos Core</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Our Creators</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Legacy Program</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 gap-8">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 text-center md:text-left">
                  &copy; 2023 ZEPHYRE APPAREL GROUP. FORGED IN FAITH &bull; ESTABLISHED 2023.
                </span>
                <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                   <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                   <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
                   <span className="cursor-pointer hover:text-white transition-colors">Cookies</span>
                </div>
            </div>
          </div>
        </footer>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
