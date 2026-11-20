import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UrlForm from "./components/UrlForm";
import ResultCard from "./components/ResultCard";
import LinkHistory from "./components/LinkHistory";
import FeaturesSection from "./components/FeaturesSection";
import QrModal from "./components/QrModal";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import {
  shortenUrl,
  checkBackendHealth,
  getStoredLinks,
  saveStoredLink,
  removeStoredLink,
  clearStoredLinks,
} from "./services/api";

const App = () => {
  const [links, setLinks] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrModalItem, setQrModalItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [backendStatus, setBackendStatus] = useState({
    online: false,
    message: "Checking backend...",
  });

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Load history & check backend on mount
  useEffect(() => {
    setLinks(getStoredLinks());
    refreshBackend();
  }, []);

  const refreshBackend = async () => {
    const status = await checkBackendHealth();
    setBackendStatus(status);
  };

  const handleShorten = async (originalUrl, customAlias) => {
    setIsLoading(true);
    try {
      const response = await shortenUrl(originalUrl, customAlias);

      if (response.success) {
        setLastResult(response.data);
        const updated = saveStoredLink(response.data);
        setLinks(updated);

        if (response.warning) {
          showToast(response.warning, "warning");
        } else {
          showToast("URL shortened successfully!", "success");
        }
      } else {
        showToast(response.error || "Failed to shorten URL", "error");
      }
    } catch (err) {
      showToast(err.message || "An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLink = (shortcode) => {
    const updated = removeStoredLink(shortcode);
    setLinks(updated);
    if (lastResult && lastResult.shortcode === shortcode) {
      setLastResult(null);
    }
  };

  const handleClearAll = () => {
    clearStoredLinks();
    setLinks([]);
    setLastResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <Navbar
        backendStatus={backendStatus}
        onRefreshBackend={refreshBackend}
        showToast={showToast}
      />

      {/* Main Content */}
      <main className="flex-1 pb-16">
        <Hero />

        {/* Input Form */}
        <UrlForm onShorten={handleShorten} isLoading={isLoading} />

        {/* Shortened URL Result Card */}
        <ResultCard
          result={lastResult}
          onOpenQr={(item) => setQrModalItem(item)}
          showToast={showToast}
        />

        {/* Link History / Analytics */}
        <LinkHistory
          links={links}
          onRemove={handleRemoveLink}
          onClearAll={handleClearAll}
          onOpenQr={(item) => setQrModalItem(item)}
          showToast={showToast}
        />

        {/* Features / Why Choose SnapURL */}
        <FeaturesSection />
      </main>

      {/* QR Code Modal */}
      {qrModalItem && (
        <QrModal
          item={qrModalItem}
          onClose={() => setQrModalItem(null)}
          showToast={showToast}
        />
      )}

      {/* Toast Alert */}
      <Toast toast={toast} onClose={handleCloseToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
