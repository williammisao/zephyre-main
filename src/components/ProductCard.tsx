import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { Product, useCartStore, Variant } from '../store/useCartStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(product.variants?.[0]);
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative flex flex-col bg-brand-bg border border-white/10 overflow-hidden cursor-pointer hover:bg-white/5 transition-colors p-6"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5 mb-6">
        <img 
          src={selectedVariant ? selectedVariant.imageUrl : product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 shadow-2xl"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick Badge */}
        <div className="absolute bottom-2 left-2 bg-brand-bg/80 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
          Limited Edition
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 text-white">
          <h3 className="text-sm font-black uppercase tracking-tight">
            {product.name}
          </h3>
          <span className="font-black text-sm text-brand-accent">₹{product.price.toLocaleString('en-IN')}</span>
        </div>

        {/* Variants Selection */}
        {product.variants && (
          <div className="flex gap-2 mt-2 mb-6">
            {product.variants.map((v) => (
              <button 
                key={v.id}
                onClick={(e) => { e.stopPropagation(); setSelectedVariant(v); }}
                className={`text-[9px] font-black uppercase px-2 py-1 border ${selectedVariant?.id === v.id ? 'border-brand-accent text-white' : 'border-white/10 text-white/30'} transition-all`}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-end mt-auto">
          <span className="text-xs text-white/50 italic font-italic">{product.category}</span>
        </div>

        {/* Button Overlay */}
        <button 
          onClick={(e) => { e.stopPropagation(); addItem(product, selectedVariant); }}
          className="mt-6 w-full py-4 bg-brand-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform active:scale-95"
        >
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
}
