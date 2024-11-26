import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore, plans, PlanType } from '../store/subscriptionStore';
import { Check, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Pricing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { currentPlan } = useSubscriptionStore();

  const handleSubscribe = async (planType: PlanType) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/pricing' } });
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // In a real app, you would make an API call to your backend to create a Stripe Checkout session
      // For demo purposes, we'll just show an alert
      alert('In production, this would redirect to Stripe Checkout');
      
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to process subscription');
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Whether you're just starting out or running a business, we have a plan that's right for you.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {Object.values(plans).map((plan) => {
            const isCurrent = currentPlan === plan.type;
            const isPopular = plan.type === 'pro';

            return (
              <div
                key={plan.type}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                  isPopular ? 'lg:z-10 lg:rounded-b-none' : ''
                } ${isPopular ? 'lg:scale-105' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className={`text-lg font-semibold leading-8 ${
                      isPopular ? 'text-indigo-600' : 'text-gray-900'
                    }`}>
                      {plan.name}
                    </h3>
                    {isPopular && (
                      <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                        Most popular
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {plan.type === 'free' ? 'Get started with basic features' :
                     plan.type === 'pro' ? 'Perfect for creators and professionals' :
                     'For businesses and teams'}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                    {plan.price > 0 && (
                      <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                    )}
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleSubscribe(plan.type)}
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isCurrent
                      ? 'bg-gray-100 text-gray-600 cursor-default'
                      : isPopular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600'
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current plan' : 'Get started'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}