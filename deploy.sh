#!/bin/bash

echo "========================================"
echo "  QUIZ SYSTEM - VERCEL DEPLOYMENT"
echo "========================================"
echo ""
echo "This script will deploy your quiz to Vercel"
echo ""
echo "Prerequisites:"
echo "- Node.js installed"
echo "- Vercel account created"
echo ""
read -p "Press Enter to continue..."
echo ""

echo "Installing Vercel CLI..."
npm install -g vercel
echo ""

echo "Logging into Vercel..."
vercel login
echo ""

echo "Deploying to production..."
vercel --prod
echo ""

echo "========================================"
echo "  DEPLOYMENT COMPLETE!"
echo "========================================"
echo ""
echo "Your quiz is now live!"
echo "Check your Vercel dashboard for the URL"
echo ""
echo "Analytics will be available at:"
echo "https://vercel.com/dashboard"
echo ""
read -p "Press Enter to exit..."
