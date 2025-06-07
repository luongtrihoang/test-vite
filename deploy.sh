#!/bin/bash

# Vue User Management App Deployment Script

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build directory not found!"
    exit 1
fi

echo "📁 Build output ready in ./dist"
echo ""
echo "🌐 Deployment options:"
echo "1. Vercel: npx vercel --prod"
echo "2. Netlify: drag ./dist folder to netlify.com"
echo "3. GitHub Pages: push to main branch (auto-deploy via GitHub Actions)"
echo "4. Surge: npx surge ./dist your-domain.surge.sh"
echo ""
echo "🎉 Ready to deploy!" 