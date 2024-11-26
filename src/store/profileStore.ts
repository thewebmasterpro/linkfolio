import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ContentType = 'link' | 'html' | 'image' | 'map' | 'contact' | 'divider';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  content: string;
  platform?: string;
  settings?: {
    imageAlt?: string;
    mapZoom?: number;
    contactType?: 'phone' | 'email' | 'address';
    htmlHeight?: string;
  };
}

export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  theme: 'light' | 'dark' | 'custom';
  accentColor: string;
  contents: ContentItem[];
}

interface ProfileState {
  profile: Profile;
  updateProfile: (profile: Partial<Profile>) => void;
  addContent: (content: ContentItem) => void;
  removeContent: (id: string) => void;
  updateContent: (id: string, content: Partial<ContentItem>) => void;
}

const defaultProfile: Profile = {
  username: '',
  displayName: '',
  bio: '',
  avatar: '',
  theme: 'light',
  accentColor: '#4F46E5',
  contents: [],
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      addContent: (content) =>
        set((state) => ({
          profile: {
            ...state.profile,
            contents: [...(state.profile?.contents || []), content],
          },
        })),
      removeContent: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            contents: state.profile?.contents?.filter((content) => content.id !== id) || [],
          },
        })),
      updateContent: (id, updates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            contents: state.profile?.contents?.map((content) =>
              content.id === id ? { ...content, ...updates } : content
            ) || [],
          },
        })),
    }),
    {
      name: 'profile-storage',
      onRehydrateStorage: () => (state) => {
        // Ensure profile has all required fields after rehydration
        if (state) {
          state.profile = {
            ...defaultProfile,
            ...state.profile,
            contents: state.profile?.contents || [],
          };
        }
      },
    }
  )
);