import { motion } from 'motion/react';
import { ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const { currentUser } = useAuth();

  const scrollToProducts = () => {
    // Check if we're on home page
    if (window.location.pathname === '/') {
      const productsSection = document.getElementById('products-section');
      productsSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page first, then scroll
      window.location.href = '/#products-section';
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center cursor-pointer" 
          >
            <img src="/images/zephyre.PNG" alt="Zephyre Logo" className="h-8 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Shop</Link>
            <button onClick={scrollToProducts} className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Collections</button>
            <Link to="/ethos" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Ethos</Link>
            <Link to="/space" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Space</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
            {currentUser ? (
              <Link to="/account" className="hidden sm:flex items-center gap-2 hover:text-white text-white/50 transition-colors uppercase group">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-brand-accent transition-colors object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-brand-accent transition-colors bg-brand-accent/20 flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span>{currentUser.displayName?.split(' ')[0] || 'Account'}</span>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:block hover:text-white text-white/50 transition-colors uppercase">Login</Link>
            )}
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 hover:text-white text-white/50 transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
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
          className="md:hidden bg-brand-secondary border-b border-brand-primary/10 px-4 sm:px-6 py-6 space-y-4"
        >
          <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block text-base sm:text-lg font-medium w-full text-left uppercase tracking-wider">Shop All</Link>
          <button onClick={scrollToProducts} className="block text-base sm:text-lg font-medium w-full text-left uppercase tracking-wider">Collections</button>
          <Link to="/ethos" onClick={() => setIsMenuOpen(false)} className="block text-base sm:text-lg font-medium uppercase tracking-wider">Ethos</Link>
          <Link to="/space" onClick={() => setIsMenuOpen(false)} className="block text-base sm:text-lg font-medium uppercase tracking-wider">Space</Link>
          {currentUser ? (
            <Link to="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-base sm:text-lg font-medium uppercase tracking-wider sm:hidden border-t border-white/10 pt-4">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'User'} 
                  className="w-10 h-10 rounded-full border-2 border-brand-accent object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-brand-accent bg-brand-accent/20 flex items-center justify-center">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
              <span>{currentUser.displayName || 'Account'}</span>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-base sm:text-lg font-medium uppercase tracking-wider sm:hidden border-t border-white/10 pt-4">Login</Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
