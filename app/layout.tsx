import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import React from 'react';
import { DarkModeButton } from '@/components/DarkModeButton';

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Awesome Axioms',
  description: 'Create your own axioms and see what sticks (with the help of AI)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={vt323.className}>
        <header className={styles.header}>
          <h1 style={{ margin: 0 }}>Awesome Axioms</h1>
          <DarkModeButton />
        </header>
        {children}
      </body>
    </html>
  );
}
