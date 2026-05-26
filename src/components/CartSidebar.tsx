import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, updateQuantity, removeItem, total } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-brand-bg z-[70] shadow-2xl flex flex-col border-l border-white/10 text-brand-primary"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-brand-bg">
              <div className="flex items-center gap-2 sm:gap-3">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                <h2 className="font-display text-lg sm:text-xl font-black tracking-tighter uppercase italic">Your Bag</h2>
                <span className="bg-white text-brand-bg text-[9px] px-1.5 py-0.5 rounded-full font-black">
                  {items.length.toString().padStart(2, '0')}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 divide-y divide-white/10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <ShoppingBag className="w-12 h-12 mb-4" />
                  <p className="text-sm font-black uppercase tracking-widest leading-none">Bag is Empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedVariant?.id}`} className="flex gap-6 group pt-8 first:pt-0">
                    <div className="w-20 h-28 bg-white/5 overflow-hidden flex-shrink-0">
                      <img 
                        src={item.selectedVariant?.imageUrl || item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-black uppercase tracking-tight leading-tight">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id, item.selectedVariant?.id)}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-tighter font-black">
                          {item.selectedVariant ? `${item.selectedVariant.name} Variant` : item.category}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-white/10 px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant?.id)}
                            className="p-1 hover:text-brand-accent transition-colors"
                          >
                            <Minus className="w-2 h-2" />
                          </button>
                          <span className="w-6 text-center text-[10px] font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant?.id)}
                            className="p-1 hover:text-brand-accent transition-colors"
                          >
                            <Plus className="w-2 h-2" />
                          </button>
                        </div>
                        <span className="font-black text-sm text-brand-accent font-display">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-white/10 bg-white/5 space-y-4 sm:space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">Subtotal</span>
                <span className="text-xl sm:text-2xl font-black tracking-tighter italic">₹{total().toLocaleString('en-IN')}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full py-4 sm:py-5 bg-brand-primary text-brand-bg font-black uppercase tracking-[0.3em] text-[11px] sm:text-[12px] hover:bg-brand-accent hover:text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
