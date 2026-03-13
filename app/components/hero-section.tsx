'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  bootSequence: string[];
}

export default function HeroSection({ data }: { data: HeroData | undefined }) {
  const name = data?.name ?? '';
  const title = data?.title ?? '';
  const subtitle = data?.subtitle ?? '';
  const bootSequence = data?.bootSequence ?? [];

  const [bootIndex, setBootIndex] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Boot sequence
  useEffect(() => {
    if (bootIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => setBootDone(true), 600);
      return () => clearTimeout(doneTimer);
    }
  }, [bootIndex, bootSequence.length]);

  // Typewriter for title
  useEffect(() => {
    if (!bootDone) return;
    if (typedTitle.length < title.length) {
      const timer = setTimeout(() => {
        setTypedTitle(title.slice(0, typedTitle.length + 1));
      }, 35);
      return () => clearTimeout(timer);
    }
  }, [bootDone, typedTitle, title]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-crimson-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-crimson-900/10 via-charcoal-500 to-charcoal-500" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <AnimatePresence mode="wait">
          {!bootDone ? (
            <motion.div
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="font-mono text-sm space-y-1"
            >
              {bootSequence.slice(0, bootIndex)?.map?.((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${
                    line?.startsWith?.('[OK]')
                      ? 'text-green-500'
                      : line?.startsWith?.('[BOOT]')
                      ? 'text-crimson-500'
                      : line?.startsWith?.('[READY]')
                      ? 'text-crimson-400 text-glow-crimson'
                      : 'text-gray-500'
                  }`}
                >
                  {line}
                </motion.p>
              )) ?? []}
              <span
                className={`inline-block w-2 h-4 bg-crimson-500 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-crimson-500 text-sm tracking-widest uppercase"
              >
                {'> '}Hello, I am
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                {name}
              </motion.h1>

              <div className="font-mono text-lg md:text-xl text-crimson-400">
                <span className="text-gray-500">{'$ '}</span>
                {typedTitle}
                <span
                  className={`inline-block w-2.5 h-5 bg-crimson-500 ml-1 align-middle ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-gray-400 text-lg max-w-2xl leading-relaxed"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex gap-4 pt-4"
              >
                <a
                  href="#projects"
                  className="px-6 py-3 bg-crimson-500 hover:bg-crimson-600 text-white font-mono text-sm rounded transition-all duration-200 shadow-lg shadow-crimson-500/20 hover:shadow-crimson-500/40"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border border-crimson-500/40 hover:border-crimson-500 text-crimson-400 hover:text-crimson-300 font-mono text-sm rounded transition-all duration-200"
                >
                  Get In Touch
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      {bootDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6 text-crimson-500/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
