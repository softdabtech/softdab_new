// Lightweight analytics client wrapper built on top of window.__softdab_analytics
// Use this in your app to fire consistent events and conversions.

export function pageView(pathInfo = {}){
  if (typeof window === 'undefined') return;
  // Send SPA-friendly page view
  window.dispatchEvent(new CustomEvent('softdab:track-pageview', { detail: pathInfo }));
}

export function event(name, params = {}){
  if (typeof window === 'undefined') return;
  const api = window.__softdab_analytics;
  if (api && api.trackEvent) api.trackEvent(name, params);
}

export function identify(userId){
  if (typeof window === 'undefined') return;
  const api = window.__softdab_analytics;
  if (api && api.setUserId) api.setUserId(String(userId));
}

export function setUserProps(props){
  if (typeof window === 'undefined') return;
  const api = window.__softdab_analytics;
  if (api && api.setUserProperties) api.setUserProperties(props);
}

// Standard event contract recommendations
export const EVENTS = {
  CONTACT_SUBMIT: 'contact_submit',
  LEAD: 'generate_lead',
  SIGNUP: 'sign_up',
  PURCHASE: 'purchase',
  PAGEVIEW: 'page_view'
};

export default { pageView, event, identify, setUserProps, EVENTS };
