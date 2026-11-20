import React, { useState } from "react";
import { Copy, Check, ExternalLink, QrCode, Share2, Sparkles, AlertCircle } from "lucide-react";

const ResultCard = ({ result, onOpenQr, showToast }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      showToast("Short link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Failed to copy automatically", "error");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shortened Link",
          text: `Check out this link: ${result.shortUrl}`,
          url: result.shortUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  // Social share links
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Check this link: ${result.shortUrl}`
  )}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check this link: ${result.shortUrl}`
  )}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    result.shortUrl
  )}`;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-6 animate-fade-in">
      <div className="relative rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        {/* Top header status */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Link Ready
            </span>
          </div>

          {result.isLocalMock && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
              <AlertCircle className="w-3 h-3" />
              <span>Demo Mock</span>
            </div>
          )}
        </div>

        {/* Shortened URL Display */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="min-w-0 flex-1">
            <span className="text-xs text-slate-400 block mb-1">Your Shortened Link:</span>
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-bold text-indigo-400 hover:text-indigo-300 transition break-all inline-flex items-center gap-1.5 group"
            >
              <span>{result.shortUrl}</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={handleCopy}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenQr(result)}
              className="flex items-center justify-center p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition cursor-pointer"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition cursor-pointer"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Original URL Truncated */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="truncate max-w-md">
            <span className="text-slate-500 mr-1.5">Destination:</span>
            <span className="text-slate-300">{result.originalUrl}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="text-slate-500">Share via:</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition"
              title="Share on WhatsApp"
            >
              WhatsApp
            </a>
            <span>•</span>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              title="Share on X / Twitter"
            >
              X
            </a>
            <span>•</span>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
              title="Share on LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
