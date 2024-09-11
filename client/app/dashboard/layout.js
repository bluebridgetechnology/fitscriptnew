"use client"
import DashboardHeader from './header';
import DashboardSidebar from './sidebar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const cookieValue = Cookies.get('access-token');
    if (!cookieValue)
      router.replace('/');
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-container">
          <Image src="/logo.png" width="197" height="32" alt="FITScript" />
        </div>
        <DashboardHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </header>
      <div className="dashboard-content">
        <DashboardSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
