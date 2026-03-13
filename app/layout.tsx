import type { Metadata } from 'next';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Marcelo Javier Jaimes | Senior Full Stack Developer',
  description:
    'Portfolio of Marcelo Javier Jaimes — Senior Full Stack Developer & Systems Engineer specializing in Java, Spring Boot, and microservices architecture.',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Marcelo Javier Jaimes | Senior Full Stack Developer',
    description:
      'Portfolio of Marcelo Javier Jaimes — Senior Full Stack Developer & Systems Engineer.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className="bg-charcoal-500 text-gray-200 antialiased">
        <div className="crt-overlay" />
        {children}
      </body>
    </html>
  );
}
