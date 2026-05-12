import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marcus Johnson',
      role: 'Fitness Coach',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      rating: 5,
      text: 'The quality is unmatched. Every piece feels premium and performs even better. This is what faith-driven excellence looks like.',
    },
    {
      name: 'Sarah Mitchell',
      role: 'CrossFit Athlete',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 5,
      text: 'Finally found apparel that aligns with my values and performs at the highest level. The attention to detail is incredible.',
    },
    {
      name: 'David Chen',
      role: 'Personal Trainer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      rating: 5,
      text: 'Zephyr has become my go-to brand. The fit, the message, the quality - everything speaks to who I am and what I stand for.',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-[50px] md:text-[80px] font-black tracking-tighter leading-[0.9] uppercase italic text-white mb-6">
            Trusted by<br/>Warriors
          </h2>
          <p className="text-white/50 text-sm max-w-2xl mx-auto uppercase tracking-widest">
            Real stories from real people who trust Zephyr
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-white/[0.02] border border-white/10 p-8 hover:border-brand-accent/30 transition-all group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-accent/10 group-hover:text-brand-accent/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-black uppercase tracking-tight text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
