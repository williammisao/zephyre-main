import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, useCartStore, Variant } from '../store/useCartStore';

// Define shirt sizes
const SHIRT_SIZES = [
  { id: 's', name: 'S', inStock: false },
  { id: 'm', name: 'M', inStock: true },
  { id: 'l', name: 'L', inStock: true },
  { id: 'xl', name: 'XL', inStock: true },
  { id: 'xxl', name: 'XXL', inStock: true },
];

// Image mapping by color variant
const COLOR_IMAGES: Record<string, string[]> = {
  'black': [
    '/images/t-shirts/trust-black-t-shirt.jpeg',
    '/images/t-shirts/trust-folded.jpeg',
  ],
  'beige': [
    '/images/t-shirts/trust-beige-t-shirt.jpeg',
    '/images/t-shirts/trust-folded.jpeg',
  ],
};

export default function ProductDetailView() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string>('m');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  // Get images based on selected variant
  const getProductImages = () => {
    if (selectedVariant) {
      const variantName = selectedVariant.name.toLowerCase();
      return COLOR_IMAGES[variantName] || [selectedVariant.imageUrl];
    }
    return [product?.imageUrl || ''];
  };

  const productImages = getProductImages();

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

  // Reset image index when variant changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedVariant]);

  const handleNextImage = () => {
    const images = getProductImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    const images = getProductImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
    <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 sm:mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Home / {product.category} / {product.name}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Main Image View */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="aspect-[4/5] bg-white/5 overflow-hidden border border-white/10 relative group">
              <img 
                src={productImages[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Navigation Buttons */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 border border-white/20 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-accent hover:border-brand-accent"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 border border-white/20 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-accent hover:border-brand-accent"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-brand-accent w-8' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Gallery / Thumbnail Navigation */}
            {productImages.length > 1 && (
              <div className={`grid gap-3 sm:gap-4 ${productImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {productImages.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square border-2 transition-all overflow-hidden ${
                      currentImageIndex === index ? 'border-brand-accent' : 'border-white/5 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
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
            <div className="mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-4">
                    <span className="text-brand-accent text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">{product.category}</span>
                    <div className="flex items-center gap-1 sm:ml-4 sm:border-l sm:border-white/10 sm:pl-4">
                        <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
                        <span className="text-[10px] sm:text-[11px] font-black italic">4.9 / 5.0 (280 Reviews)</span>
                    </div>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-4 sm:mb-6">
                    {product.name}
                </h1>
                <div className="text-3xl sm:text-4xl font-black text-brand-accent tracking-tighter mb-6 sm:mb-8 italic">
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

            {/* Size Selection */}
            <div className="mb-10">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Select Size</span>
                <div className="flex flex-wrap gap-3">
                    {SHIRT_SIZES.map((size) => (
                        <div key={size.id} className="relative group">
                            <button 
                                onClick={() => size.inStock && setSelectedSize(size.id)}
                                disabled={!size.inStock}
                                className={`px-6 py-3 border text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                  selectedSize === size.id && size.inStock
                                    ? 'border-brand-accent bg-brand-accent text-white' 
                                    : size.inStock
                                    ? 'border-white/10 text-white/40 hover:border-white/30'
                                    : 'border-white/5 text-white/20 cursor-not-allowed'
                                }`}
                            >
                                {size.name}
                                {!size.inStock && (
                                  <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="w-full h-[1px] bg-red-500 rotate-[-20deg]" />
                                  </span>
                                )}
                            </button>
                            {/* Tooltip for out of stock */}
                            {!size.inStock && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    Out of Stock
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-500" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Quantity and CTA */}
            <div className="flex flex-col gap-4 sm:gap-6 mb-10 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center justify-center border border-white/10 h-12 sm:h-14 px-4 bg-white/5">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:text-brand-accent transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-12 text-center font-black text-lg sm:text-xl">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:text-brand-accent transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button 
                        onClick={() => {
                            for(let i=0; i<quantity; i++) {
                                addItem(product, selectedVariant);
                            }
                        }}
                        className="flex-1 h-12 sm:h-14 bg-white text-brand-bg flex items-center justify-center gap-3 font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-brand-accent hover:text-white transition-all transform active:scale-95"
                    >
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        Add to Arsenal
                    </button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 sm:pt-10 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/40">
                    <ShieldCheck className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Lifetime Strength<br/>Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-white/40">
                    <Truck className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Express Performance<br/>Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-white/40">
                    <RefreshCcw className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Zero-Hassle<br/>Ethos Returns</span>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy Callout in Detail */}
      <div className="mt-20 sm:mt-24 md:mt-32 border-t border-white/10 py-20 sm:py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
             <h2 className="text-[50px] sm:text-[60px] md:text-[80px] font-black italic tracking-tighter opacity-5 uppercase mb-[-30px] sm:mb-[-40px]">TRUST THE PROCESS</h2>
             <p className="text-base sm:text-lg italic text-white/60 mb-4 sm:mb-6 leading-relaxed">
                "Wait on the LORD; be of good courage, and He shall strengthen your heart."
             </p>
             <span className="text-brand-accent text-[9px] sm:text-[10px] font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 border border-brand-accent/20 inline-block">Psalm 27:14</span>
        </div>
      </div>
    </div>
  );
}
