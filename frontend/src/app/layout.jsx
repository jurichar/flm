// src/app/layout.jsx

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/tailwind.css';
import NavbarSimple from '../components/Navbar/Navbar';
import Providers from '../components/Auth/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const Layout = async ({ children }) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NavbarSimple />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;