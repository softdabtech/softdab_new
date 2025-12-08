# 🚀 Djinni Integration - Deployment Checklist

## Pre-Deployment (Do This First)

### Environment Setup
- [ ] Python 3.8+ installed
- [ ] pip installed and working
- [ ] Node.js/npm installed (frontend)
- [ ] Git installed
- [ ] Access to server/production environment

### Code Review
- [ ] Review `backend/routes/djinni.py` (238 lines)
- [ ] Review `backend/server.py` changes (2 lines)
- [ ] Review `frontend/src/pages/company/CareersPage.jsx` changes
- [ ] Review `backend/requirements.txt` changes (aiohttp added)

### Testing Locally

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python server.py
```
- [ ] Server starts without errors
- [ ] No import errors for aiohttp

#### API Testing
```bash
# Test endpoint in another terminal
curl http://localhost:8000/api/careers/positions
```
- [ ] Returns valid JSON
- [ ] Contains "success": true
- [ ] Contains "positions" array

#### Frontend Testing
1. [ ] Navigate to careers page in browser
2. [ ] Open DevTools (F12)
3. [ ] Check Console tab
   - [ ] No errors about fetch
   - [ ] No import errors
4. [ ] Check Network tab
   - [ ] Request to `/api/careers/positions` shows 200
   - [ ] Response contains job data
5. [ ] Verify page renders
   - [ ] Jobs display on page
   - [ ] Tech badges show correctly
   - [ ] No layout breaks

#### Performance Testing
```bash
# First request (fresh from Djinni)
time curl http://localhost:8000/api/careers/positions > /dev/null

# Second request (from cache)
time curl http://localhost:8000/api/careers/positions > /dev/null
```
- [ ] First request: 300-1000ms (acceptable)
- [ ] Second request: <50ms (cached)
- [ ] Cached request is 5-10x faster

#### Error Scenarios
- [ ] Test with network throttling (DevTools)
- [ ] Test with offline (should show fallback)
- [ ] Test with slow API (DevTools: Slow 3G)
- [ ] Page should remain usable in all cases

### Documentation Review
- [ ] Read `DJINNI-QUICK-REFERENCE.md`
- [ ] Read `DJINNI-SETUP.md` completely
- [ ] Read `DJINNI-CHECKLIST.md` completely
- [ ] All documentation files present and readable

---

## Pre-Production Verification

### Djinni Credentials
- [ ] Email verified: `info@softdab.tech`
- [ ] Password verified: `9yNRF3xIZW`
- [ ] Company account has published jobs
- [ ] Djinni API is accessible

### Backend Preparation
- [ ] All requirements installed
- [ ] No uncommitted changes in backend/
- [ ] Server starts cleanly
- [ ] Logs configured and accessible
- [ ] No hardcoded secrets in production (TODO item noted)

### Frontend Preparation
- [ ] Build completes without errors
- [ ] No console warnings/errors in build
- [ ] API endpoint URL is correct (`/api/careers/positions`)
- [ ] Fallback positions array is populated
- [ ] No unused imports/variables

### Production Environment
- [ ] Backend server ready (running/systemd service)
- [ ] Reverse proxy configured (nginx/Apache)
- [ ] CORS headers configured correctly
- [ ] SSL/TLS certificates valid
- [ ] Logs directory writable
- [ ] Sufficient disk space

---

## Deployment Steps

### Step 1: Backend Deployment

#### Install Dependencies
```bash
cd /var/www/softdab/backend  # or your path
pip install -r requirements.txt
```
- [ ] aiohttp installed successfully
- [ ] All other dependencies installed

#### Restart Backend Service
```bash
systemctl restart softdab-backend
# or: python server.py &
```
- [ ] Service starts without errors
- [ ] No import errors in logs
- [ ] Service is listening on correct port

#### Verify Backend
```bash
curl http://localhost:8000/api/careers/positions
```
- [ ] Returns 200 status
- [ ] Response is valid JSON
- [ ] Contains "success": true

### Step 2: Frontend Deployment

#### Build Frontend
```bash
cd frontend
npm run build  # or your build command
```
- [ ] Build completes successfully
- [ ] No errors in build output
- [ ] dist/ folder has files

#### Deploy Frontend
```bash
# Copy to web server
cp -r frontend/dist/* /var/www/softdab/public/
# or use your deployment method (FTP, git, etc.)
```
- [ ] Files deployed successfully
- [ ] Correct permissions set
- [ ] Web server serving updated files

### Step 3: Post-Deployment Verification

#### Test in Production
```bash
# Test API
curl https://softdab.tech/api/careers/positions

# Or from your domain
curl https://your-domain.com/api/careers/positions
```
- [ ] Returns valid job data
- [ ] Status code is 200
- [ ] Response time acceptable

#### Test in Browser
1. [ ] Visit https://softdab.tech/company/careers
2. [ ] Open DevTools (F12)
3. [ ] Check Network tab for API request
   - [ ] Request to `/api/careers/positions`
   - [ ] Response status 200
   - [ ] Response contains jobs
4. [ ] Check Console tab
   - [ ] No JavaScript errors
   - [ ] No fetch errors
5. [ ] Verify page displays
   - [ ] Jobs visible on page
   - [ ] Tech badges display correctly
   - [ ] Responsive on mobile

#### Check Logs
```bash
# Backend logs
tail -50 /var/www/softdab/backend/logs/app.log

# Should see:
# "Fetching fresh jobs from Djinni API"
# "Cached N jobs from Djinni"
```
- [ ] No error messages
- [ ] Djinni integration logs present
- [ ] Cache working (see cached message on 2nd request)

#### Performance Check
```bash
# Should be fast
curl -w "Time: %{time_total}s\n" \
  https://softdab.tech/api/careers/positions
```
- [ ] Response time <1 second
- [ ] Typically <100ms (cached)

---

## Post-Deployment Monitoring (24-48 hours)

### Hour 1
- [ ] Check logs for any errors
- [ ] Test careers page in browser
- [ ] Verify API endpoint responds
- [ ] Check response times

### Hour 4
- [ ] Log rotation working (if applicable)
- [ ] No disk space issues
- [ ] No memory leaks
- [ ] API still responding

### Hour 24
- [ ] Cache refresh working (30-min cycle)
- [ ] No accumulated errors
- [ ] Performance stable
- [ ] User reports any issues? (none expected)

### Hour 48
- [ ] Stable over multiple cache refresh cycles
- [ ] No anomalies in logs
- [ ] Error rate < 1%
- [ ] Ready to declare stable

---

## Rollback Plan (If Issues)

### Quick Disable
```bash
# Edit server.py
# Comment out:
# app.include_router(djinni_router)

# Restart backend
systemctl restart softdab-backend
```
- [ ] Careers page still works
- [ ] Shows default positions
- [ ] No errors

### Full Rollback
```bash
# Revert backend
git checkout backend/

# Reinstall without aiohttp requirement
pip install -r requirements.txt

# Restart
systemctl restart softdab-backend

# Redeploy frontend without api calls
# CareersPage will show DEFAULT_POSITIONS
```
- [ ] Services running
- [ ] Careers page functional
- [ ] Default positions showing

### Investigation
- [ ] Check backend logs for errors
- [ ] Check frontend console for errors
- [ ] Check Djinni API availability
- [ ] Check network connectivity
- [ ] Check disk space

---

## Success Criteria

✅ **All Must Pass Before Declaring Success**

- [ ] Backend API endpoint returns 200
- [ ] Response contains valid job data
- [ ] Frontend loads without errors
- [ ] Jobs display on careers page
- [ ] Cache working (verified in logs)
- [ ] Response time < 1 second
- [ ] No console errors
- [ ] No backend errors
- [ ] Careers page responsive on mobile
- [ ] Fallback works if API down (test by disabling)

---

## Documentation Checklist

- [ ] All 9 documentation files present
- [ ] Each file is readable and complete
- [ ] Links between documents work
- [ ] Examples are correct
- [ ] Commands tested and working

### Files to Verify
- [ ] `README-DJINNI.md` - Main readme
- [ ] `DJINNI-INDEX.md` - Navigation
- [ ] `DJINNI-QUICK-REFERENCE.md` - Quick start
- [ ] `DJINNI-SUMMARY.md` - Overview
- [ ] `DJINNI-SETUP.md` - Setup guide
- [ ] `DJINNI-INTEGRATION.md` - Technical
- [ ] `DJINNI-ARCHITECTURE.md` - Diagrams
- [ ] `DJINNI-CHECKLIST.md` - Checklist
- [ ] `DJINNI-FAQ.md` - Questions

---

## Final Sign-Off

### Deployed By
- [ ] Name: ________________
- [ ] Date: ________________
- [ ] Time: ________________

### Verified By
- [ ] Name: ________________
- [ ] Date: ________________
- [ ] Time: ________________

### Approved By
- [ ] Name: ________________
- [ ] Date: ________________
- [ ] Time: ________________

---

## Notes Section

```
Additional notes or observations:

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________
```

---

## Support Contact

If issues arise post-deployment:
1. Check `DJINNI-FAQ.md` for answers
2. Check backend logs: `tail -f /var/www/softdab/backend/logs/app.log`
3. Test API: `curl /api/careers/positions`
4. Review relevant documentation file

---

## Appendix: Quick Command Reference

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Test API
curl http://localhost:8000/api/careers/positions

# Restart service
systemctl restart softdab-backend

# Check logs
tail -f /var/www/softdab/backend/logs/app.log

# Force cache refresh
curl http://localhost:8000/api/careers/positions/refresh

# Check response time
curl -w "Time: %{time_total}s\n" \
  http://localhost:8000/api/careers/positions
```

---

**Document Version**: 1.0  
**Last Updated**: 8 December 2024  
**Status**: Ready for Deployment  

✅ **All systems go! Ready to deploy.**
