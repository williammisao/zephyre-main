import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';
import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-32 relative overflow-hidden border-y border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-brand-accent/10 border border-brand-accent/20">
            <Mail className="w-10 h-10 text-brand-accent" />
          </div>

          {/* Heading */}
          <h2 className="text-[40px] md:text-[70px] font-black tracking-tighter leading-[0.9] uppercase italic text-white mb-6">
            Join the<br/>Movement
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-12 uppercase tracking-widest leading-relaxed">
            Get exclusive access to new drops, faith-driven content, and special offers. Be part of the Zephyre family.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL ADDRESS"
              required
              className="flex-1 px-6 py-5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-brand-accent text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-bg transition-all flex items-center justify-center gap-3"
            >
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Privacy Note */}
          <p className="text-white/30 text-xs mt-6 uppercase tracking-wider">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
