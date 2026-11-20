import React, { useState } from "react";
import { Link2, Sparkles, Server, Settings2, Check, RefreshCw } from "lucide-react";
import { getApiUrl, setApiUrl } from "../services/api";

const Navbar = ({ backendStatus, onRefreshBackend, showToast }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [customUrl, setCustomUrl] = useState(getApiUrl());

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setApiUrl(customUrl.trim());
    setShowSettings(false);
    onRefreshBackend();
    showToast("API Endpoint saved & updated", "success");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
            <Link2 className="w-6 h-6 text-white transform -rotate-45" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                SnapURL
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Ultra-fast link shortening & analytics</p>
          </div>
        </div>

        {/* Right side controls: Backend Status & Settings */}
        <div className="flex items-center gap-3">
          {/* Backend Status indicator */}
          <div
            onClick={onRefreshBackend}
            title="Click to re-check backend connection"
            className={`cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              backendStatus.online
                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40"
                : "bg-amber-950/40 border-amber-500/30 text-amber-400 hover:bg-amber-900/40"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus.online ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="hidden md:inline">
              {backendStatus.online ? "Backend Online" : "Demo Mode (Backend Offline)"}
            </span>
            <span className="md:hidden">
              {backendStatus.online ? "Online" : "Demo"}
            </span>
            <RefreshCw className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Settings button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            title="API Settings"
            aria-label="Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Dropdown modal */}
      {showSettings && (
        <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 py-4 sm:px-6 shadow-2xl">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-200 block mb-0.5">Backend API URL</span>
              Configure your backend endpoint (Default: <code className="text-indigo-400">http://localhost:3000</code>)
            </div>
            <form onSubmit={handleSaveSettings} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="http://localhost:3000"
                className="w-full sm:w-72 bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:outline-none rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition cursor-pointer whitespace-nowrap"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
