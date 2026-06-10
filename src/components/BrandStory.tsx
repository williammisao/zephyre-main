import { motion } from 'motion/react';
import { Heart, Target, Zap } from 'lucide-react';

export default function BrandStory() {
  const values = [
    {
      icon: Heart,
      title: 'Faith First',
      description: 'Every design rooted in purpose and conviction',
    },
    {
      icon: Target,
      title: 'Performance Driven',
      description: 'Engineered for those who demand excellence',
    },
    {
      icon: Zap,
      title: 'Built to Last',
      description: 'Quality that honors your commitment',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1000&fit=crop"
                alt="Brand Story"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-accent text-white p-8 border-4 border-brand-bg">
              <div className="text-4xl font-black italic tracking-tighter">EST.</div>
              <div className="text-5xl font-black italic tracking-tighter">2023</div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">
                Our Story
              </span>
              <h2 className="text-[50px] md:text-[70px] font-black tracking-tighter leading-[0.9] uppercase italic text-white mb-6">
                Forged in<br/>Faith
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Zephyre was born from a simple belief: your body is a temple, and what you wear should honor that truth. We're not just another fitness brand—we're a movement of warriors who train with purpose.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Every stitch, every fabric choice, every design element is intentional. We create apparel that performs at the highest level while carrying a message that matters.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6 pt-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent/20 transition-all">
                    <value.icon className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-white/50">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
