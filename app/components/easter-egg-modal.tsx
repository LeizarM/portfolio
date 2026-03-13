'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

interface EasterEggModalProps {
  open: boolean;
  onClose: () => void;
  data: { asciiArt: string; message: string } | undefined;
}

export default function EasterEggModal({ open, onClose, data }: EasterEggModalProps) {
  const asciiArt = data?.asciiArt ?? '';
  const message = data?.message ?? '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e?.stopPropagation?.()}
            className="relative bg-charcoal-400 border border-crimson-500/30 rounded shadow-2xl shadow-crimson-500/10 max-w-md w-full overflow-hidden"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal-500/80 border-b border-crimson-500/20">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-crimson-500" />
                <span className="font-mono text-xs text-crimson-400">system_status.sh</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-crimson-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 font-mono text-sm">
              <pre className="text-crimson-400 text-center mb-4 text-xs leading-tight">
                {asciiArt}
              </pre>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-green-500">$</span> ./check_status.sh
                </p>
                <p className="text-crimson-400 text-glow-crimson">
                  {message}
                </p>
                <p className="text-gray-600 mt-4">
                  <span className="text-green-500">$</span>{' '}
                  <span className="animate-blink">▋</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
