import { motion } from 'motion/react';
import { User, Package, Heart, Settings, LogOut, MapPin, CreditCard, Bell } from 'lucide-react';
import { useState } from 'react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');

  // Mock user data
  const user = {
    name: 'John Warrior',
    email: 'john@zephyre.com',
    phone: '+91 98765 43210',
    joinDate: 'January 2023',
  };

  const orders = [
    {
      id: 'ORD-001',
      date: 'May 10, 2026',
      status: 'Delivered',
      total: 1999,
      items: 2,
    },
    {
      id: 'ORD-002',
      date: 'April 28, 2026',
      status: 'In Transit',
      total: 3998,
      items: 3,
    },
    {
      id: 'ORD-003',
      date: 'April 15, 2026',
      status: 'Delivered',
      total: 1999,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic mb-3 sm:mb-4">
            My Account
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Manage your profile, orders, and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/[0.02] border border-white/10 p-4 sm:p-6 space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left font-bold uppercase tracking-wider text-xs sm:text-sm transition-all ${
                  activeTab === 'profile'
                    ? 'bg-brand-accent text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left font-bold uppercase tracking-wider text-xs sm:text-sm transition-all ${
                  activeTab === 'orders'
                    ? 'bg-brand-accent text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left font-bold uppercase tracking-wider text-xs sm:text-sm transition-all ${
                  activeTab === 'wishlist'
                    ? 'bg-brand-accent text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left font-bold uppercase tracking-wider text-xs sm:text-sm transition-all ${
                  activeTab === 'settings'
                    ? 'bg-brand-accent text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                Settings
              </button>
              <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left font-bold uppercase tracking-wider text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all mt-4 border-t border-white/10 pt-4 sm:pt-6">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8">Profile Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-4">
                      <button className="px-8 py-3 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Saved Addresses</h2>
                    <button className="flex items-center gap-2 text-brand-accent text-xs sm:text-sm font-black uppercase tracking-wider hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                      Add New
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-black uppercase tracking-wider text-sm sm:text-base">Home</h3>
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-1 bg-brand-accent">Default</span>
                      </div>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                        123 Warrior Street, Faith District<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8">Order History</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white/5 border border-white/10 p-4 sm:p-6 hover:border-white/20 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                        <div>
                          <h3 className="font-black uppercase tracking-wider text-base sm:text-lg mb-1">{order.id}</h3>
                          <p className="text-white/60 text-xs sm:text-sm">{order.date}</p>
                        </div>
                        <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 self-start ${
                          order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/10 gap-3">
                        <div className="text-xs sm:text-sm">
                          <span className="text-white/60">{order.items} items • </span>
                          <span className="text-brand-accent font-black">₹{order.total.toLocaleString('en-IN')}</span>
                        </div>
                        <button className="text-xs font-black uppercase tracking-wider text-brand-accent hover:text-white transition-colors text-left sm:text-right">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8">My Wishlist</h2>
                
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
                  <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-white/20 mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 sm:mb-3">Your Wishlist is Empty</h3>
                  <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">Save your favorite items for later</p>
                  <a
                    href="/shop"
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-white hover:text-brand-bg transition-all"
                  >
                    Explore Products
                  </a>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/10 gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <Bell className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <h3 className="font-black uppercase tracking-wider text-xs sm:text-sm">Email Notifications</h3>
                          <p className="text-white/60 text-[10px] sm:text-xs">Receive updates about orders and promotions</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent"></div>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/10 gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <CreditCard className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <h3 className="font-black uppercase tracking-wider text-xs sm:text-sm">Saved Payment Methods</h3>
                          <p className="text-white/60 text-[10px] sm:text-xs">Manage your payment options</p>
                        </div>
                      </div>
                      <button className="text-xs font-black uppercase tracking-wider text-brand-accent hover:text-white transition-colors text-left sm:text-right">
                        Manage
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <Settings className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <h3 className="font-black uppercase tracking-wider text-xs sm:text-sm">Privacy Settings</h3>
                          <p className="text-white/60 text-[10px] sm:text-xs">Control your data and privacy preferences</p>
                        </div>
                      </div>
                      <button className="text-xs font-black uppercase tracking-wider text-brand-accent hover:text-white transition-colors text-left sm:text-right">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-red-500/20 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 sm:mb-4 text-red-400">Danger Zone</h2>
                  <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-5 sm:px-6 py-2.5 sm:py-3 border border-red-500 text-red-400 font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-red-500 hover:text-white transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
