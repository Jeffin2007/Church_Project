import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { NotificationProvider } from '@/context/notification-context';
import { AnnouncementProvider } from '@/context/announcement-context';
import { FamilyProvider } from '@/context/family-context';
import { SacredLoadingScreen } from '@/components/ui/loading-screen';

import './globals.css';
import { APP_NAME } from '@qoas/constants';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'Queen of All Saints Roman Catholic Church — Parish Management System. Serving our community with faith and love.',
  keywords: ['Queen of All Saints', 'Catholic Church', 'Parish', 'Trichy', 'Church Management'],
  authors: [{ name: 'QOAS Admin' }],
  creator: 'Queen of All Saints Parish',
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8B1A1A' },
    { media: '(prefers-color-scheme: dark)', color: '#1a0505' },
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon configuration */}
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />

        {/* Noto Sans Tamil — loaded via Google Fonts so the name 'Noto Sans Tamil' is
            available directly for all inline fontFamily styles across the app */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (!sessionStorage.getItem('qoas_loaded') && !localStorage.getItem('qoas_loaded')) {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                      document.documentElement.classList.add('qoas-loading');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SacredLoadingScreen />
          <div id="main-app-wrapper">
            <NotificationProvider>
              <AnnouncementProvider>
                <FamilyProvider>{children}</FamilyProvider>
              </AnnouncementProvider>
            </NotificationProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
