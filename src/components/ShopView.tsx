import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal, Grid3x3, LayoutGrid, X } from 'lucide-react';
import ProductCard from './ProductCard';
import AnimatedBackground from './AnimatedBackground';
import { Product } from '../store/useCartStore';

export default function ShopView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<number>(3);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ['ALL', 'MEN', 'WOMEN', 'ACCESSORIES'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'ALL' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return 0; // Would use createdAt if available
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-32 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">
            Full Collection
          </span>
          <h1 className="text-[60px] md:text-[100px] font-black tracking-tighter leading-[0.85] uppercase italic text-white mb-6">
            THE<br/>ARSENAL
          </h1>
          <p className="text-white/50 text-sm max-w-2xl mx-auto uppercase tracking-widest">
            Premium performance apparel engineered for warriors
          </p>
        </motion.div>

        {/* Filters & Controls Bar */}
        <div className="mb-12 space-y-6">
          {/* Top Bar - Mobile Filter Toggle & Grid Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 border border-white/10 text-white hover:border-brand-accent transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Filters</span>
              </button>

              {/* Results Count */}
              <span className="text-white/40 text-xs font-black uppercase tracking-widest">
                {sortedProducts.length} Products
              </span>
            </div>

            {/* Grid Controls & Sort */}
            <div className="flex items-center gap-4">
              {/* Grid Layout Toggle */}
              <div className="hidden md:flex items-center gap-2 border border-white/10 p-1">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-2 ${gridCols === 2 ? 'bg-brand-accent text-white' : 'text-white/40 hover:text-white'} transition-colors`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 ${gridCols === 3 ? 'bg-brand-accent text-white' : 'text-white/40 hover:text-white'} transition-colors`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-brand-bg">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Filters - Always Visible */}
          <div className="hidden lg:flex items-center gap-4 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === category
                    ? 'bg-brand-accent text-white'
                    : 'border border-white/10 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Filters - Collapsible */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border border-white/10 p-6 bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5 text-white/50 hover:text-white" />
                </button>
              </div>
              <div className="space-y-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`w-full px-4 py-3 text-xs font-black uppercase tracking-widest transition-all text-left ${
                      selectedCategory === category
                        ? 'bg-brand-accent text-white'
                        : 'border border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5 divide-x divide-y divide-white/5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white/5 aspect-[3/4]" />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-32">
            <Filter className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
              No Products Found
            </h3>
            <p className="text-white/40 text-sm uppercase tracking-widest mb-8">
              Try adjusting your filters
            </p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="px-8 py-4 bg-brand-accent text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-bg transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-0 border border-white/10 divide-x divide-y divide-white/10`}>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More / Pagination Placeholder */}
        {sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <button className="px-12 py-5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-bg transition-all">
              Load More Products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
