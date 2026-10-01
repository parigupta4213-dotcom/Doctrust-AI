import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Globe,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Zap,
  Check,
  FileCheck2,
} from 'lucide-react';

import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export { LANGUAGES } from '../../context/translations';

export function Navbar({ onOpenUpload, currentLang: propLang, onSelectLang: propSelectLang }) {
  const { currentLang: ctxLang, setLanguage, t, languages } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const currentLang = propLang || ctxLang;
  const onSelectLang = propSelectLang || setLanguage;

  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close language menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.nav.solutions, href: '#features' },
    { label: t.nav.verificationApi, href: '#api-preview' },
    { label: t.nav.useCases, href: '#use-cases' },
    { label: t.nav.pricing, href: '#pricing' },
  ];


  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#EAE5DC] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]'
          : 'bg-white/60 backdrop-blur-xs border-b border-[#EAE5DC]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF9D9D] via-[#FFC5AA] to-[#EEF8CD] p-[1.5px] shadow-sm group-hover:scale-105 transition-all duration-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5 text-[#e06d6d]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                DocuTrust
              </span>
              <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-md bg-[#EEF8CD] text-emerald-900 border border-[#d8e8a8]">
                AI
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-[#FAF9F6] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Language Switcher, Sign In & Start Verifying Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Globe Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-[#FAF9F6] border border-[#EAE5DC] transition-all cursor-pointer"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#e06d6d]" />
                <span>{currentLang?.name || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-[#EAE5DC] shadow-xl shadow-slate-200/60 p-2 z-50 ring-1 ring-black/5"
                  >
                    <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.nav.selectLang}
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onSelectLang(lang);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          currentLang?.code === lang.code
                            ? 'bg-[#EEF8CD] text-emerald-950 font-bold border border-[#d8e8a8]'
                            : 'text-slate-700 hover:bg-[#FAF9F6]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.name}</span>
                          <span className="text-[11px] text-slate-400">({lang.native})</span>
                        </div>
                        {currentLang?.code === lang.code && (
                          <Check className="w-3.5 h-3.5 text-emerald-800" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Button or Dashboard Link */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] hover:opacity-95 text-slate-900 font-extrabold text-xs sm:text-sm shadow-sm border border-[#fca99d] transition-all cursor-pointer"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl hover:bg-[#FAF9F6] transition-colors"
                >
                  {t.nav.signIn}
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9D9D] to-[#FFC5AA] hover:opacity-95 text-slate-900 font-extrabold text-xs sm:text-sm shadow-sm border border-[#fca99d] transition-all cursor-pointer"
                >
                  <span>{t.nav.startVerifying}</span>
                  <ArrowRight className="w-4 h-4 text-slate-900" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenUpload}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              Verify
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-b border-gray-200/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-xl"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 block mb-2 px-1">
                Language
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
                      currentLang?.code === lang.code
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl border border-gray-200 text-sm font-semibold text-gray-700"
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenUpload();
                }}
                className="w-full py-2.5 text-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-500/25"
              >
                Start Verifying Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
