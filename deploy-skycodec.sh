#!/bin/bash
# Deploy SkyCodec to sky.softdab.tech

set -e

echo "🚀 Deploying SkyCodec to sky.softdab.tech..."

SERVER="root@sky.softdab.tech"
BACKEND_PATH="/var/www/sky/backend"
FRONTEND_PATH="/var/www/sky/frontend"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📦 Step 1: Deploying backend...${NC}"
# Copy backend skycodec route
scp backend/routes/skycodec.py $SERVER:$BACKEND_PATH/routes/

echo -e "${BLUE}🔄 Step 2: Updating server.py...${NC}"
# Update server.py to include skycodec router
ssh $SERVER "cd $BACKEND_PATH && \
  if ! grep -q 'skycodec_router' server.py; then \
    echo 'Adding skycodec router to server.py'; \
    sed -i '/from routes.expert_consultation import/a from routes.skycodec import router as skycodec_router' server.py; \
    sed -i '/app.include_router(expert_consultation_router/a app.include_router(skycodec_router, prefix=\"/api/skycodec\", tags=[\"SkyCodec\"])' server.py; \
  else \
    echo 'SkyCodec router already configured'; \
  fi"

echo -e "${BLUE}🔄 Step 3: Restarting backend service...${NC}"
ssh $SERVER "systemctl restart softdab-backend"
sleep 2

echo -e "${BLUE}✅ Step 4: Testing backend...${NC}"
if curl -s https://sky.softdab.tech/api/skycodec/health | grep -q "healthy"; then
  echo -e "${GREEN}✓ Backend is healthy${NC}"
else
  echo -e "${RED}✗ Backend health check failed${NC}"
  exit 1
fi

echo -e "${BLUE}📦 Step 5: Deploying frontend...${NC}"
# Copy frontend SkyCodecPage
scp frontend/src/pages/SkyCodecPage.jsx $SERVER:$FRONTEND_PATH/src/pages/

echo -e "${BLUE}🔄 Step 6: Updating routes...${NC}"
# Update routes.jsx
ssh $SERVER "cd $FRONTEND_PATH/src && \
  if ! grep -q 'SkyCodecPage' routes.jsx; then \
    echo 'Adding SkyCodecPage to routes'; \
    sed -i '/const NotFoundPage/a const SkyCodecPage = React.lazy(() => import(\"./pages/SkyCodecPage\"));' routes.jsx; \
    sed -i '/{\/\* Admin \*\}/i \        {/* SkyCodec */}\n        <Route path=\"/skycodec\" element={<SkyCodecPage />} />\n' routes.jsx; \
  else \
    echo 'SkyCodecPage already configured'; \
  fi"

echo -e "${BLUE}🏗️  Step 7: Building frontend...${NC}"
ssh $SERVER "cd $FRONTEND_PATH && npm run build"

echo -e "${BLUE}🔄 Step 8: Reloading nginx...${NC}"
ssh $SERVER "nginx -t && systemctl reload nginx"

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🌐 Access SkyCodec at: https://sky.softdab.tech/skycodec"
echo "🔍 API Health: https://sky.softdab.tech/api/skycodec/health"
echo ""
