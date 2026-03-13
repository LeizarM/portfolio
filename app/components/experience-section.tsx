'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ChevronRight } from 'lucide-react';
import type { Experience } from '../data/portfolio-config';

export default function ExperienceSection({ data }: { data: Experience[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-24 relative">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-crimson-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Experience <span className="text-crimson-500">Log</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson-500/40 to-transparent ml-4" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-crimson-500/60 via-crimson-500/20 to-transparent" />

            <div className="space-y-8">
              {data?.map?.((exp, i) => (
                <motion.div
                  key={exp?.company ?? i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative pl-12 md:pl-16 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full bg-crimson-500 border-2 border-charcoal-500 shadow-lg shadow-crimson-500/30 group-hover:scale-125 transition-transform" />

                  <div className="bg-charcoal-300/40 rounded p-5 md:p-6 border border-charcoal-50/10 hover:border-crimson-500/20 shadow-md hover:shadow-lg hover:shadow-crimson-500/5 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-crimson-400 transition-colors">
                          {exp?.company ?? 'Company'}
                        </h3>
                        <p className="text-crimson-400 font-mono text-sm flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" />
                          {exp?.role ?? ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-xs text-gray-500 bg-charcoal-500/50 px-3 py-1 rounded whitespace-nowrap">
                          {exp?.period ?? ''}
                        </span>
                        {exp?.location && (
                          <span className="font-mono text-[10px] text-gray-600">
                            📍 {exp.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                      {exp?.description ?? ''}
                    </p>
                    {exp?.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {exp.highlights.map((h, idx) => (
                          <li key={idx} className="text-gray-500 text-xs leading-relaxed flex items-start gap-2">
                            <span className="text-crimson-500/60 mt-0.5 shrink-0">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {exp?.tech?.map?.((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 text-xs font-mono text-crimson-400 bg-crimson-500/10 rounded border border-crimson-500/20"
                        >
                          {t}
                        </span>
                      )) ?? []}
                    </div>
                  </div>
                </motion.div>
              )) ?? []}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
