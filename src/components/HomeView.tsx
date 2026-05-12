import { useState, useEffect } from 'react';
import Hero from './Hero';
import ProductCard from './ProductCard';
import { motion } from 'motion/react';
import { Product } from '../store/useCartStore';

export default function HomeView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-[60px] md:text-[100px] font-black text-brand-primary tracking-tighter leading-[0.85] uppercase italic mb-6">
              THE <br/>ARSENAL
            </h2>
            <p className="text-white/40 font-medium text-sm max-w-md uppercase tracking-widest">
              Performance engineered for those who treat their body as a temple. No compromises.
            </p>
          </div>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest">
            <button className="text-white border-b-2 border-brand-accent pb-2">New Arrivals</button>
            <button className="text-white/30 hover:text-white transition-colors border-b-2 border-transparent pb-2">Top Performance</button>
          </div>
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
      </section>

      {/* Philosophy Banner */}
      <section className="bg-white/5 py-40 overflow-hidden relative border-y border-white/10">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
           <div className="text-[300px] font-black leading-none text-white select-none translate-y-1/4 italic tracking-tighter">TEMPLE</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
             <div className="italic text-white text-3xl md:text-5xl font-italic font-light mb-12 leading-tight">
               "Your body is a temple of the Holy Spirit who is in you."
             </div>
             <div className="text-brand-accent text-xs font-black tracking-[0.6em] uppercase">1 CORINTHIANS 6:19</div>
        </div>
      </section>
    </>
  );
}
