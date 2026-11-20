import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-amber-400 shrink-0" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case "success":
        return "border-emerald-500/30 bg-emerald-950/80 text-emerald-100";
      case "error":
        return "border-rose-500/30 bg-rose-950/80 text-rose-100";
      default:
        return "border-amber-500/30 bg-amber-950/80 text-amber-100";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in transition-all">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl shadow-black/50 ${getBorder()}`}
      >
        {getIcon()}
        <div className="flex-1 text-sm font-medium pr-2">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
