import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { NoSsr } from '@mui/base';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scrabble Calculator',
  description: "Let's hit the highscore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NoSsr>
          {children}
          <ToastContainer />
        </NoSsr>
      </body>
    </html>
  );
}
