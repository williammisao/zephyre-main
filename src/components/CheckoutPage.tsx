import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Lock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">
              Your Cart is Empty
            </h1>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Add items to your cart before proceeding to checkout.
            </p>
            <Link
              to="/shop"
              className="px-12 py-5 bg-brand-accent text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-brand-bg transition-all transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-20 sm:pt-24 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 sm:mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Back to Shop</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic mb-3 sm:mb-4">
            Checkout
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Complete your order securely
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-white/10 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="Warrior"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="123 Warrior Street"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="400001"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/[0.02] border border-white/10 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Payment Method</h2>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 border transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-accent bg-brand-accent/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="font-black uppercase tracking-wider text-xs sm:text-sm">Credit / Debit Card</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-brand-accent' : 'border-white/30'
                  }`}>
                    {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-brand-accent" />}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 border transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-brand-accent bg-brand-accent/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="font-black uppercase tracking-wider text-xs sm:text-sm">UPI Payment</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'upi' ? 'border-brand-accent' : 'border-white/30'
                  }`}>
                    {paymentMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-brand-accent" />}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 border transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-brand-accent bg-brand-accent/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="font-black uppercase tracking-wider text-xs sm:text-sm">Cash on Delivery</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'border-brand-accent' : 'border-white/30'
                  }`}>
                    {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-brand-accent" />}
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="pt-6 border-t border-white/10">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-medium focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="yourname@upi"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 lg:sticky lg:top-24"
            >
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 sm:mb-8">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-8 pb-8 border-b border-white/10">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedVariant?.id || 'default'}`} className="flex gap-4">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                      <img
                        src={item.selectedVariant?.imageUrl || item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-black uppercase tracking-tight">{item.name}</h3>
                      {item.selectedVariant && (
                        <p className="text-[10px] text-white/40 uppercase">{item.selectedVariant.name}</p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-white/40">Qty: {item.quantity}</span>
                        <span className="text-sm font-black text-brand-accent">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60">
                  <span className="text-sm font-bold uppercase tracking-wider">Subtotal</span>
                  <span className="font-black">₹{total().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span className="text-sm font-bold uppercase tracking-wider">Shipping</span>
                  <span className="font-black text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span className="text-sm font-bold uppercase tracking-wider">Tax (18%)</span>
                  <span className="font-black">₹{(total() * 0.18).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black uppercase tracking-wider">Total</span>
                  <span className="text-3xl font-black text-brand-accent">
                    ₹{(total() * 1.18).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button className="w-full h-12 sm:h-14 bg-brand-accent text-white flex items-center justify-center gap-3 font-black uppercase tracking-[0.3em] text-xs sm:text-sm hover:bg-white hover:text-brand-bg transition-all transform active:scale-95 mb-4">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                Place Order
              </button>

              <p className="text-center text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                Secure checkout powered by Stripe
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
