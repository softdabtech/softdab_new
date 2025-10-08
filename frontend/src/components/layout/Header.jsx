import React, { useState, useEffect } from 'react';
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = {
    services: [
      { name: 'Outsourcing', href: '/services/outsourcing', description: 'Custom software development projects' },
      { name: 'Dedicated Teams', href: '/services/dedicated-teams', description: 'Extended development teams' },
    ],
    industries: [
      { name: 'Fintech', href: '/industries/fintech', description: 'Financial technology solutions' },
      { name: 'Healthcare', href: '/industries/healthcare', description: 'Healthcare & medical software' },
      { name: 'eCommerce', href: '/industries/ecommerce', description: 'Online retail & marketplace solutions' },
      { name: 'Logistics', href: '/industries/logistics', description: 'Supply chain & fleet management' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ]
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">SoftDAB</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-primary transition-colors">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {navigation.services.map((service) => (
                        <NavigationMenuLink key={service.href} asChild>
                          <Link
                            to={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Industries Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-primary transition-colors">
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {navigation.industries.map((industry) => (
                        <NavigationMenuLink key={industry.href} asChild>
                          <Link
                            to={industry.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{industry.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {industry.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct Links */}
                <NavigationMenuItem>
                  <Link
                    to="/case-studies"
                    className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                      isActiveLink('/case-studies') ? 'text-primary' : ''
                    }`}
                  >
                    Case Studies
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                      isActiveLink('/about') ? 'text-primary' : ''
                    }`}
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/contact"
                    className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                      isActiveLink('/contact') ? 'text-primary' : ''
                    }`}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button
              asChild
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-all hover-lift"
            >
              <Link to="/contact">Talk to an expert</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-6">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold"
                >
                  Home
                </Link>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Services</h4>
                  {navigation.services.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-600 hover:text-primary pl-4"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Industries</h4>
                  {navigation.industries.map((industry) => (
                    <Link
                      key={industry.href}
                      to={industry.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-600 hover:text-primary pl-4"
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/case-studies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold"
                >
                  Case Studies
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold"
                >
                  Contact
                </Link>

                <Button
                  asChild
                  className="bg-primary hover:bg-primary-dark text-white mt-6"
                >
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Talk to an expert
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;