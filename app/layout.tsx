import type { Metadata } from 'next';
import { Montserrat, Poppins, Raleway } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Team PIXEL - Professional Photography',
  description: 'Stop Posting, Start Growing. Pixel Media is a strategic visual agency that transforms brand identities through cinematic storytelling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} ${raleway.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body className="font-poppins bg-dark-bg text-text-color">
        <div style={{ backgroundColor: '#0d0916', minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  );
}