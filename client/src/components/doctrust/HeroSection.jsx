import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  UploadCloud,
  Code,
  ArrowRight,
  CheckCircle2,
  ScanFace,
  FileText,
  FileCheck2,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Framer Motion Variants for reusable animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export function HeroSection({ onOpenUpload, onShowToast }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('identity');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verifiedState, setVerifiedState] = useState(false);

  const tabData = {
    identity: {
      title: t?.hero?.poSample || 'Purchase Order',
      filename: 'Purchase_Order_PO-1024.pdf',
      docType: 'Purchase Order',
      score: '99.8%',
      details: '100 units @ $500.00 = $50,000.00 • Authorized buyer signature valid',
    },
    invoice: {
      title: t?.hero?.invMismatchSample || 'Invoice (Variance)',
      filename: 'Invoice_Acme_INV-9042.pdf',
      docType: 'Commercial Invoice',
      score: '65.2%',
      details: 'Variance detected: Billed $55,000 (110 units) exceeds PO authorization ($50,000 / 100 units)',
    },
    legal: {
      title: t?.hero?.drSample || 'Delivery Receipt',
      filename: 'Delivery_Receipt_DR-5512.pdf',
      docType: 'Delivery Receipt',
      score: '99.4%',
      details: 'Physical count of 100 units intake at Warehouse Bay 4 • Sign-off valid',
    },
  };

  const handleSimulateInspection = () => {
    setIsProcessing(true);
    setVerifiedState(false);
    setTimeout(() => {
      setIsProcessing(false);
      setVerifiedState(true);
      if (onShowToast) {
        onShowToast({
          title: activeTab === 'invoice' ? (t?.hero?.auditResultFlagged || 'Discrepancy Flagged') : (t?.hero?.auditResultPassed || 'Document Verified'),
          message: `${tabData[activeTab].filename} evaluated with ${tabData[activeTab].score} confidence score.`,
          type: activeTab === 'invoice' ? 'error' : 'success',
          tag: 'Verified',
        });
      }
    }, 900);
  };

  return (
    <main className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-transparent">
      {/* Hero Content Foreground */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full max-w-4xl"
        >
          {/* Top Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#EEF8CD] border border-[#d8e8a8] text-xs sm:text-sm font-extrabold text-emerald-950 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-800" />
              {t?.hero?.badge || 'Next-Gen Intelligent Document Processing'}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            Turn Procurement Documents into <br />
            <span className="bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] bg-clip-text text-transparent">Instant Verified Decisions</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            {t?.hero?.subtitle || 'DocuTrust AI automatically extracts, audits, and reconciles Purchase Orders, Invoices, Delivery Receipts, and Quotations with zero arithmetic errors and full AI explanation.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenUpload}
              className="w-full sm:w-auto bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] hover:opacity-95 text-slate-900 font-extrabold px-8 py-4 rounded-2xl text-base flex items-center justify-center gap-2 shadow-sm border border-[#fca99d] transition-all cursor-pointer"
            >
              <UploadCloud className="w-5 h-5 text-slate-900" />
              <span>{t?.hero?.ctaPrimary || 'Start Verifying Free'}</span>
              <ArrowRight className="w-5 h-5 text-slate-900 ml-1" />
            </motion.button>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white text-slate-800 border border-[#EAE5DC] px-8 py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 hover:bg-[#FAF9F6] hover:border-[#FFC5AA] transition-all shadow-xs"
            >
              <Code className="w-5 h-5 text-slate-400" />
              <span>{t?.hero?.ctaSecondary || 'Watch Live Demo'}</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Mac-style Live Sandbox Console Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 w-full max-w-5xl relative text-left"
        >
          {/* Floating Badge above Mockup */}
          <div className="absolute -top-5 left-10 z-20 bg-[#BBF1D2] border border-[#9ae6b8] shadow-md shadow-slate-900/5 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-extrabold text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
            0.4s Verification Speed
          </div>

          {/* Mockup Container */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-[#EAE5DC] overflow-hidden flex flex-col relative z-10">
            {/* Mac-style Window Header */}
            <div className="bg-[#FAF9F6] border-b border-[#EAE5DC] px-5 py-3.5 flex items-center justify-between">
              {/* Window Controls */}
              <div className="flex gap-2 w-24">
                <div className="w-3 h-3 rounded-full bg-[#FF9D9D]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFC5AA]"></div>
                <div className="w-3 h-3 rounded-full bg-[#BBF1D2]"></div>
              </div>

              {/* Title */}
              <div className="text-xs font-bold text-slate-600">
                DocuTrust AI Verification Console • Live Sandbox
              </div>

              <div className="w-24"></div>
            </div>

            {/* Mockup Body Content */}
            <div className="p-6 sm:p-8 bg-white flex flex-col items-center">
              {/* Tabs */}
              <div className="flex gap-2 p-1.5 bg-[#FAF9F6] rounded-xl border border-[#EAE5DC] self-end mb-6">
                <button
                  onClick={() => {
                    setActiveTab('identity');
                    setVerifiedState(false);
                  }}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'identity'
                      ? 'bg-white text-slate-900 shadow-xs border border-[#EAE5DC]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tabData.identity.title}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('invoice');
                    setVerifiedState(false);
                  }}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'invoice'
                      ? 'bg-white text-slate-900 shadow-xs border border-[#EAE5DC]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tabData.invoice.title}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('legal');
                    setVerifiedState(false);
                  }}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'legal'
                      ? 'bg-white text-slate-900 shadow-xs border border-[#EAE5DC]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tabData.legal.title}
                </button>
              </div>

              {/* Awaiting Document Upload Drop Box */}
              <div
                onClick={onOpenUpload}
                className="w-full max-w-3xl border-2 border-dashed border-[#EAE5DC] rounded-3xl bg-[#FAF9F6] p-8 sm:p-12 flex flex-col items-center justify-center text-center hover:border-[#FFC5AA] transition-colors cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xs mb-4 border border-[#EAE5DC] group-hover:scale-105 transition-transform">
                  <ScanFace className="w-8 h-8 text-[#e06d6d]" />
                </div>
                <h3 className="text-slate-900 font-extrabold text-base mb-1">
                  Awaiting Document Upload: {tabData[activeTab].title}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mb-2 font-medium">
                  {tabData[activeTab].details}
                </p>
                <p className="text-[11px] text-slate-400 mb-4">
                  Drop a sample ID card, invoice, or contract here to see instant AI extraction & fraud checks.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white border border-[#EAE5DC] text-xs font-semibold text-slate-700 shadow-2xs">
                    Sample: {tabData[activeTab].filename}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                    activeTab === 'invoice'
                      ? 'bg-[#EEF8CD] text-amber-950 border-[#d8e8a8]'
                      : 'bg-[#BBF1D2] text-emerald-950 border-[#9ae6b8]'
                  }`}>
                    Score: {tabData[activeTab].score}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient glow behind mockup */}
          <div className="absolute top-10 inset-0 bg-gradient-to-t from-[#FFC5AA]/20 via-[#EEF8CD]/20 to-transparent blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </main>
  );
}

export default HeroSection;
