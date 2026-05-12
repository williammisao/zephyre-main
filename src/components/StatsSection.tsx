import { motion } from 'motion/react';
import { TrendingUp, Users, Award, Package } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '10K+',
      label: 'Active Members',
      description: 'Building strength daily',
    },
    {
      icon: Package,
      value: '50K+',
      label: 'Products Delivered',
      description: 'Worldwide shipping',
    },
    {
      icon: Award,
      value: '4.9/5',
      label: 'Customer Rating',
      description: 'Trusted quality',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Satisfaction Rate',
      description: 'Happy customers',
    },
  ];

  return (
    <section className="py-24 bg-white/[0.02] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-brand-accent/10 border border-brand-accent/20 group-hover:bg-brand-accent/20 transition-all">
                <stat.icon className="w-7 h-7 text-brand-accent" />
              </div>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 italic">
                {stat.value}
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-white/70 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
