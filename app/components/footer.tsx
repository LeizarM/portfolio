'use client';

import { useState } from 'react';
import { Terminal } from 'lucide-react';
import EasterEggModal from './easter-egg-modal';

interface EasterEggData {
  asciiArt: string;
  message: string;
}

export default function Footer({ easterEgg }: { easterEgg: EasterEggData | undefined }) {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <>
      <footer className="py-8 border-t border-charcoal-50/10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} Marcelo Javier Jaimes. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 text-xs font-mono">
              Built with Next.js & Tailwind CSS
            </p>
            <button
              onClick={() => setShowEgg(true)}
              className="p-2 text-gray-600 hover:text-crimson-500 transition-colors hover:bg-crimson-500/10 rounded"
              aria-label="System status"
              title="System status"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      <EasterEggModal
        open={showEgg}
        onClose={() => setShowEgg(false)}
        data={easterEgg}
      />
    </>
  );
}
