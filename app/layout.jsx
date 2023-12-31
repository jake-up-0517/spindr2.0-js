import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]/authOptions';

import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SpindrPro2.0',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
