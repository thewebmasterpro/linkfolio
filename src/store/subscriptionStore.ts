import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanType = 'free' | 'pro' | 'business';

export interface Plan {
  type: PlanType;
  name: string;
  price: number;
  features: string[];
  limits: {
    links: number;
    analytics: boolean;
    customDomain: boolean;
    themes: boolean;
  };
}

export const plans: Record<PlanType, Plan> = {
  free: {
    type: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic profile customization',
      'Up to 5 links',
      'Basic analytics',
      'Standard themes'
    ],
    limits: {
      links: 5,
      analytics: false,
      customDomain: false,
      themes: false
    }
  },
  pro: {
    type: 'pro',
    name: 'Pro',
    price: 9,
    features: [
      'Advanced profile customization',
      'Unlimited links',
      'Detailed analytics',
      'Custom themes',
      'Priority support'
    ],
    limits: {
      links: Infinity,
      analytics: true,
      customDomain: false,
      themes: true
    }
  },
  business: {
    type: 'business',
    name: 'Business',
    price: 29,
    features: [
      'Everything in Pro',
      'Custom domain',
      'Team collaboration',
      'API access',
      'Dedicated support'
    ],
    limits: {
      links: Infinity,
      analytics: true,
      customDomain: true,
      themes: true
    }
  }
};

interface SubscriptionState {
  currentPlan: PlanType;
  subscriptionId?: string;
  expiresAt?: string;
  updateSubscription: (plan: PlanType, subscriptionId?: string, expiresAt?: string) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      currentPlan: 'free',
      updateSubscription: (plan, subscriptionId, expiresAt) =>
        set({ currentPlan: plan, subscriptionId, expiresAt }),
    }),
    {
      name: 'subscription-storage',
    }
  )
);