'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FolderGit2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '../data/portfolio-config';

export default function ProjectsSection({ data }: { data: Project[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-charcoal-400/30" />
      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-5 h-5 text-crimson-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Project <span className="text-crimson-500">Repository</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson-500/40 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map?.((project, i) => (
              <motion.div
                key={project?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group bg-charcoal-300/40 rounded overflow-hidden border border-charcoal-50/10 hover:border-crimson-500/30 shadow-md hover:shadow-xl hover:shadow-crimson-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-video bg-charcoal-400 overflow-hidden">
                  <Image
                    src={project?.image ?? ''}
                    alt={project?.title ?? 'Project image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-crimson-400 transition-colors">
                        {project?.title ?? ''}
                      </h3>
                      <p className="text-xs font-mono text-crimson-500/80">
                        {project?.subtitle ?? ''}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-crimson-500 transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project?.description ?? ''}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project?.tech?.map?.((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs font-mono text-crimson-400 bg-crimson-500/10 rounded border border-crimson-500/20"
                      >
                        {t}
                      </span>
                    )) ?? []}
                  </div>
                </div>
              </motion.div>
            )) ?? []}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
