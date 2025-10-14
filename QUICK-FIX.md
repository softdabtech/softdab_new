# 🚨 Quick Fix Guide

## React mockData Errors

### Fast Diagnosis:
```bash
# 1. Check console errors in browser DevTools
# 2. Test locally: cd frontend && npm run dev
# 3. Find problem: grep -n "mockData\." src/pages/problem/Page.jsx
```

### Common Fixes:

#### ❌ `Cannot read properties of undefined`
```javascript
// Wrong:
mockData.team.map()
mockData.services.customDevelopment

// Fix:
mockData.about?.team?.map()
mockData.customDevelopment
```

#### ❌ `map is not a function`  
```javascript
// Add to mockData.js:
someSection: {
  items: [
    { name: "Item 1" },
    { name: "Item 2" }
  ]
}
```

#### ❌ White screen / Page not loading
```javascript
// Add optional chaining + fallback:
{data?.items?.map(...) || <div>Loading...</div>}
```

### Quick Deploy:
```bash
git add -A && git commit -m "Fix mockData issue"
git push origin main
# Wait 1-2 minutes for auto-deploy
```

### Emergency Cache Clear:
```bash
# If getting 403/404:
sed -i '' 's/"version": "0.1.X"/"version": "0.1.Y"/' package.json
echo '<!-- Cache: '$(date +%s)' -->' >> index.html  
git add -A && git commit -m "Force cache clear"
git push origin main
```

---
**Last Updated:** 14.10.2025