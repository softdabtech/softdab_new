
import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useLocalStorage } from '../../hooks/use-local-storage';

const POLICY_TEXT = {
  title: 'Cookie Policy',
  description:
    'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences by clicking "Customize".',
  more:
    'For more information about how we use cookies, please see our ',
  link: '/legal/cookie-policy',
  linkText: 'Cookie Policy',
};

/**
 * CookieConsent banner for GDPR compliance
 */
export const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useLocalStorage('cookie-consent', null);

  const handleNecessary = useCallback(() => setCookieConsent('necessary'), [setCookieConsent]);
  const handleAll = useCallback(() => setCookieConsent('all'), [setCookieConsent]);

  if (cookieConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 p-4 z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent banner"
      >
        <Card className="max-w-2xl mx-auto" tabIndex={-1}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="prose prose-sm">
                <h3 className="text-lg font-semibold">{POLICY_TEXT.title}</h3>
                <p className="text-sm text-gray-600">{POLICY_TEXT.description}</p>
                <p className="text-sm text-gray-600">
                  {POLICY_TEXT.more}
                  <a href={POLICY_TEXT.link} className="text-primary hover:underline">{POLICY_TEXT.linkText}</a>.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={handleNecessary}
                  size="default"
                  className="hover:scale-100"
                  aria-label="Accept only necessary cookies"
                >
                  Only Necessary
                </Button>
                <Button 
                  onClick={handleAll}
                  size="default"
                  className="hover:scale-100"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};