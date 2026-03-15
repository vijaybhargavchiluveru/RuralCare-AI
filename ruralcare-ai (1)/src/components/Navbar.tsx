import { Link, useLocation } from 'react-router-dom';
import { Activity, Stethoscope, Building2, LayoutDashboard, HeartPulse } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: HeartPulse },
    { path: '/patient', label: 'Patient Portal', icon: Activity },
    { path: '/hospitals', label: 'Hospitals', icon: Building2 },
    { path: '/physicians', label: 'Physicians', icon: Stethoscope },
    { path: '/doctor', label: 'Doctor Dashboard', icon: LayoutDashboard },
    { path: '/admin', label: 'Admin', icon: LayoutDashboard },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl tracking-tight">
                <HeartPulse className="h-6 w-6" />
                RuralCare AI
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-emerald-500 text-slate-900'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
