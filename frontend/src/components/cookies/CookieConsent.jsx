import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useLocalStorage } from '../../hooks/use-local-storage';

export const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useLocalStorage('cookie-consent', null);

  if (cookieConsent) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 p-4 z-50"
      >
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="prose prose-sm">
                <h3 className="text-lg font-semibold">Cookie Policy</h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences by clicking "Customize".
                </p>
                <p className="text-sm text-gray-600">
                  For more information about how we use cookies, please see our{' '}
                  <a href="/legal/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setCookieConsent('necessary')}
                >
                  Only Necessary
                </Button>
                <Button 
                  onClick={() => setCookieConsent('all')}
                  className="bg-primary text-white"
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