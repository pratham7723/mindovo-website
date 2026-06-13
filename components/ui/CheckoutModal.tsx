"use client";

import { useEffect, useState } from "react";
import { X, ShoppingBag, Mail, Check, AlertCircle } from "lucide-react";
import { products } from "@/data/products";

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpenCheckout = (e: Event) => {
      const customEvent = e as CustomEvent<{ product: string }>;
      if (customEvent.detail && customEvent.detail.product) {
        setProductName(customEvent.detail.product);
      } else {
        setProductName("Mindovo Games");
      }
      setIsOpen(true);
      setIsSubscribed(false);
      setEmail("");
      setError("");
    };

    window.addEventListener("open-checkout", handleOpenCheckout);
    return () => {
      window.removeEventListener("open-checkout", handleOpenCheckout);
    };
  }, []);

  if (!isOpen) return null;

  const activeProduct = products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase() || p.slug === productName.toLowerCase()
  ) || products[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsSubscribed(true);
    // In production, this would trigger an API call to save email
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#F7F3EB] rounded-3xl border border-brand-text/10 shadow-2xl p-6 md:p-8 overflow-hidden z-10 transition-all duration-300 transform scale-100 max-h-[90vh] overflow-y-auto">
        {/* Decorative subtle top gold line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-puzzle-blue via-puzzle-orange to-puzzle-red" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-brand-text/60 hover:text-brand-text transition-colors duration-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Content */}
        <div className="mt-2 text-center md:text-left">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-orange uppercase">
            Mindovo Shop
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-black text-brand-text mt-2 tracking-tight">
            Direct Checkout Coming Soon
          </h3>
        </div>

        {/* Info Message */}
        <p className="text-xs md:text-sm text-brand-text/70 mt-4 leading-relaxed">
          We are currently setting up our premium direct-to-consumer store to offer custom shipping bundles, loyalty rewards, and exclusive items. In the meantime, you can purchase the <strong>{activeProduct?.name || productName}</strong> securely on Amazon with quick delivery.
        </p>

        {/* Amazon Callout Box */}
        <div className="bg-white/80 border border-brand-text/5 rounded-2xl p-5 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-[9px] font-display font-black text-puzzle-blue uppercase">
              Immediate Purchase
            </span>
            <h4 className="font-display font-bold text-sm text-brand-text mt-0.5">
              Available on Amazon India
            </h4>
            <p className="text-[11px] text-brand-text/50 mt-1 leading-tight">
              Includes fast delivery and secure transaction processing.
            </p>
          </div>
          <a
            href={activeProduct?.amazonUrl || "https://www.amazon.in"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#FF9900] hover:bg-[#e68a00] text-black font-display text-[10px] font-black tracking-widest uppercase px-5 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy on Amazon</span>
          </a>
        </div>

        {/* Subscription Form */}
        <div className="border-t border-brand-text/10 pt-6 mt-6">
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <label className="block text-[10px] font-display font-black tracking-widest uppercase text-brand-text/50">
                Get Notified & Receive 15% Off
              </label>
              <p className="text-[11px] text-brand-text/60 leading-relaxed">
                Subscribe to get notified as soon as direct sales launch on our website, and we will send a <strong>15% discount code</strong> for your first order.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-brand-text/10 px-4 py-3 rounded-xl text-xs text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-text/50 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-text hover:bg-brand-text/80 text-brand-bg font-display text-[10px] font-black tracking-widest uppercase px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  Notify Me
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-1 text-[10px] text-puzzle-red mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          ) : (
            <div className="bg-puzzle-green/5 border border-puzzle-green/20 rounded-2xl p-5 text-center flex flex-col items-center">
              <div className="w-10 h-10 bg-puzzle-green/10 text-puzzle-green rounded-full flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h5 className="font-display font-bold text-sm text-brand-text">
                You're on the list!
              </h5>
              <p className="text-[11px] text-brand-text/60 mt-1 max-w-sm">
                Thank you! We will email you at <strong>{email}</strong> with your 15% discount coupon as soon as direct purchasing goes live on our website.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
