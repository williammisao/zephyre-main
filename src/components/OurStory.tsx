import { motion } from 'motion/react';
import { Heart, Target, Users, Zap } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-brand-bg text-white pt-24 pb-32">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
            Our Story
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Born from faith, forged in discipline, built to honor the gift of breath.
          </p>
        </motion.div>

        {/* Main Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="border-l-4 border-brand-accent pl-8 py-4">
            <h2 className="text-3xl font-black italic tracking-tight mb-6">The Beginning</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Zephyr was born from a simple yet powerful conviction: that our bodies are temples, 
              gifts to be honored through discipline, strength, and purpose. In 2023, we set out 
              to create more than just apparel—we aimed to build a movement.
            </p>
            <p className="text-white/70 leading-relaxed">
              Every stitch, every design, every piece carries the weight of this mission. We believe 
              that what you wear should reflect who you are and who you're becoming.
            </p>
          </div>

          <div className="border-l-4 border-brand-accent pl-8 py-4">
            <h2 className="text-3xl font-black italic tracking-tight mb-6">Our Foundation</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Rooted in faith and driven by excellence, Zephyr stands at the intersection of 
              performance and purpose. We draw inspiration from the breath of life itself—Zephyr, 
              the gentle yet powerful wind that sustains and strengthens.
            </p>
            <p className="text-white/70 leading-relaxed">
              Our designs are crafted for those who refuse to settle, who push boundaries, and who 
              understand that true strength comes from within. We're not just building a brand; 
              we're building a legacy.
            </p>
          </div>

          <div className="border-l-4 border-brand-accent pl-8 py-4">
            <h2 className="text-3xl font-black italic tracking-tight mb-6">The Process</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              "Trust the Process" isn't just our motto—it's our way of life. Every product undergoes 
              rigorous testing, every design is refined through countless iterations, and every decision 
              is made with intention.
            </p>
            <p className="text-white/70 leading-relaxed">
              We source premium materials, partner with ethical manufacturers, and ensure that every 
              piece meets our uncompromising standards. Because when you trust the process, excellence 
              becomes inevitable.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="bg-white/[0.02] border-y border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter text-center mb-20"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-brand-accent flex items-center justify-center">
                <Heart className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Faith</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Rooted in spiritual strength and guided by purpose beyond ourselves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-brand-accent flex items-center justify-center">
                <Target className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Excellence</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Uncompromising quality in every detail, every stitch, every decision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-brand-accent flex items-center justify-center">
                <Users className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Community</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Building a tribe of warriors united by shared values and vision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-brand-accent flex items-center justify-center">
                <Zap className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Performance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Engineered for those who demand more from themselves and their gear.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center border border-white/10 p-16 bg-white/[0.02]"
        >
          <h2 className="text-[80px] font-black italic tracking-tighter opacity-5 uppercase mb-[-40px]">
            TRUST THE PROCESS
          </h2>
          <p className="text-2xl italic text-white/80 mb-8 leading-relaxed">
            "Wait on the LORD; be of good courage, and He shall strengthen your heart."
          </p>
          <span className="text-brand-accent text-[10px] font-black tracking-[0.5em] uppercase px-4 py-2 border border-brand-accent/20">
            Psalm 27:14
          </span>
        </motion.div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8">
            Join The Movement
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Zephyr is more than apparel—it's a commitment to excellence, a declaration of faith, 
            and a community of warriors. Are you ready to trust the process?
          </p>
          <a
            href="/shop"
            className="inline-block px-12 py-5 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>
    </div>
  );
}
