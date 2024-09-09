"use client"
import OverviewHeader from '@/components/overview/header';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OverviewLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const cookieValue = Cookies.get('access-token');
    if (!cookieValue)
      router.replace('/');
  }, []);

  return (
    <main className="overview">
      <OverviewHeader />
      {children}
    </main>
  );
}