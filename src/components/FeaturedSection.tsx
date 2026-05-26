import { motion } from 'motion/react';

export default function FeaturedSection() {
  const features = [
    {
      title: 'Premium Materials',
      description: 'Engineered fabrics that move with you',
      tags: ['DESIGN', 'PERFORMANCE', 'COMFORT'],
    },
    {
      title: 'Faith-Driven Design',
      description: 'Every piece tells a story of strength',
      tags: ['CONCEPT', 'BRANDING', 'PURPOSE'],
    },
    {
      title: 'Sustainable Craft',
      description: 'Built to last, made to honor',
      tags: ['QUALITY', 'ETHICS', 'DURABILITY'],
    },
  ];

  return (
    <section className="py-20 sm:py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-brand-accent text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 block">
            Our Approach
          </span>
          <h2 className="text-[40px] sm:text-[50px] md:text-[70px] lg:text-[80px] font-black tracking-tighter leading-[0.9] uppercase italic text-white mb-6 sm:mb-8">
            Bold Ideas,<br/>Brought to Life
          </h2>
          <p className="text-white/50 text-xs sm:text-sm max-w-3xl uppercase tracking-widest leading-relaxed">
            We combine design, faith, and performance to create apparel that feels visually striking and technically seamless. From training sessions to daily wear, we build pieces that capture attention and inspire dedication.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border border-white/10 p-6 sm:p-8 hover:border-brand-accent/50 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.05]"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {feature.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[8px] font-black uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3 sm:mb-4 group-hover:text-brand-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm mb-4 sm:mb-6 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
