import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const importIcon = (iconName) => dynamic(() =>
  import('lucide-react').then((mod) => mod[iconName] || (() => null))
);

const LayoutDashboard = importIcon('LayoutDashboard');
const PhoneCall = importIcon('PhoneCall');
const Star = importIcon('Star');
const Calendar = importIcon('Calendar');
const MessageSquare = importIcon('MessageSquare');
const FileText = importIcon('FileText');
const Pill = importIcon('Pill');
const User = importIcon('User');
const HelpCircle = importIcon('HelpCircle');
const LifeBuoy = importIcon('LifeBuoy');
const Settings = importIcon('Settings');

export default function DashboardSidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Your FitScript' },
    { href: '/weekly-calls', icon: PhoneCall, label: 'Weekly Calls' },
    { href: '/spotlight', icon: Star, label: 'Spotlight' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/chat', icon: MessageSquare, label: 'Chat with a Coach' },
    { href: '/reports', icon: FileText, label: 'Reports' },
    { href: '/supplement', icon: Pill, label: 'Supplement' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  const managementItems = [
    { href: '/help', icon: HelpCircle, label: 'Help' },
    { href: '/support', icon: LifeBuoy, label: 'Support' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'open' : 'd-none d-md-block'}`}>
      <div className="d-flex justify-content-between align-items-center mb-4 d-md-none">
        <Image src="/logo.png" width="150" height="24" alt="FITScript" />
        <button className="btn-close" onClick={() => setIsMobileMenuOpen(false)}></button>
      </div>
      <h6 className="mb-3 text-muted">Main Menu</h6>
      <nav className="nav flex-column mb-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`nav-link d-flex align-items-center mb-2 ${isActive(item.href) ? 'active' : ''}`}
          >
            <item.icon className="me-2" size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <h6 className="mb-3 text-muted">Management</h6>
      <nav className="nav flex-column">
        {managementItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`nav-link d-flex align-items-center mb-2 ${isActive(item.href) ? 'active' : ''}`}
          >
            <item.icon className="me-2" size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}