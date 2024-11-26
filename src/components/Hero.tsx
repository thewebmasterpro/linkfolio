import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-20">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your entire online</span>
                <span className="block text-indigo-600">presence in one link</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Create a beautiful landing page that showcases all your important links, social media profiles, and content in one place. Customize your page to match your brand and share it with your audience.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/signup"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Get started for free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/examples"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                  >
                    View examples
                  </a>
                </div>
              </div>
            </div>
          </main>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1 bg-gradient-to-b from-white to-gray-50" />
              <div className="flex-1 w-full bg-gray-50" />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <img
                className="relative rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}