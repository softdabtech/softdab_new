import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'softdab_cookie_consent_v1';
const DEFAULT_PREFS = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};
const TEXT = {
  title: '🍪 We use cookies',
  description:
    'We use cookies to enhance your experience, serve personalized content, and analyze traffic. You can accept all, reject all, or customize your preferences.',
  more: 'For more information, see our ',
  link: '/legal/cookie-policy',
  linkText: 'Cookie Policy',
  settings: 'Customize',
  accept: 'Accept All',
  reject: 'Reject All',
  save: 'Save Settings',
  necessary: 'Necessary',
  analytics: 'Analytics',
  functional: 'Functional',
  marketing: 'Marketing',
};

/**
 * CookieConsentBanner for GDPR compliance
 */
const CookieConsentBanner = () => {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [showSettings, setShowSettings] = useState(false);

  const applyConsent = useCallback((c) => {
    if (c?.analytics) {
      window.dispatchEvent(new CustomEvent('softdab:analytics-consent-granted'));
    } else {
      window.dispatchEvent(new CustomEvent('softdab:analytics-consent-revoked'));
    }
    if (c?.marketing) {
      window.dispatchEvent(new CustomEvent('softdab:marketing-consent-granted'));
    } else {
      window.dispatchEvent(new CustomEvent('softdab:marketing-consent-revoked'));
    }
  }, []);

  const saveConsent = useCallback((newPrefs) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newPrefs));
    } catch {}
    applyConsent(newPrefs);
  }, [applyConsent]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setPrefs({ ...DEFAULT_PREFS, ...saved });
        applyConsent({ ...DEFAULT_PREFS, ...saved });
        setOpen(false);
      } else {
        setPrefs(DEFAULT_PREFS);
        setOpen(true);
      }
    } catch {
      setPrefs(DEFAULT_PREFS);
      setOpen(true);
    }
  }, [applyConsent]);

  useEffect(() => {
    const openHandler = (e) => {
      setOpen(true);
      if (e?.detail?.openCustomize) setShowSettings(true);
    };
    window.addEventListener('softdab:open-cookie-banner', openHandler);
    return () => window.removeEventListener('softdab:open-cookie-banner', openHandler);
  }, []);

  const acceptAll = useCallback(() => {
    const newPrefs = { necessary: true, analytics: true, functional: true, marketing: true };
    setPrefs(newPrefs);
    saveConsent(newPrefs);
    setOpen(false);
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    const newPrefs = { necessary: true, analytics: false, functional: false, marketing: false };
    setPrefs(newPrefs);
    saveConsent(newPrefs);
    setOpen(false);
  }, [saveConsent]);

  const saveSettings = useCallback(() => {
    saveConsent(prefs);
    setOpen(false);
  }, [prefs, saveConsent]);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6" role="dialog" aria-modal="true" aria-label="Cookie consent banner">
      <Card className="max-w-4xl mx-auto shadow-2xl border border-gray-200 bg-white" tabIndex={-1}>
        <CardContent className="p-4 sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div className="sm:mr-6 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{TEXT.title}</h2>
              <p className="text-sm text-gray-600 mb-3">
                We use cookies to ensure the site works properly and, with your consent, for analytics and marketing.
                Learn more in our{' '}
                <Link to="/legal/cookies" className="text-primary underline font-medium">
                  Cookies Policy
                </Link>.
              </p>

              {showSettings && (
                <div className="mt-4 space-y-3 text-sm border-t pt-4">
                  <p className="font-medium text-gray-700 mb-2">Customize your preferences:</p>

                  <label className="flex items-start gap-3 cursor-not-allowed opacity-60">
                    <input type="checkbox" checked disabled readOnly className="mt-0.5" />
                    <div>
                      <div className="font-medium">Necessary (always on)</div>
                      <div className="text-xs text-gray-500">Required for site functionality and security.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium">Analytics</div>
                      <div className="text-xs text-gray-500">Help us understand how you use our site.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefs.functional}
                      onChange={(e) => setPrefs((p) => ({ ...p, functional: e.target.checked }))}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium">Functional</div>
                      <div className="text-xs text-gray-500">Remember your preferences (language, region).</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium">Marketing</div>
                      <div className="text-xs text-gray-500">Personalized ads and conversion tracking.</div>
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-4 sm:mt-0 flex-shrink-0 flex flex-col sm:flex-row gap-2">
              {!showSettings ? (
                <>
                  <Button variant="outline" onClick={() => setShowSettings(true)} className="whitespace-nowrap border-gray-400 text-gray-900 hover:bg-gray-100">
                    Customize
                  </Button>
                  <Button variant="outline" onClick={rejectAll} className="whitespace-nowrap border-gray-400 text-gray-900 hover:bg-gray-100">
                    Reject All
                  </Button>
                  <Button onClick={acceptAll} className="whitespace-nowrap bg-primary hover:bg-primary/90 text-white">
                    Accept All
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setShowSettings(false)} className="whitespace-nowrap border-gray-400 text-gray-900 hover:bg-gray-100">
                    Back
                  </Button>
                  <Button onClick={saveSettings} className="whitespace-nowrap bg-primary hover:bg-primary/90 text-white">
                    Save Preferences
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsentBanner;