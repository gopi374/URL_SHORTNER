import React from "react";
import { Zap, ShieldCheck, BarChart3, QrCode, Sparkles, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Instant Redirection",
    description: "Lightning-fast HTTP 302 redirects with low latency performance.",
  },
  {
    icon: <QrCode className="w-6 h-6 text-cyan-400" />,
    title: "Instant QR Codes",
    description: "Automatically generate downloadable QR codes for offline and print sharing.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
    title: "Click Analytics",
    description: "Keep track of total visits and engagement on every shortened link.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    title: "Custom Aliases",
    description: "Create recognizable, memorable URLs with custom slugs for your brand.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
    title: "Safe & Validated",
    description: "Enforces strict protocol checks to ensure secure browsing for visitors.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-pink-400" />,
    title: "Mobile Friendly",
    description: "Fully responsive, optimized for desktop, tablet, and smartphone screens.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 border-t border-slate-800/60 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineered for speed and simplicity
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Everything you need to manage your links, share them anywhere, and track results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
