import { motion } from 'motion/react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex-shrink-0 flex items-center cursor-pointer" 
          >
            <img src="/images/zephyre.PNG" alt="Zephyr Logo" className="h-8 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Shop</a>
            <a href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Collections</a>
            <a href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Ethos</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-[11px] font-bold uppercase tracking-widest">
            <button className="hover:text-white text-white/50 transition-colors uppercase">Account</button>
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-2 hover:text-white text-white/50 transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-white text-brand-bg px-1.5 py-0.5 rounded-full text-[9px] font-black">
                  {cartItemsCount.toString().padStart(2, '0')}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 hover:bg-brand-primary/5 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-secondary border-b border-brand-primary/10 px-4 py-6 space-y-4"
        >
          <a href="#" className="block text-lg font-medium">Shop All</a>
          <a href="#" className="block text-lg font-medium">Men</a>
          <a href="#" className="block text-lg font-medium">Women</a>
          <a href="#" className="block text-lg font-medium">Vision</a>
        </motion.div>
      )}
    </nav>
  );
}
