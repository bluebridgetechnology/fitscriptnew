"use client"
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function DashboardHeader({ setIsMobileMenuOpen }) {
  const router = useRouter();

  function doSignout() {
    Cookies.remove('access-token');
    router.replace('/');
  }

  return (
    <div className="header-controls">
      <button 
        className="btn d-md-none me-2"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu size={24} />
      </button>
      <div className="d-md-none flex-grow-1 text-center">
        <Image src="/logo.png" width="150" height="24" alt="FITScript" />
      </div>
      <div className="d-flex align-items-center">
        <Image src="/notification.png" className="me-3" width="50" height="45" alt="Notifications" />
        <div className="dropdown">
          <div className="dropdown-toggle d-flex align-items-center border p-1 profile" style={{ background: '#F7F8FA' }} data-bs-toggle="dropdown" aria-expanded="false">
            <Image src="/profile.png" width="44" height="36" alt="Profile" />
            <div className="ms-2">
              <p className="m-0" style={{ fontSize: '0.8rem' }}>Michael</p>
              <p className="m-0 fw-light" style={{ fontSize: '0.7rem' }}>View Profile</p>
            </div>
          </div>
          <ul className="dropdown-menu dropdown-menu-end">
            <li className="dropdown-item" onClick={() => doSignout()}>Sign out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
