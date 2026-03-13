'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 3.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal-500/90 backdrop-blur-md shadow-lg shadow-crimson-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="w-5 h-5 text-crimson-500 group-hover:text-crimson-400 transition-colors" />
          <span className="font-mono text-sm text-crimson-500 group-hover:text-crimson-400 transition-colors">
            MJJ
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks?.map?.((link) => (
            <a
              key={link?.href}
              href={link?.href}
              className="px-4 py-2 text-sm font-mono text-gray-400 hover:text-crimson-500 hover:bg-crimson-500/10 rounded transition-all duration-200"
            >
              {link?.label}
            </a>
          )) ?? []}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-crimson-500 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-charcoal-400/95 backdrop-blur-md border-t border-crimson-500/20 px-6 pb-4"
        >
          {navLinks?.map?.((link) => (
            <a
              key={link?.href}
              href={link?.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-mono text-gray-400 hover:text-crimson-500 border-b border-charcoal-50/20 last:border-0 transition-colors"
            >
              {link?.label}
            </a>
          )) ?? []}
        </motion.nav>
      )}
    </motion.header>
  );
}
