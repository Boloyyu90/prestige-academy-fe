'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/shared/lib/utils/cn';
import { m, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/shared/hooks/use-scroll-progress';
import { useActiveSection } from '@/shared/hooks/use-active-section';

const navigation = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang Kami', href: '#about' },
  { name: 'Manfaat', href: '#benefits' },
  { name: 'Keunggulan', href: '#features' },
  { name: 'Paket Belajar', href: '#packages' },
  { name: 'Testimoni', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ FIXED: Simplified useTheme destructuring - NO infinite loop triggers
  const { theme, setTheme, resolvedTheme } = useTheme();

  const { isAtTop } = useScrollProgress();
  const sectionIds = navigation.map(item => item.href.substring(1));
  const activeSectionId = useActiveSection(sectionIds);

  // ✅ FIXED: Single useEffect for mounting - NO dependencies that cause loops
  useEffect(() => {
    setMounted(true);
  }, []); // ⚠️ CRITICAL: Empty dependency array

  const handleRegisterClick = () => { window.location.href = '/register'; };
  const handleLoginClick = () => { window.location.href = '/login'; };

  // ✅ FIXED: Simplified theme toggle - NO complex state updates
  const toggleTheme = () => {
    if (!mounted || !setTheme) return;

    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // ✅ FIXED: Simplified theme text - NO complex logic
  const getThemeText = () => {
    if (!mounted) return 'Mode Tema';
    return theme === 'dark' ? 'Mode Gelap' : 'Mode Terang';
  };

  // ✅ FIXED: Simple loading state - NO complex rendering
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted animate-pulse rounded" />
                <div className="w-32 h-6 bg-muted animate-pulse rounded" />
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="w-10 h-6 bg-muted animate-pulse rounded-full" />
                <div className="w-20 h-10 bg-muted animate-pulse rounded-full" />
                <div className="w-20 h-10 bg-muted animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header id="home-header" className="fixed top-0 left-0 right-0 z-50">
      {/* Main Header Bar */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        !isAtTop && "bg-background/80 backdrop-blur-md border-b border-border shadow-md"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
              <Image
                src="/images/logo/logo-prestige.svg"
                alt="Logo"
                width={43}
                height={65}
                className="h-10 w-auto"
                priority
              />
              <div className="text-xl font-bold">
                <span className="text-primary">Prestige</span>
                <span className="text-secondary ml-1">Academy</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = `#${activeSectionId}` === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'relative text-sm font-medium transition-colors hover:text-primary',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <m.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                        layoutId="active-nav-link"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* ✅ FIXED: Simple Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-6 bg-muted rounded-full p-1 transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Toggle theme"
                type="button"
              >
                <div className={cn(
                  'w-4 h-4 bg-background rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center',
                  resolvedTheme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                )}>
                  {resolvedTheme === 'dark' ? (
                    <Moon className="w-2.5 h-2.5 text-muted-foreground" />
                  ) : (
                    <Sun className="w-2.5 h-2.5 text-yellow-500" />
                  )}
                </div>
              </button>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="secondary"
                  size="default"
                  animation="scale"
                  onClick={handleRegisterClick}
                  className="font-semibold shadow-colored-secondary"
                >
                  Daftar
                </Button>

                <Button
                  variant="default"
                  size="default"
                  animation="scale"
                  onClick={handleLoginClick}
                  className="relative overflow-hidden group"
                >
                  <div className="flex items-center gap-2">
                    <span>Masuk</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14m-7-7l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              type="button"
            >
              <div className="relative w-6 h-6">
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-300",
                  mobileMenuOpen ? "scale-0 rotate-180 opacity-0" : "scale-100 rotate-0 opacity-100"
                )}>
                  <Menu className="w-6 h-6" />
                </div>

                <div className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-300",
                  mobileMenuOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-180 opacity-0"
                )}>
                  <X className="w-6 h-6" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-background rounded-b-3xl shadow-lg"
          >
            {/* Navigation Links */}
            <div className="py-4 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = `#${activeSectionId}` === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block py-3 px-4 text-base font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'text-primary bg-primary/10 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                    )}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="border-t border-border bg-muted/20 rounded-b-xl">
              <div className="py-4 px-4 space-y-4">
                {/* Mobile Theme Toggle */}
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-muted">
                      {resolvedTheme === 'dark' ? (
                        <Moon className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Sun className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {getThemeText()}
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="relative w-12 h-6 bg-muted rounded-full p-1 transition-all duration-300 hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                    type="button"
                  >
                    <div className={cn(
                      'w-4 h-4 bg-background rounded-full shadow-sm flex items-center justify-center border border-border/20 transition-transform duration-300',
                      resolvedTheme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                    )}>
                      {resolvedTheme === 'dark' ? (
                        <Moon className="w-2.5 h-2.5 text-muted-foreground" />
                      ) : (
                        <Sun className="w-2.5 h-2.5 text-yellow-500" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full justify-center rounded-xl"
                    onClick={() => {
                      handleLoginClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>Masuk</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12h14m-7-7l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full font-semibold rounded-xl"
                    onClick={() => {
                      handleRegisterClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}