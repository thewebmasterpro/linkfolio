import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt: string;
  subscription?: {
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    expiresAt: string;
  };
}

interface AdminState {
  users: AdminUser[];
  addUser: (user: AdminUser) => void;
  updateUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  suspendUser: (id: string) => void;
  activateUser: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) =>
        set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
      suspendUser: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, status: 'suspended' } : user
          ),
        })),
      activateUser: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, status: 'active' } : user
          ),
        })),
    }),
    {
      name: 'admin-storage',
    }
  )
);