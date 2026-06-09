import { motion } from 'motion/react';
import { User, Package, Heart, Settings, LogOut, MapPin, CreditCard, Bell, Camera, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
  });
  const [dbUser, setDbUser] = useState<any>(null);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setDbUser(userData);
          
          // Populate form data with database values
          setFormData({
            username: userData.username || '',
            name: userData.name || currentUser.displayName || '',
            email: userData.email || currentUser.email || '',
            phone: userData.phoneNumber || currentUser.phoneNumber || '',
          });
        } else {
          // Try loading from localStorage if database not available
          const localData = localStorage.getItem(`user_${currentUser.uid}`);
          if (localData) {
            const userData = JSON.parse(localData);
            setDbUser(userData);
            setFormData({
              username: userData.username || '',
              name: userData.name || currentUser.displayName || '',
              email: userData.email || currentUser.email || '',
              phone: userData.phoneNumber || currentUser.phoneNumber || '',
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Try loading from localStorage
        const localData = localStorage.getItem(`user_${currentUser.uid}`);
        if (localData) {
          const userData = JSON.parse(localData);
          setDbUser(userData);
          setFormData({
            username: userData.username || '',
            name: userData.name || currentUser.displayName || '',
            email: userData.email || currentUser.email || '',
            phone: userData.phoneNumber || currentUser.phoneNumber || '',
          });
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  // If not logged in, show login prompt
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <User className="w-20 h-20 text-white/20 mb-6" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">
              Sign In Required
            </h1>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Please sign in to access your account and view your orders.
            </p>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-12 py-5 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-12 py-5 border border-white/30 text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!currentUser) return;

    try {
      // Validate username
      if (formData.username && formData.username.length < 3) {
        toast.error('Username must be at least 3 characters long');
        return;
      }

      // Update Firebase profile
      await updateProfile(currentUser, {
        displayName: formData.name,
      });

      // Try to update user in database (will work once PostgreSQL is set up)
      try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch('/api/users/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            phone: formData.phone,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setDbUser(data.user);
          }
        } else {
          // Database not available, store locally as fallback
          console.log('Database not available, using local storage');
          const localUser = {
            username: formData.username,
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
          };
          localStorage.setItem(`user_${currentUser.uid}`, JSON.stringify(localUser));
          setDbUser(localUser);
        }
      } catch (dbError) {
        // Database not available, store locally
        console.log('Database error, using local storage:', dbError);
        const localUser = {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
        };
        localStorage.setItem(`user_${currentUser.uid}`, JSON.stringify(localUser));
        setDbUser(localUser);
      }
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      console.error('Profile update error:', error);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original values
    setFormData({
      username: dbUser?.username || '',
      name: dbUser?.name || currentUser?.displayName || '',
      email: dbUser?.email || currentUser?.email || '',
      phone: dbUser?.phoneNumber || currentUser?.phoneNumber || '',
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // In a real app, you would upload to Firebase Storage
    // For now, we'll show a message
    toast.success('Photo upload feature coming soon!');
  };

  // User data from Firebase and Database
  const user = {
    username: dbUser?.username || formData.username || currentUser?.displayName?.toLowerCase().replace(/\s+/g, '_') || 'warrior',
    name: currentUser?.displayName || 'Zephyre Warrior',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || 'Not provided',
    photoURL: currentUser?.photoURL || null,
    joinDate: new Date(currentUser?.metadata.creationTime || '').toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }),
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
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left font-bold uppercase tracking-wider text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all mt-4 border-t border-white/10 pt-4 sm:pt-6"
              >
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
                {/* Profile Header Card */}
                <div className="bg-gradient-to-r from-brand-accent/20 to-brand-accent/5 border border-brand-accent/30 p-8 sm:p-12">
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6">
                    {/* Profile Picture */}
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-accent/50 bg-white/5">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-brand-accent/20">
                            <User className="w-16 h-16 text-brand-accent" />
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-brand-bg transition-all group-hover:scale-110">
                        <Camera className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handlePhotoUpload}
                        />
                      </label>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">{user.username}</h2>
                      <p className="text-white/60 text-sm sm:text-base mb-1">{user.name}</p>
                      <p className="text-white/40 text-xs mb-3">{user.email}</p>
                      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-white/10 rounded">
                          Member since {user.joinDate}
                        </span>
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-brand-accent/20 text-brand-accent rounded">
                          WARRIOR
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Edit Button - Bottom */}
                  <div className="flex justify-end border-t border-white/10 pt-6">
                    <button
                      onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
                      className="px-6 py-3 border border-white/30 hover:bg-white hover:text-brand-bg transition-all font-black uppercase tracking-wider text-sm flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>

                {/* Show Profile Information and Saved Addresses only when editing */}
                {isEditing && (
                  <>
                    {/* Profile Information Form */}
                    <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8">Profile Information</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="your_username"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                          />
                          <p className="text-[10px] text-white/40 mt-1">Any characters allowed, minimum 3 characters</p>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/50 font-medium cursor-not-allowed"
                          />
                          <p className="text-[10px] text-white/40 mt-1">Email cannot be changed</p>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Add phone number"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button 
                            onClick={handleProfileUpdate}
                            className="px-8 py-3 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all"
                          >
                            Save Changes
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="px-8 py-3 border border-white/30 text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all"
                          >
                            Cancel
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
                  </>
                )}
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
