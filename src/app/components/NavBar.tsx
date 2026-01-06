'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavItem[];
}

export default function Navbar({ items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
] }: NavbarProps) {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-95" />
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <ul className="flex items-center justify-center gap-2 md:gap-4">
            {items.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href} className="flex-1 max-w-[200px]">
                  <Link href={item.href} className="block">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        px-4 py-2 rounded-lg text-center font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-white/10 text-white shadow-lg' 
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
