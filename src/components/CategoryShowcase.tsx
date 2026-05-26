import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CategoryShowcase() {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate('/shop');
  };

  const categories = [
    {
      title: 'Men\'s Collection',
      description: 'Built for strength',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=1000&fit=crop',
    },
    {
      title: 'Women\'s Collection',
      description: 'Designed for power',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop',
    },
  ];

  return (
    <section className="py-20 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={goToShop}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden border border-white/10 hover:border-brand-accent/50 transition-all cursor-pointer text-left"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <span className="text-brand-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3 block">
                    {category.description}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white mb-4 sm:mb-6">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-white group-hover:text-brand-accent transition-colors">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest">Explore Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 transition-all duration-500" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
