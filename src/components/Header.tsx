import React from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">LinkFolio</span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="/features" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</a>
              <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">Get Started</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-100">
            <a href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Features</a>
            <a href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Pricing</a>
            <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Login</a>
            <a href="/signup" className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700">Get Started</a>
          </div>
        </div>
      )}
    </header>
  );
}