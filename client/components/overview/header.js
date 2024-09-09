"use client"
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OverviewHeader() {
  const router = useRouter();

  function doSignout() {
    // callFetch('signout', 'POST', [], null).then(res => {
    Cookies.remove('access-token');
    router.replace('/');
    console.log('out');
    // });
  }

  return (
    <div className="container-fluid bg-white">
      <header className="d-flex flex-wrap justify-content-end py-3">
        <div className="col-md-8">
          <Image src="/logo.png" className="m-2" width="197" height="32" priority={true} alt="" />
        </div>
        <div className="col-md-4 text-end">
          <Image src="/notification.png" className="me-3" width="60" height="50" alt="" />
          <div className="dropdown-toggle d-inline-block border p-1 profile" style={{ background: '#F7F8FA' }} data-bs-toggle="dropdown" aria-expanded="false">
            <Image src="/profile.png" width="44" height="36" alt="" />
            <div className="d-inline-block text-start ms-2 align-middle">
              <p className="m-0" style={{ fontSize: '0.8rem', width: '120px' }}>Michael</p>
              <p className="m-0 fw-light" style={{ fontSize: '0.7rem' }}>View Profile</p>
            </div>
          </div>
          <ul className="dropdown-menu">
            <li className="dropdown-item" onClick={() => doSignout()}>Sign out</li>
          </ul>
        </div>
      </header>
    </div>
  );
}