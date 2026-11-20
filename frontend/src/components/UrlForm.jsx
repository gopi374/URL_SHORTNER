import React, { useState } from "react";
import { Link2, ArrowRight, Sparkles, Clipboard, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

const SAMPLE_URLS = [
  { label: "GitHub Repo", url: "https://github.com/developer/awesome-url-shortener-service" },
  { label: "MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
  { label: "YouTube Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
];

const UrlForm = ({ onShorten, isLoading }) => {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showAliasInput, setShowAliasInput] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setValidationError("");
      }
    } catch {
      // Clipboard permission denied or unsupported
    }
  };

  const handleClear = () => {
    setUrl("");
    setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError("Please enter a URL to shorten.");
      return;
    }

    // Basic URL validation
    let isValid = false;
    try {
      const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const parsed = new URL(formatted);
      if (parsed.hostname.includes(".")) {
        isValid = true;
      }
    } catch {
      isValid = false;
    }

    if (!isValid) {
      setValidationError("Please enter a valid website address (e.g. https://example.com/page).");
      return;
    }

    onShorten(trimmed, customAlias.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 p-2 sm:p-3 border border-slate-800 shadow-2xl backdrop-blur-xl transition-all">
        {/* Glow border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg -z-10 opacity-70" />

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Main Input Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-950/80 rounded-xl p-2 border border-slate-800 focus-within:border-indigo-500/80 transition-colors">
            <div className="flex items-center gap-2 w-full px-2">
              <Link2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (validationError) setValidationError("");
                }}
                placeholder="Paste long link here (e.g. https://very-long-url.com/xyz...)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
                disabled={isLoading}
              />

              {/* Paste or Clear button */}
              {url ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-indigo-300 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition cursor-pointer"
                  title="Paste from clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste</span>
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none whitespace-nowrap active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <span>Shorten URL</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Validation error display */}
          {validationError && (
            <div className="text-xs text-rose-400 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/20">
              {validationError}
            </div>
          )}

          {/* Custom Alias Toggle */}
          <div className="px-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAliasInput(!showAliasInput)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showAliasInput ? "Hide Custom Alias" : "Customize link / Add custom alias (optional)"}</span>
              {showAliasInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Collapsible custom alias box */}
            {showAliasInput && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 animate-fade-in">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Custom Slug / Back-half
                </label>
                <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 focus-within:border-indigo-500/60">
                  <span className="text-xs text-slate-500 select-none mr-1">snap.url/</span>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                    placeholder="custom-link-name"
                    className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 focus:outline-none"
                    maxLength={30}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Letters, numbers, hyphens, and underscores only. Max 30 characters.
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Quick test sample URLs */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 px-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Quick Test:</span>
          {SAMPLE_URLS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setUrl(sample.url);
                setValidationError("");
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UrlForm;
