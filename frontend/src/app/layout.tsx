import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthHydrator } from '@/components/providers/AuthHydrator';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clothify — Cửa hàng thời trang cao cấp',
  description: 'Nền tảng thương mại điện tử thời trang dành cho thị trường Việt Nam',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <AuthHydrator>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthHydrator>
        </StoreProvider>
      </body>
    </html>
  );
}
