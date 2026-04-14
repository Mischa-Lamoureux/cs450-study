'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loadProgress, getLevelForXP } from '@/lib/progress';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/notes', label: 'Notes' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/practice-finals', label: 'Practice Finals' },
  { href: '/assignment-practice', label: 'HW Practice' },
  { href: '/progress', label: 'Progress' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    setXp(p.xp);
    setStreak(p.streak);

    const interval = setInterval(() => {
      const p = loadProgress();
      setXp(p.xp);
      setStreak(p.streak);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const levelInfo = getLevelForXP(xp);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-[var(--primary-light)]">CS 450</span>
            <span className="text-[var(--muted)] text-sm font-normal hidden sm:inline">Study Hub</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* XP and streak */}
          <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-orange-400">&#x1F525;</span>
                <span className="text-[var(--muted)]">{streak}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-[var(--card)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progress * 100}%` }}
                />
              </div>
              <span className="text-xs text-[var(--muted)]">Lv{levelInfo.level}</span>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-[var(--card)]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {menuOpen ? (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 border-t border-[var(--border)] mt-1 pt-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
