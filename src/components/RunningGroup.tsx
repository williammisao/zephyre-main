import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, MapPin, Calendar, Clock, Trophy, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function RunningGroup() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: 'beginner',
    goals: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/running-group/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Registration successful! Welcome to the Zephyre Endurance Society!');
      setIsRegistered(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to register. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase italic mb-4 sm:mb-6">
              Welcome to the Pack!
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto">
              You're now part of the Zephyre Endurance Society. Check your email for details about our next run.
            </p>
            
            <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 mb-8 sm:mb-12 text-left">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4 sm:mb-6">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-1" />
                  <p className="text-white/70 text-sm sm:text-base">Check your email for welcome information and club guidelines</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-1" />
                  <p className="text-white/70 text-sm sm:text-base">Join our WhatsApp group for real-time updates</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-1" />
                  <p className="text-white/70 text-sm sm:text-base">Mark your calendar for our next club run</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-1" />
                  <p className="text-white/70 text-sm sm:text-base">Get your Zephyre running gear ready!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/shop')}
                className="px-8 sm:px-12 py-3 sm:py-4 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-white hover:text-brand-bg transition-all"
              >
                Shop Running Gear
              </button>
              <button
                onClick={() => setIsRegistered(false)}
                className="px-8 sm:px-12 py-3 sm:py-4 border border-white/30 text-white font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-white hover:text-brand-bg transition-all"
              >
                Back to Running Club
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] mb-4 sm:mb-6">
            Running Club
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed px-4">
            Join the Zephyre Endurance Society!!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 h-full">
              <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight mb-6 sm:mb-8">About Our Club</h2>
              <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                The Zephyre Endurance Society is more than just a running club—it's a community of warriors committed to pushing their limits, supporting each other, and growing together.
              </p>
              <p className="text-white/70 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Whether you're a beginner taking your first steps or an experienced runner chasing new PRs, you'll find your place in our pack.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm sm:text-base mb-1">All Levels Welcome</h3>
                    <p className="text-white/60 text-xs sm:text-sm">From beginners to marathoners, everyone has a place</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm sm:text-base mb-1">Regular Runs</h3>
                    <p className="text-white/60 text-xs sm:text-sm">Weekly club runs every Saturday at 6:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm sm:text-base mb-1">Local Routes</h3>
                    <p className="text-white/60 text-xs sm:text-sm">Scenic routes around Kangpokpi and surrounding areas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm sm:text-base mb-1">Events & Challenges</h3>
                    <p className="text-white/60 text-xs sm:text-sm">Monthly challenges and community events</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm sm:text-base mb-1">Community Support</h3>
                    <p className="text-white/60 text-xs sm:text-sm">Motivation, accountability, and lasting friendships</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
              <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight mb-6 sm:mb-8">Join the Pack</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="Warrior"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Running Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    <option value="beginner" className="bg-brand-bg">Beginner (Just starting)</option>
                    <option value="intermediate" className="bg-brand-bg">Intermediate (Regular runner)</option>
                    <option value="advanced" className="bg-brand-bg">Advanced (Experienced/Competitive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Your Goals (Optional)
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors resize-none text-sm sm:text-base"
                    placeholder="What do you hope to achieve with the running club?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 sm:py-5 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-white hover:text-brand-bg transition-all transform active:scale-95"
                >
                  Register Now
                </button>

                <p className="text-white/40 text-[10px] sm:text-xs text-center">
                  By registering, you agree to receive updates about club runs and events
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Schedule Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/20 p-6 sm:p-8 md:p-12 mb-12 sm:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-brand-accent flex-shrink-0" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">Weekly Schedule</h2>
              <p className="text-white/70 text-sm sm:text-base">Join us every week for club runs and training</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 p-4 sm:p-6 border border-white/10">
              <h3 className="font-black uppercase tracking-wider mb-3 sm:mb-4 text-sm sm:text-base">Saturday Morning Run</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="text-white/70"><span className="text-brand-accent font-bold">Time:</span> 6:00 AM - 8:00 AM</p>
                <p className="text-white/70"><span className="text-brand-accent font-bold">Distance:</span> 5-10 km (Multiple pace clubs)</p>
                <p className="text-white/70"><span className="text-brand-accent font-bold">Meeting Point:</span> Selnou Gym, Kangpokpi</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 sm:p-6 border border-white/10">
              <h3 className="font-black uppercase tracking-wider mb-3 sm:mb-4 text-sm sm:text-base">Wednesday Evening Run</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="text-white/70"><span className="text-brand-accent font-bold">Time:</span> 5:30 PM - 7:00 PM</p>
                <p className="text-white/70"><span className="text-brand-accent font-bold">Distance:</span> 3-5 km (Easy pace)</p>
                <p className="text-white/70"><span className="text-brand-accent font-bold">Meeting Point:</span> Selnou Gym, Kangpokpi</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter mb-4 sm:mb-6">
            Ready to Run with Us?
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Join the Zephyre Endurance Society today and become part of a community that pushes limits, celebrates victories, and grows together.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 sm:px-12 py-4 sm:py-5 bg-white text-brand-bg font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-brand-accent hover:text-white transition-all transform hover:scale-105"
          >
            Register Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
