'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Server, Monitor, Database, Network } from 'lucide-react';
import type { SkillCategory } from '../data/portfolio-config';
import { TechIcon } from './tech-icons';

const iconMap: Record<string, React.ElementType> = {
  Server,
  Monitor,
  Database,
  Network,
};

export default function SkillsSection({ data }: { data: SkillCategory[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-crimson-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Tech <span className="text-crimson-500">Stack</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson-500/40 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.map?.((category, i) => {
              const IconComp = iconMap?.[category?.icon ?? ''] ?? Cpu;
              return (
                <motion.div
                  key={category?.name ?? i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="bg-charcoal-300/40 rounded p-5 md:p-6 border border-charcoal-50/10 hover:border-crimson-500/20 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-crimson-500/10 rounded">
                      <IconComp className="w-5 h-5 text-crimson-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category?.name ?? ''}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category?.skills?.map?.((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-mono text-gray-300 bg-charcoal-500/60 hover:bg-crimson-500/15 hover:text-crimson-400 rounded border border-charcoal-50/10 hover:border-crimson-500/30 transition-all duration-200 cursor-default"
                      >
                        <TechIcon name={skill} className="w-3.5 h-3.5 opacity-60" />
                        {skill}
                      </motion.span>
                    )) ?? []}
                  </div>
                </motion.div>
              );
            }) ?? []}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
