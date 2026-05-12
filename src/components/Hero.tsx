import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/10 mt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
          alt="Gym Hero" 
          className="w-full h-full object-cover opacity-20 grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[80px] md:text-[160px] font-black leading-[0.8] tracking-tighter uppercase italic text-brand-primary">
            STRENGTH<br/>REBORN
          </h1>
          <p className="mt-8 text-[11px] md:text-sm uppercase tracking-[0.4em] font-medium text-white/70">
            Engineered for the Temple &bull; Est. 2023
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-brand-primary text-brand-bg px-12 py-4 text-[12px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all transform hover:scale-105">
              Shop Men
            </button>
            <button className="border border-white/30 text-white px-12 py-4 text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105">
              Shop Women
            </button>
          </div>
        </motion.div>

        {/* Floating Scripture */}
        <div className="absolute bottom-[-100px] left-0 md:bottom-8 md:left-10 flex flex-col gap-1 items-start text-left">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Current Message</span>
          <span className="text-xs font-italic italic text-white/80 max-w-xs">
            "I can do all things through Him who strengthens me."
          </span>
        </div>
      </div>
    </section>
  );
}
