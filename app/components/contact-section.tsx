'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

interface ContactData {
  email: string;
  socials: { platform: string; url: string; label: string }[];
}

const socialIcons: Record<string, React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
};

export default function ContactSection({ data }: { data: ContactData | undefined }) {
  const email = data?.email ?? '';
  const socials = data?.socials ?? [];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-charcoal-400/30" />
      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <Send className="w-5 h-5 text-crimson-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Get In <span className="text-crimson-500">Touch</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson-500/40 to-transparent ml-4" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-charcoal-300/40 rounded p-6 md:p-8 border border-charcoal-50/10 shadow-lg max-w-2xl"
          >
            <p className="text-gray-400 mb-6 leading-relaxed">
              Interested in working together or have a project in mind? Feel free to reach out through any of the channels below.
            </p>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 bg-charcoal-500/50 hover:bg-crimson-500/10 rounded border border-charcoal-50/10 hover:border-crimson-500/20 transition-all duration-200 group"
              >
                <div className="p-2 bg-crimson-500/10 rounded group-hover:bg-crimson-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-crimson-500" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="text-gray-300 group-hover:text-crimson-400 transition-colors font-mono text-sm">
                    {email}
                  </p>
                </div>
              </a>

              {/* Socials */}
              {socials?.map?.((social) => {
                const IconComp = socialIcons?.[social?.platform ?? ''] ?? Mail;
                return (
                  <a
                    key={social?.platform}
                    href={social?.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-charcoal-500/50 hover:bg-crimson-500/10 rounded border border-charcoal-50/10 hover:border-crimson-500/20 transition-all duration-200 group"
                  >
                    <div className="p-2 bg-crimson-500/10 rounded group-hover:bg-crimson-500/20 transition-colors">
                      <IconComp className="w-5 h-5 text-crimson-500" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                        {social?.platform ?? ''}
                      </p>
                      <p className="text-gray-300 group-hover:text-crimson-400 transition-colors font-mono text-sm">
                        {social?.label ?? ''}
                      </p>
                    </div>
                  </a>
                );
              }) ?? []}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
