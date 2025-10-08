import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { Separator } from '../ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    services: [
      { name: 'Outsourcing', href: '/services/outsourcing' },
      { name: 'Dedicated Teams', href: '/services/dedicated-teams' },
    ],
    industries: [
      { name: 'Fintech', href: '/industries/fintech' },
      { name: 'Healthcare', href: '/industries/healthcare' },
      { name: 'eCommerce', href: '/industries/ecommerce' },
      { name: 'Logistics', href: '/industries/logistics' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Data Processing Addendum', href: '/dpa' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 no-underline hover:no-underline focus:no-underline">
              <div className="text-2xl font-bold text-white">SoftDAB</div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Custom software that solves real business problems. Senior engineering teams delivering measurable outcomes.
            </p>

            {/* Contact Info */}
            <div className="space-y-3" role="list" aria-label="Contact information">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:hello@softdab.tech" className="text-gray-300 hover:text-white transition-colors">
                  hello@softdab.tech
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">Kyiv, Ukraine</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6" aria-label="Social links">
              <a
                href="https://www.linkedin.com/company/softdab"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/softdab"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/softdabtech"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerSections.services.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-label="Industries">
            <h3 className="text-lg font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              {footerSections.industries.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company & Legal */}
          <div>
            <nav aria-label="Company">
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 mb-6">
                {footerSections.company.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h4 className="text-sm font-semibold mb-2 text-gray-400">Legal</h4>
              <ul className="space-y-1">
                {footerSections.legal.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} SoftDAB. All rights reserved.</p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">🇺🇦 Made in Ukraine</span>

            {/* Manage Cookies Button */}
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('softdab_cookie_consent_v1');
                } catch {}
                window.dispatchEvent(
                  new CustomEvent('softdab:open-cookie-banner', { detail: { openCustomize: true } })
                );
              }}
              className="inline-flex items-center rounded-lg bg-white/10 hover:bg:white/20 text-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-900"
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