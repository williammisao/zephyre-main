import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import ProductCard from './ProductCard';
import FeaturedSection from './FeaturedSection';
import StatsSection from './StatsSection';
import CategoryShowcase from './CategoryShowcase';
import BrandStory from './BrandStory';
import TestimonialsSection from './TestimonialsSection';
import NewsletterSection from './NewsletterSection';
import { motion } from 'motion/react';
import { Product } from '../store/useCartStore';

export default function HomeView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToShop = () => {
    navigate('/shop');
  };

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Hero />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Collection Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em] mb-4 block"
            >
              Featured Collection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[60px] md:text-[100px] font-black text-brand-primary tracking-tighter leading-[0.85] uppercase italic mb-6"
            >
              THE <br/>ARSENAL
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 font-medium text-sm max-w-md uppercase tracking-widest"
            >
              Performance engineered for those who treat their body as a temple. No compromises.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-8 text-[11px] font-black uppercase tracking-widest"
          >
            <button className="text-white border-b-2 border-brand-accent pb-2">New Arrivals</button>
            <button className="text-white/30 hover:text-white transition-colors border-b-2 border-transparent pb-2">Top Performance</button>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5 divide-x divide-y divide-white/5">
            {[1].map((i) => (
              <div key={i} className="animate-pulse bg-white/5 aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 divide-x divide-y divide-white/10">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={goToShop}
            className="px-16 py-5 bg-white text-brand-bg font-black uppercase tracking-[0.3em] text-sm hover:bg-brand-accent hover:text-white transition-all transform hover:scale-105"
          >
            View All Products
          </button>
        </motion.div>
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Brand Story */}
      <BrandStory />

      {/* Featured Section - Lusion Style */}
      <FeaturedSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Philosophy Banner */}
      <section className="bg-white/5 py-40 overflow-hidden relative border-y border-white/10">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
           <div className="text-[300px] font-black leading-none text-white select-none translate-y-1/4 italic tracking-tighter">TEMPLE</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="italic text-white text-3xl md:text-5xl font-italic font-light mb-12 leading-tight"
             >
               "Your body is a temple of the Holy Spirit who is in you."
             </motion.div>
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="text-brand-accent text-xs font-black tracking-[0.6em] uppercase"
             >
               1 CORINTHIANS 6:19
             </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Bold CTA Section - Lusion Style */}
      <section className="py-40 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-[40px] md:text-[80px] lg:text-[120px] font-black tracking-tighter leading-[0.9] uppercase italic text-white mb-12">
              WHERE STRENGTH<br/>MEETS PURPOSE
            </h2>
            <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto mb-16 uppercase tracking-widest">
              We don't chase trends. We create performance apparel that reflects your dedication, engages your spirit, and makes you remember why you started.
            </p>
            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-accent text-white px-16 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-bg transition-all"
            >
              Explore the Collection
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
