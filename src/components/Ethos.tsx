import { motion } from 'motion/react';
import { Heart, Target, Users, Zap, Calendar, Award, TrendingUp } from 'lucide-react';

export default function Ethos() {
  return (
    <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.9] mb-6 sm:mb-8">
            Our Story
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed px-4">
            IT'S YOU VS YOU
          </p>
        </motion.div>

        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8 sm:space-y-12"
        >
          <div className="border-l-4 border-brand-accent pl-6 sm:pl-8 py-4">
            <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight mb-4 sm:mb-6">Introduction</h2>
            <p className="text-white/70 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Zephyre is inspired by <span className="text-brand-accent font-bold">Zephyrus</span>, the Greek spirit of a light, flowing wind symbolizing movement, change, and energy. More than a fitness clothing brand, Zephyre represents a mindset: a commitment to consistency, discipline, and the pursuit of limitless potential.
            </p>
            <p className="text-white/70 leading-relaxed text-sm sm:text-base">
              Designed to evolve with you, our apparel adapts to your journey supporting both performance and personal transformation. Zephyre is for those shaping not just their physique, but their lifestyle.
            </p>
          </div>

          <div className="border-l-4 border-brand-accent pl-6 sm:pl-8 py-4">
            <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight mb-4 sm:mb-6">Our Foundation</h2>
            <p className="text-white/70 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Zephyre was founded on <span className="text-brand-accent font-bold">28th August 2023</span> with a vision to build and inspire a dedicated fitness community through purpose driven apparel. This portfolio reflects the foundation of a brand built with purpose, creativity, and long term vision.
            </p>
            <p className="text-white/70 leading-relaxed text-sm sm:text-base">
              Our mission is to develop products that not only meet market needs, but also contribute toward a healthier, more positive, and community driven future.
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-white/5 p-4 sm:p-6 border border-white/10">
                <p className="text-white/40 uppercase tracking-wider mb-2 text-[10px] sm:text-xs">Founder</p>
                <p className="font-black text-brand-accent text-sm sm:text-base">ALEXIS HAOKIP</p>
              </div>
              <div className="bg-white/5 p-4 sm:p-6 border border-white/10">
                <p className="text-white/40 uppercase tracking-wider mb-2 text-[10px] sm:text-xs">Co-Founders</p>
                <p className="font-black text-sm sm:text-base">DAVID J. MATE</p>
                <p className="font-black text-sm sm:text-base">NEHGOULEN KIPGEN</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white/[0.02] border-y border-white/10 py-20 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter mb-8 sm:mb-12">Our Mission</h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4">
                  <span className="text-brand-accent font-black text-2xl sm:text-3xl">1.</span>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    Become a leading homegrown lifestyle and fitness brand representing positivity, quality, and youth culture.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-black text-2xl sm:text-3xl">2.</span>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    To create affordable yet premium quality homegrown fitness wear that combines comfort, style, and performance.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-black text-2xl sm:text-3xl">3.</span>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    To inspire confidence, discipline, and motivation among the younger generation through meaningful products and engagement.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter mb-8 sm:mb-12">Our Vision</h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4">
                  <span className="text-brand-accent font-black text-2xl sm:text-3xl">4.</span>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    Create a strong community where people feel inspired, connected, and motivated to become their best selves.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-black text-2xl sm:text-3xl">5.</span>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    Build a long term movement that makes premium fitness fashion accessible while creating meaningful social impact.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-black text-2xl sm:text-3xl">6.</span>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    To develop modern trends that encourage positivity, wellness, creativity, and personal growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Problems & Solutions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter text-center mb-12 sm:mb-16 md:mb-20"
        >
          Problems & Solutions
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-500/5 border border-red-500/20 p-6 sm:p-8"
          >
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8 text-red-400">Problems</h3>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • Many fitness wear options in the market are either too expensive or lack good quality at affordable prices.
              </p>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • Young people often lack motivation and community support for maintaining a healthy and active lifestyle.
              </p>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • Most brands focus only on fashion, not on fitness, comfort, and purpose together.
              </p>
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-green-500/5 border border-green-500/20 p-6 sm:p-8"
          >
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8 text-green-400">Solutions</h3>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • Building affordable yet premium quality homegrown fitness wear that balances style, comfort, and performance.
              </p>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • We aim to create a positive fitness community that motivates and supports a healthy lifestyle.
              </p>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • Our brand combines fitness, fashion, and purpose to make activewear more meaningful and relatable.
              </p>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                • We focus on building trust, accessibility, and inspiration through both products and community engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Past Experience - Community Event */}
      <div className="bg-white/[0.02] border-y border-white/10 py-20 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter mb-8 sm:mb-12 text-center">Past Experience</h2>
            
            <div className="bg-brand-accent/10 border border-brand-accent/30 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-brand-accent flex-shrink-0" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">Zephyre Community Connect</h3>
                  <p className="text-brand-accent font-bold text-sm sm:text-base">October 9, 2024 • Selnou Gym, Kangpokpi</p>
                </div>
              </div>
              
              <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                On 9th October 2024, Zephyre hosted its first community event, <span className="text-white font-bold">Zephyre Community Connect</span>, at Selnou Gym in Kangpokpi. The event brought together fitness enthusiasts from across the area to participate in a dynamic and engaging fitness competition.
              </p>
              
              <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Multiple styles of fitness wear prints were designed and showcased at the event, with on-spot sales conducted at the location.
              </p>
              
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                Despite being our first initiative, the event was a great success driven purely by passion, determination, and the spirit of the community. It marked the beginning of Zephyre's journey beyond apparel, establishing a platform that connects, motivates, and empowers individuals in their fitness pursuits.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Phase I Project */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter text-center mb-12 sm:mb-16 md:mb-20"
        >
          Phase I Project
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Project Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent" />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Project Timeline</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <p className="text-brand-accent font-bold mb-2 text-sm sm:text-base">October 2025</p>
                <p className="text-white/70 text-sm sm:text-base">Project development initiated</p>
              </div>
              <div>
                <p className="text-brand-accent font-bold mb-2 text-sm sm:text-base">March 2026</p>
                <p className="text-white/70 text-sm sm:text-base">Product officially launched</p>
              </div>
              <div>
                <p className="text-brand-accent font-bold mb-2 text-sm sm:text-base">April 2026</p>
                <p className="text-white/70 text-sm sm:text-base">Promotional shoot at KWS Sports Event 2026</p>
              </div>
            </div>
          </motion.div>

          {/* Product Launch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.02] border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent" />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Product Launch</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/70 text-sm sm:text-base">
                • Introduced the brand's first product collection
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Launched in two color variants: <span className="text-brand-accent font-bold">Beige</span> and <span className="text-brand-accent font-bold">Black</span>
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Focused on combining fitness lifestyle with modern activewear aesthetics
              </p>
            </div>
          </motion.div>
        </div>

        {/* Marketing & Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Marketing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent" />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Marketing & Promotion</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/70 text-sm sm:text-base">
                • Conducted promotional shoot during KWS Sports Event 2026
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Used event platform to market brand to large fitness community
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Increased public awareness and visibility
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Captured professional content for future promotions
              </p>
            </div>
          </motion.div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent" />
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Outcomes & Impact</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/70 text-sm sm:text-base">
                • Successfully created awareness among fitness community
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Established valuable networking contacts for future collaborations
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Improved brand recognition and audience reach
              </p>
              <p className="text-white/70 text-sm sm:text-base">
                • Built strong foundation for future marketing and expansion
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center border border-white/10 p-8 sm:p-12 md:p-16 bg-white/[0.02]"
        >
          <h2 className="text-[50px] sm:text-[60px] md:text-[80px] font-black italic tracking-tighter opacity-5 uppercase mb-[-30px] sm:mb-[-40px]">
            FAITH MOVES MOUNTAINS
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl italic text-white/80 mb-6 sm:mb-8 leading-relaxed px-4">
            "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character."
          </p>
          <span className="text-brand-accent text-[9px] sm:text-[10px] font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 border border-brand-accent/20 inline-block">
            Arnold Schwarzenegger
          </span>
        </motion.div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter mb-6 sm:mb-8">
            Join The Movement
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Zephyre is more than apparel—it's a commitment to excellence, a declaration of faith, 
            and a community of warriors. Are you ready to trust the process?
          </p>
          <a
            href="/shop"
            className="inline-block px-10 sm:px-12 py-4 sm:py-5 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>
    </div>
  );
}
