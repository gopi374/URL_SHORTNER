import React from "react";
import { Zap, ShieldCheck, BarChart3, QrCode } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative text-center pt-10 pb-8 px-4">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
        <Zap className="w-3.5 h-3.5 text-indigo-400" />
        <span>Simple, Reliable & Instant URL Shortening</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight sm:leading-tight">
        Make every long link{" "}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          short, trackable & beautiful
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Transform bulky, ugly URLs into concise, branded links. Generate instant QR codes and monitor clicks seamlessly.
      </p>

      {/* Feature Pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Sub-second Redirection</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <QrCode className="w-3.5 h-3.5 text-cyan-400" />
          <span>Instant QR Codes</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Click Analytics</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Custom Aliases</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
