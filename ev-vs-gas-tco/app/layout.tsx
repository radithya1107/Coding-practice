import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EV vs Gas — TCO Calculator",
  description: "5-year total cost of ownership calculator for EV vs Gas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
        <Script id="cache-bust" strategy="beforeInteractive">
          {`
            // Add cache-control meta tags to prevent aggressive caching
            if (typeof document !== 'undefined') {
              const metaTags = [
                { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
                { httpEquiv: 'Pragma', content: 'no-cache' },
                { httpEquiv: 'Expires', content: '0' }
              ];
              metaTags.forEach(tag => {
                let meta = document.querySelector(\`meta[http-equiv="\${tag.httpEquiv}"]\`);
                if (!meta) {
                  meta = document.createElement('meta');
                  meta.setAttribute('http-equiv', tag.httpEquiv);
                  document.head.appendChild(meta);
                }
                meta.setAttribute('content', tag.content);
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
