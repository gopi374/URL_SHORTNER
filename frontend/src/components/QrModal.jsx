import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, Copy, ExternalLink } from "lucide-react";

const QrModal = ({ item, onClose, showToast }) => {
  const qrRef = useRef(null);

  if (!item) return null;

  const downloadQrPng = () => {
    try {
      const svg = qrRef.current.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = 512;
        canvas.height = 512;
        // Draw white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(img, 32, 32, 448, 448);

        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qr-${item.shortcode}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        showToast("QR Code downloaded as PNG!", "success");
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (err) {
      console.error(err);
      showToast("Could not download QR code", "error");
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(item.shortUrl);
      showToast("Link copied to clipboard!", "success");
    } catch {
      showToast("Failed to copy link", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1">QR Code</h3>
        <p className="text-xs text-slate-400 mb-6 truncate px-4">
          Scan to visit <span className="text-indigo-400 font-medium">{item.shortUrl}</span>
        </p>

        {/* QR Code Container */}
        <div
          ref={qrRef}
          className="bg-white p-5 rounded-2xl inline-block shadow-inner mx-auto mb-6"
        >
          <QRCodeSVG
            value={item.shortUrl}
            size={200}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={downloadQrPng}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={copyUrl}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
