'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import type { Education, Certification } from '../data/portfolio-config';

export default function EducationSection({
  education,
  certifications,
}: {
  education: Education[];
  certifications: Certification[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-24 relative">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-crimson-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Education & <span className="text-crimson-500">Certifications</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson-500/40 to-transparent ml-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-crimson-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Academic Background
              </h3>
              {education?.map?.((edu, i) => (
                <motion.div
                  key={edu.institution + i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-charcoal-300/40 rounded p-5 border border-charcoal-50/10 hover:border-crimson-500/20 transition-all duration-300"
                >
                  <h4 className="text-white font-semibold text-base">{edu.degree}</h4>
                  <p className="text-gray-400 text-sm mt-1">{edu.institution}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </span>
                    <span className="font-mono text-xs text-crimson-400/70">{edu.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-crimson-400 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications & Courses
              </h3>
              {certifications?.map?.((cert, i) => (
                <motion.div
                  key={cert.name + i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-charcoal-300/40 rounded p-4 border border-charcoal-50/10 hover:border-crimson-500/20 transition-all duration-300 flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-crimson-500 mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{cert.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {cert.issuer && (
                        <span className="text-gray-500 text-xs">{cert.issuer}</span>
                      )}
                      <span className="font-mono text-[10px] text-crimson-400/60">{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
