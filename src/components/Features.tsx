import React from 'react';
import { Palette, Link, Globe, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    name: 'Custom Design',
    description: 'Personalize your page with custom colors, fonts, and themes to match your brand identity.',
    icon: Palette,
  },
  {
    name: 'Multiple Links',
    description: 'Add unlimited links to your social media, websites, products, and more.',
    icon: Link,
  },
  {
    name: 'Custom Domain',
    description: 'Use your own domain name for a more professional and branded experience.',
    icon: Globe,
  },
  {
    name: 'Analytics',
    description: 'Track visits and clicks with detailed analytics to measure your success.',
    icon: BarChart3,
  },
  {
    name: 'Secure',
    description: 'Your data is protected with enterprise-grade security and encryption.',
    icon: Shield,
  },
  {
    name: 'Lightning Fast',
    description: 'Optimized for speed to ensure your visitors have the best experience.',
    icon: Zap,
  },
];

export default function Features() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All-in-one platform for your online presence
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create a professional landing page in minutes with our powerful features and tools.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}