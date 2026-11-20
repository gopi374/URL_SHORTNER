import React from "react";
import { Link2, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-400">
            <Link2 className="w-3.5 h-3.5 transform -rotate-45" />
          </div>
          <span className="font-semibold text-slate-400">SnapURL</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="hover:text-slate-300">Fast Redirects</span>
          <span>•</span>
          <span className="hover:text-slate-300">QR Generation</span>
          <span>•</span>
          <span className="hover:text-slate-300">No Sign-up Required</span>
        </div>

        <div className="text-slate-500 flex items-center gap-1">
          <span>Built with React 19 & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
