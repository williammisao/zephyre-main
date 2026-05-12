import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { Product, useCartStore, Variant } from '../store/useCartStore';

export default function ProductDetailView() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedVariant(data.variants?.[0]);
        setLoading(false);
      });
      window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-white">
        <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Loading Arsenal...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg text-white px-4">
        <h2 className="text-4xl font-black italic tracking-tighter mb-4">PRODUCT NOT FOUND</h2>
        <Link to="/" className="text-brand-accent font-black uppercase tracking-widest text-xs border-b border-brand-accent pb-1">Back to Collections</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Home / {product.category} / {product.name}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Main Image View */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/5] bg-white/5 overflow-hidden border border-white/10">
              <img 
                src={selectedVariant ? selectedVariant.imageUrl : product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Gallery / Variants Icons */}
            {product.variants && (
                <div className="grid grid-cols-4 gap-4">
                    {product.variants.map((v) => (
                        <button 
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`aspect-square border-2 transition-all overflow-hidden ${selectedVariant?.id === v.id ? 'border-brand-accent' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                        >
                            <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
          </motion.div>

          {/* Product Detail Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em]">{product.category}</span>
                    <div className="flex items-center gap-1 ml-4 border-l border-white/10 pl-4">
                        <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
                        <span className="text-[11px] font-black italic">4.9 / 5.0 (280 Reviews)</span>
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-6">
                    {product.name}
                </h1>
                <div className="text-4xl font-black text-brand-accent tracking-tighter mb-8 italic">
                    ₹{product.price.toLocaleString('en-IN')}
                </div>
                <p className="text-white/50 text-sm font-medium leading-relaxed max-w-md">
                    {product.description}
                </p>
            </div>

            {/* Variant Picking Table */}
            <div className="mb-10">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Select Variant</span>
                <div className="flex flex-wrap gap-3">
                    {product.variants?.map((v) => (
                        <button 
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-6 py-3 border text-[11px] font-black uppercase tracking-widest transition-all ${selectedVariant?.id === v.id ? 'border-brand-accent bg-brand-accent text-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                        >
                            {v.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity and CTA */}
            <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <div className="flex items-center border border-white/10 h-14 px-4 bg-white/5">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:text-brand-accent transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-12 text-center font-black text-xl">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:text-brand-accent transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button 
                        onClick={() => {
                            for(let i=0; i<quantity; i++) {
                                addItem(product, selectedVariant);
                            }
                        }}
                        className="flex-1 h-14 bg-white text-brand-bg flex items-center justify-center gap-3 font-black uppercase tracking-[0.3em] text-sm hover:bg-brand-accent hover:text-white transition-all transform active:scale-95"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Arsenal
                    </button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/40">
                    <ShieldCheck className="w-5 h-5 text-brand-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Lifetime Strength<br/>Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-white/40">
                    <Truck className="w-5 h-5 text-brand-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Express Performance<br/>Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-white/40">
                    <RefreshCcw className="w-5 h-5 text-brand-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Zero-Hassle<br/>Ethos Returns</span>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy Callout in Detail */}
      <div className="mt-32 border-t border-white/10 py-32 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center px-4">
             <h2 className="text-[80px] font-black italic tracking-tighter opacity-5 uppercase mb-[-40px]">TRUST THE PROCESS</h2>
             <p className="text-lg italic text-white/60 mb-6 leading-relaxed">
                "Wait on the LORD; be of good courage, and He shall strengthen your heart."
             </p>
             <span className="text-brand-accent text-[10px] font-black tracking-[0.5em] uppercase px-4 py-2 border border-brand-accent/20">Psalm 27:14</span>
        </div>
      </div>
    </div>
  );
}
