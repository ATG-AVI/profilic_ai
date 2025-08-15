#!/bin/bash

echo "🚀 Setting up Social Agent Full-Stack Application"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Install backend dependencies
print_status "Installing backend dependencies..."
cd "$(dirname "$0")"
if ! npm install; then
    print_error "Failed to install backend dependencies"
    exit 1
fi
print_success "Backend dependencies installed"

# Build backend
print_status "Building backend..."
if ! npm run build; then
    print_error "Failed to build backend"
    exit 1
fi
print_success "Backend built successfully"

# Install server dependencies
print_status "Installing server dependencies..."
cd server
if ! npm install; then
    print_error "Failed to install server dependencies"
    exit 1
fi
print_success "Server dependencies installed"
cd ..

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd frontend
if ! npm install; then
    print_error "Failed to install frontend dependencies"
    exit 1
fi
print_success "Frontend dependencies installed"
cd ..

print_success "All dependencies installed successfully!"
echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. Start the backend server:"
echo "   cd server && npm run dev"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open your browser to:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo ""
echo "📝 Usage:"
echo "========"
echo "1. Enter a social profile URL in the frontend"
echo "2. Click 'Analyze Profile'"
echo "3. View the analysis results"
echo ""
print_success "Setup complete! 🎉"
