// frontend/src/components/layout/Header.jsx (ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ)
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const NAVIGATION = {
  services: [
    { name: 'Custom Development', href: '/services/custom-development', description: 'End-to-end software project delivery.' },
    { name: 'Dedicated Team', href: '/services/dedicated-team', description: 'Seamless extension of your in-house team.' },
  ],
  industries: [
    { name: 'Fintech', href: '/industries/fintech', description: 'Financial technology solutions.' },
    { name: 'Healthcare', href: '/industries/healthcare', description: 'Healthcare & medical software.' },
    { name: 'eCommerce', href: '/industries/ecommerce', description: 'Online retail & marketplace solutions.' },
    { name: 'Logistics', href: '/industries/logistics', description: 'Supply chain & fleet management.' },
  ],
};

// ИСПРАВЛЕННЫЙ ListItem с правильной навигацией
const ListItem = React.forwardRef(({ title, children, href, ...props }, ref) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          onClick={handleClick}
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2" aria-label="Back to homepage">
          <span className="text-2xl font-bold text-primary">SoftDAB</span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                  {NAVIGATION.services.map((component) => (
                    <ListItem key={component.name} title={component.name} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {NAVIGATION.industries.map((component) => (
                    <ListItem key={component.name} title={component.name} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/case-studies" className={navigationMenuTriggerStyle()}>
                Case Studies
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/company/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/company/contact" className={navigationMenuTriggerStyle()}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden lg:flex">
            <Link to="/company/contact">Talk to an expert</Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-foreground ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>Home</Link>
                <Link to="/case-studies" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-foreground ${pathname === '/case-studies' ? 'text-foreground' : 'text-muted-foreground'}`}>Case Studies</Link>
                <Link to="/company/about" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-foreground ${pathname === '/company/about' ? 'text-foreground' : 'text-muted-foreground'}`}>About</Link>
                <Link to="/company/contact" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-foreground ${pathname === '/company/contact' ? 'text-foreground' : 'text-muted-foreground'}`}>Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;