import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculator",
  description: "Calculate using the best calculator in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
