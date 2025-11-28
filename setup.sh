#!/bin/bash

echo "🌸 Setting up CareNest Project 🌸"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "${YELLOW}⚠️  Node.js is not installed. Please install Node.js v18 or higher.${NC}"
    exit 1
fi

echo "${GREEN}✓ Node.js detected: $(node --version)${NC}"
echo ""

# Install root dependencies
echo "${BLUE}📦 Installing root dependencies...${NC}"
npm install
echo ""

# Setup backend
echo "${BLUE}🔧 Setting up backend...${NC}"
cd packages/backend

if [ ! -f .env ]; then
    echo "${YELLOW}Creating backend .env file...${NC}"
    cp .env.example .env
    echo "${GREEN}✓ Backend .env created${NC}"
else
    echo "${GREEN}✓ Backend .env already exists${NC}"
fi

npm install
echo "${GREEN}✓ Backend dependencies installed${NC}"
cd ../..
echo ""

# Setup frontend
echo "${BLUE}🎨 Setting up frontend...${NC}"
cd packages/frontend

if [ ! -f .env ]; then
    echo "${YELLOW}Creating frontend .env file...${NC}"
    cp .env.example .env
    echo "${GREEN}✓ Frontend .env created${NC}"
else
    echo "${GREEN}✓ Frontend .env already exists${NC}"
fi

npm install
echo "${GREEN}✓ Frontend dependencies installed${NC}"
cd ../..
echo ""

echo "=================================="
echo "${GREEN}✨ Setup Complete! ✨${NC}"
echo ""
echo "Next steps:"
echo "  1. Update environment variables in .env files if needed"
echo "  2. Run ${BLUE}npm run dev${NC} to start both frontend and backend"
echo ""
echo "Individual commands:"
echo "  • Backend only: ${BLUE}npm run dev:backend${NC}"
echo "  • Frontend only: ${BLUE}npm run dev:frontend${NC}"
echo ""
echo "Access the application:"
echo "  • Frontend: http://localhost:5173"
echo "  • Backend API: http://localhost:5000"
echo ""
echo "Happy coding! 🚀"
