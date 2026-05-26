import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100vh] h-screen flex items-center justify-center overflow-hidden border-b border-white/10 mt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Photos/Home_pg.JPG.jpeg" 
          alt="Gym Hero" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-black leading-[0.8] tracking-tighter uppercase italic text-brand-primary">
            STRENGTH<br/>REBORN
          </h1>
          <p className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] font-medium text-white/70 px-4">
            Engineered for the Temple &bull; Est. 2023
          </p>

          {/* Scripture Message */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-1 items-center text-center px-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Current Message</span>
            <span className="text-[11px] sm:text-xs font-italic italic text-white/80 max-w-xs">
              "I can do all things through Him who strengthens me."
            </span>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <button 
              onClick={scrollToProducts}
              className="w-full sm:w-auto bg-brand-primary text-brand-bg px-8 sm:px-12 py-3 sm:py-4 text-[11px] sm:text-[12px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all transform hover:scale-105"
            >
              Shop Men
            </button>
            <button 
              onClick={scrollToProducts}
              className="w-full sm:w-auto border border-white/30 text-white px-8 sm:px-12 py-3 sm:py-4 text-[11px] sm:text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105"
            >
              Shop Women
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
