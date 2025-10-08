import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'softdab_cookie_consent_v1';

const defaultPrefs = {
  necessary: true,   // всегда включено
  analytics: false,
  functional: false,
  marketing: false,
};

const CookieConsentBanner = () => {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [showSettings, setShowSettings] = useState(false);

  // Применяем настройки (вкл/выкл теги)
  const applyConsent = (c) => {
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
  };

  const saveConsent = (newPrefs) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newPrefs));
    } catch {}
    applyConsent(newPrefs);
  };

  // 1) На монтировании читаем сохранённые prefs и решаем, показывать ли баннер
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setPrefs({ ...defaultPrefs, ...saved });
        applyConsent({ ...defaultPrefs, ...saved });
        setOpen(false); // уже есть согласие — не показываем
      } else {
        // нет записи — показать баннер
        setPrefs(defaultPrefs);
        setOpen(true);
      }
    } catch {
      // на всякий случай: если localStorage недоступен — показываем баннер
      setPrefs(defaultPrefs);
      setOpen(true);
    }
  }, []);

  // 2) Подписка на ручное открытие из другого места приложения
  useEffect(() => {
    const openHandler = (e) => {
      setOpen(true);
      if (e?.detail?.openCustomize) setShowSettings(true);
    };
    window.addEventListener('softdab:open-cookie-banner', openHandler);
    return () => window.removeEventListener('softdab:open-cookie-banner', openHandler);
  }, []);

  const acceptAll = () => {
    const newPrefs = { necessary: true, analytics: true, functional: true, marketing: true };
    setPrefs(newPrefs);
    saveConsent(newPrefs);
    setOpen(false);
  };

  const rejectAll = () => {
    const newPrefs = { necessary: true, analytics: false, functional: false, marketing: false };
    setPrefs(newPrefs);
    saveConsent(newPrefs);
    setOpen(false);
  };

  const saveSettings = () => {
    saveConsent(prefs);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6">
      <Card className="max-w-4xl mx-auto shadow-2xl border border-gray-200 bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div className="sm:mr-6 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">🍪 We use cookies</h2>
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
                  <Button variant="outline" onClick={() => setShowSettings(true)} className="whitespace-nowrap">
                    Customize
                  </Button>
                  <Button variant="secondary" onClick={rejectAll} className="whitespace-nowrap">
                    Reject All
                  </Button>
                  <Button onClick={acceptAll} className="whitespace-nowrap">
                    Accept All
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setShowSettings(false)} className="whitespace-nowrap">
                    Back
                  </Button>
                  <Button onClick={saveSettings} className="whitespace-nowrap">
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