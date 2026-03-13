'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Terminal } from 'lucide-react';

interface AboutData {
  text: string;
}

export default function AboutSection({ data }: { data: AboutData | undefined }) {
  const text = data?.text ?? '';
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-charcoal-400/30" />
      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-crimson-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              About <span className="text-crimson-500">Me</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson-500/40 to-transparent ml-4" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-charcoal-300/50 rounded p-6 md:p-8 border border-charcoal-50/10 shadow-lg hover:border-crimson-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-gray-500">
              <Terminal className="w-3.5 h-3.5" />
              <span>cat about.md</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              {text}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
