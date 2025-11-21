import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Instagram } from 'lucide-react';
import { Separator } from '../ui/separator';
import Logo from '../ui/Logo';

const FOOTER_SECTIONS = {
  services: [
    { name: 'Custom Development', href: '/services/custom-development' },
    { name: 'Dedicated Teams', href: '/services/dedicated-teams' },
    { name: 'Discovery & PoC', href: '/services/discovery' },
    { name: 'Support & Maintenance', href: '/services/support' },
  ],
  industries: [
    { name: 'Fintech', href: '/industries/fintech' },
    { name: 'Healthcare', href: '/industries/healthcare' },
    { name: 'eCommerce', href: '/industries/ecommerce' },
    { name: 'Logistics', href: '/industries/logistics' },
  ],
  company: [
    { name: 'About Us', href: '/company/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/company/contact' },
    { name: 'Careers', href: '/company/careers' },
  ],
  projects: [
    { name: 'Blog', href: 'https://blog.softdab.tech', external: true },
    { name: 'Crypto Solution', href: 'https://cryptography.softdab.tech', external: true },
    { name: 'OpticalDT', href: 'https://opto.softdab.tech', external: true },
    { name: 'SnapSafe', href: 'https://snapsafe.softdab.tech', external: true },
    { name: 'T.Y.K.E', href: 'https://tyke.softdab.tech', external: true },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
    { name: 'Data Processing Addendum', href: '/legal/dpa' },
  ],
};

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gray-900 text-white" aria-label="Site footer">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 no-underline hover:no-underline focus:no-underline" aria-label="Home">
              <Logo size="md" variant="footer" />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Custom software that solves real business problems. Senior engineering teams delivering measurable outcomes.
            </p>
            <div className="space-y-3" aria-label="Contact information">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:info@softdab.tech" className="text-gray-300 hover:text-white transition-colors" aria-label="Email us at info@softdab.tech">
                  info@softdab.tech
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <a
                  href="https://maps.google.com/?q=Novoselitskaya%20Street%207,%20Kyiv,%20Ukraine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Open address in Google Maps"
                >
                  Novoselitskaya Street 7, Kyiv, Ukraine
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <a href="tel:+380663790819" className="text-gray-300 hover:text-white transition-colors" aria-label="Call SoftDAB">
                  +380 66 379 08 19
                </a>
              </div>
            </div>
            <div className="flex space-x-4 mt-6" aria-label="Social links">
              <a 
                href="https://www.linkedin.com/company/softdab/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors" 
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/softdab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://clutch.co/profile/softdab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors" 
                aria-label="Clutch.co"
              >
                <svg className="h-5 w-5" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="100" fill="#1D3851"/>
                  <path d="M100 40C66.8629 40 40 66.8629 40 100C40 133.137 66.8629 160 100 160C133.137 160 160 133.137 160 100C160 66.8629 133.137 40 100 40ZM100 145C75.1472 145 55 124.853 55 100C55 75.1472 75.1472 55 100 55C124.853 55 145 75.1472 145 100C145 124.853 124.853 145 100 145Z" fill="white"/>
                  <circle cx="100" cy="100" r="25" fill="#FF3D2E"/>
                </svg>
              </a>
            </div>
          </div>
          
          <nav aria-label="Services" className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.services.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="block text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries" className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.industries.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="block text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.company.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="block text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Projects" className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.projects.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="block text-gray-300 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.legal.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="block text-gray-400 hover:text-gray-300 transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} SoftDAB. All rights reserved.
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <span className="text-gray-400 text-sm whitespace-nowrap">
              🇺🇦 Made in Ukraine
            </span>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('softdab_cookie_consent_v1');
                } catch {}
                window.dispatchEvent(
                  new CustomEvent('softdab:open-cookie-banner', {
                    detail: { openCustomize: true }
                  })
                );
              }}
              className="inline-flex items-center rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Manage Cookies"
            >
              Manage Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;