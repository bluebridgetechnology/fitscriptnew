"use client"

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  const [cssVersion, setCssVersion] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setCssVersion(new Date().getTime().toString());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.min.js');
    }
  }, []);

  useEffect(() => {
    // ... form validation code ...
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`/globals.css?v=${cssVersion}`} />
      </head>
      <body>
        <ToastContainer position="top-right" theme="colored" />
        {children}
      </body>
    </html>
  );
}
