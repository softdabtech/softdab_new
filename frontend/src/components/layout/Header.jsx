// frontend/src/components/layout/Header.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

// ИСПРАВЛЕНЫ ПУТИ (href)
const NAVIGATION = {
  services: [
    { name: 'Custom Development', href: '/services/custom-development', description: 'Custom software development projects' },
    { name: 'Dedicated Team', href: '/services/dedicated-team', description: 'Extended development teams' },
  ],
  // ПРИМЕЧАНИЕ: У вас только одна страница для всех индустрий.
  // Эти ссылки будут вести на нее с якорями (можно будет настроить позже).
  industries: [
    { name: 'Fintech', href: '/industries#fintech', description: 'Financial technology solutions' },
    { name: 'Healthcare', href: '/industries#healthcare', description: 'Healthcare & medical software' },
    { name: 'eCommerce', href: '/industries#ecommerce', description: 'Online retail & marketplace solutions' },
    { name: 'Logistics', href: '/industries#logistics', description: 'Supply chain & fleet management' },
  ],
};

const BASE_ITEM = 'inline-flex items-center justify-center h-10 px-4 rounded-md text-sm font-medium transition-colors';
const ITEM_COLORS = 'text-gray-700 hover:text-primary focus:text-primary hover:bg-gray-50 focus:bg-gray-50';
const EQUAL_WIDTH = 'min-w-[130px]';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = useMemo(() => (path) => location.pathname === path, [location.pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'
      }`}
      aria-label="Site header"
    >
      <div className="container mx-auto px-6 py-3 lg:py-4">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="flex items-center space-x-2 no-underline hover:no-underline focus:no-underline" aria-label="Home">
            <div className="text-2xl font-bold text-primary select-none">SoftDAB</div>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`${BASE_ITEM} ${ITEM_COLORS} ${EQUAL_WIDTH} aria-expanded:rounded-b-none`} aria-label="Services">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[420px] gap-3 p-4">
                      {NAVIGATION.services.map((service) => (
                        <NavigationMenuLink key={service.href} asChild><Link to={service.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50"><div className="text-sm font-medium leading-none text-gray-900">{service.name}</div><p className="line-clamp-2 text-sm leading-snug text-gray-600">{service.description}</p></Link></NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`${BASE_ITEM} ${ITEM_COLORS} ${EQUAL_WIDTH} aria-expanded:rounded-b-none`} aria-label="Industries">Industries</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[420px] gap-3 p-4">
                      {NAVIGATION.industries.map((industry) => (
                        <NavigationMenuLink key={industry.href} asChild><Link to={industry.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50"><div className="text-sm font-medium leading-none text-gray-900">{industry.name}</div><p className="line-clamp-2 text-sm leading-snug text-gray-600">{industry.description}</p></Link></NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/case-studies" className={`${BASE_ITEM} ${ITEM_COLORS} ${EQUAL_WIDTH} ${isActiveLink('/case-studies') ? 'text-primary' : ''}`}>Case Studies</Link>
                </NavigationMenuItem>

                {/* ИСПРАВЛЕНЫ ПУТИ */}
                <NavigationMenuItem>
                  <Link to="/company/about" className={`${BASE_ITEM} ${ITEM_COLORS} ${EQUAL_WIDTH} ${isActiveLink('/company/about') ? 'text-primary' : ''}`}>About</Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/company/contact" className={`${BASE_ITEM} ${ITEM_COLORS} ${EQUAL_WIDTH} ${isActiveLink('/company/contact') ? 'text-primary' : ''}`}>Contact</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden lg:flex"><Button asChild className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-medium transition-colors"><Link to="/company/contact" className="hover:text-white focus:text-white">Talk to an expert</Link></Button></div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle navigation menu"><Menu className="h-6 w-6" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[380px]">
              <nav className="flex flex-col space-y-6 mt-6">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold">Home</Link>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Services</h4>
                  {NAVIGATION.services.map((service) => (<Link key={service.href} to={service.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary pl-4">{service.name}</Link>))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Industries</h4>
                  {NAVIGATION.industries.map((industry) => (<Link key={industry.href} to={industry.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary pl-4">{industry.name}</Link>))}
                </div>
                <Link to="/case-studies" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold">Case Studies</Link>
                {/* ИСПРАВЛЕНЫ ПУТИ */}
                <Link to="/company/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold">About</Link>
                <Link to="/company/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold">Contact</Link>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white mt-6"><Link to="/company/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">Talk to an expert</Link></Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;