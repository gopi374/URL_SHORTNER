import React, { useState } from "react";
import { History, Copy, Check, ExternalLink, QrCode, Trash2, Search, ArrowUpDown, Download, MousePointerClick } from "lucide-react";

const LinkHistory = ({ links, onRemove, onClearAll, onOpenQr, showToast }) => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest | clicks

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      setCopiedCode(link.shortcode);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      showToast("Failed to copy link", "error");
    }
  };

  const handleExportJson = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(links, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `snapurl-links-${new Date().toISOString().slice(0, 10)}.json`);
      downloadAnchor.click();
      showToast("Links exported as JSON!", "success");
    } catch {
      showToast("Failed to export links", "error");
    }
  };

  // Filter and sort
  const filteredLinks = links
    .filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.originalUrl.toLowerCase().includes(q) ||
        item.shortcode.toLowerCase().includes(q) ||
        item.shortUrl.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "clicks") {
        return (b.clicks || 0) - (a.clicks || 0);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  return (
    <section className="w-full max-w-5xl mx-auto px-4 mt-14">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">Your Shortened Links</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
            {links.length}
          </span>
        </div>

        {/* Toolbar Controls */}
        {links.length > 0 && (
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search links..."
                className="w-full sm:w-44 bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
              />
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "clicks" : "newest")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition cursor-pointer"
              title="Toggle sorting"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortOrder === "newest" ? "Latest" : "Most Clicks"}</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition cursor-pointer"
              title="Export all links as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Clear History */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your link history?")) {
                  onClearAll();
                  showToast("History cleared", "info");
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-xs transition cursor-pointer"
              title="Clear all links"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Link List or Empty State */}
      {filteredLinks.length === 0 ? (
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center mx-auto mb-3 text-slate-500">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-300">
            {searchQuery ? "No matching links found" : "No links shortened yet"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search query or clear the filter."
              : "Paste any long URL into the box above to generate your first short link!"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLinks.map((item) => (
            <div
              key={item.shortcode}
              className="group p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* URLs Section */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                  >
                    <span>{item.shortUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>

                  {item.isLocalMock && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
                      demo
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 truncate max-w-xl" title={item.originalUrl}>
                  {item.originalUrl}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                  <span>
                    Created:{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <MousePointerClick className="w-3 h-3" />
                    {item.clicks || 0} {item.clicks === 1 ? "click" : "clicks"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                {/* Copy */}
                <button
                  onClick={() => handleCopy(item)}
                  className={`p-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                    copiedCode === item.shortcode
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white"
                  }`}
                  title="Copy short link"
                >
                  {copiedCode === item.shortcode ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>

                {/* QR Code */}
                <button
                  onClick={() => onOpenQr(item)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Show QR Code"
                >
                  <QrCode className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    onRemove(item.shortcode);
                    showToast("Link removed from history", "info");
                  }}
                  className="p-2 rounded-lg hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LinkHistory;
