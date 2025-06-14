/*
import { ClerkProvider } from '@clerk/nextjs';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/sonner"

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Moneymate',
  description: 'Your one-stop solution to financial visualization',
};

export default function RootLayout({ children }) {
  return (
     <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
*/


import { ClerkProvider } from '@clerk/nextjs';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/sonner"
import ChatWidget from './ChatWidget';  // import the client widget

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Moneymate',
  description: 'Your one-stop solution to financial visualization',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster />
          {children}
          <ChatWidget />  {/* inject chat globally */}
        </body>
      </html>
    </ClerkProvider>
  );
}



/*import {Inter, Outfit} from "next/font/google";
import "./globals.css";
import { title } from "process";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({subsets: ["latin"]});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}){
  return(
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
*/

/*import { Geist, Geist_Mono, Outfit, Poppins, Jost } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
*/