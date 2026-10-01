import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Pricing({ onOpenUpload }) {
  const { t } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-transparent border-t border-[#EAE5DC]/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF8CD] border border-[#d8e8a8] text-emerald-950 text-xs font-extrabold tracking-wide uppercase mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-emerald-800" />
            <span>{t.pricing.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.pricing.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-500 font-medium">
            {t.pricing.subtitle}
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-13 h-7 rounded-full bg-[#EAE5DC] p-0.5 relative transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle annual or monthly pricing"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] shadow-xs transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                {t.pricing.annual}
              </span>
            </div>
          </div>
        </div>


        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Plan 1: Developer Sandbox */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Developer Sandbox
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Free Starter</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Test multi-modal AI verification and inspect structured JSON schemas.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-400 font-medium">/ forever free</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Up to 500 documents / month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard 400ms OCR Verification</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive Drag & Drop Web Console</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Community Discord & Forum Support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenUpload}
              className="w-full py-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE5DC] hover:bg-white text-slate-900 font-bold text-xs text-center shadow-xs transition-colors cursor-pointer"
            >
              Start Free Testing
            </button>
          </div>

          {/* Plan 2: Growth Pro (Highlighted) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-[#FFC5AA] shadow-xl shadow-[#FFC5AA]/20 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] text-slate-900 font-extrabold text-[10px] tracking-wider uppercase shadow-xs border border-[#fca99d]">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-extrabold text-[#e06d6d] uppercase tracking-wider mb-2">
                Growth Scale
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Business & Fintech</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Automated 3-way match, forensic tamper audit, and REST webhook pipelines.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  ${isAnnual ? '79' : '99'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#e06d6d] shrink-0" />
                  <span>Up to 10,000 documents / month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#e06d6d] shrink-0" />
                  <span>Forensic Pixel & Font Tamper Detection</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#e06d6d] shrink-0" />
                  <span>Automated 3-Way Invoice Reconciliation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#e06d6d] shrink-0" />
                  <span>HMAC Event Webhooks & API Keys</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#e06d6d] shrink-0" />
                  <span>Priority 24/7 Technical Support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenUpload}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] hover:opacity-95 text-slate-900 font-extrabold text-xs text-center shadow-sm border border-[#fca99d] transition-all cursor-pointer"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Enterprise
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Custom Scale</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Air-gapped VPCs, custom LLM schema tuning, and signed BAA/SOC-2 reports.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                <span className="text-xs text-slate-400 font-medium">/ volume contract</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-700 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Unlimited Document Throughput</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Dedicated Private VPC or On-Premise Engine</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Custom LLM Document Schema Tuning</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Single Sign-On (SAML/Okta) & 99.99% SLA</span>
                </li>
              </ul>
            </div>

            <Link
              to="/login"
              className="w-full py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-[#111827] font-semibold text-xs text-center shadow-xs transition-colors"
            >
              Contact Enterprise Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
