import { faker } from "@faker-js/faker";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RandomUser, RandomUserAPI, User } from "./types";

interface UsersStore {
  users: User[];
  lastFetched: string | null;
  hasEdits: boolean;
  isLoading: boolean;
  setUsers: (users: User[]) => void;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
  hasData: () => boolean;
  fetchUsers: (force?: boolean) => Promise<void>;
  resetUsers: () => Promise<void>;
}

const ONE_HOUR = 60 * 60 * 1000;

export const useUsersStore = create<UsersStore>()(
  persist(
    (set, get) => ({
      users: [],
      lastFetched: null,
      hasEdits: false,
      isLoading: true,
      setUsers: (users) =>
        set({ users, lastFetched: new Date().toISOString() }),
      updateUser: (id, updatedUser) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user,
          ),
          hasEdits: true,
        }));
      },
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          hasEdits: true,
        }));
      },
      hasData: () => get().users.length > 0,
      fetchUsers: async (force = false) => {
        const state = get();
        const now = Date.now();
        const lastFetched = state.lastFetched
          ? new Date(state.lastFetched).getTime()
          : null;

        if (
          !force &&
          lastFetched &&
          now - lastFetched < ONE_HOUR &&
          state.users.length > 0
        ) {
          // Use cached data
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await fetch(
            `https://randomuser.me/api/?results=50`,
            { cache: "no-store" },
          );
          if (!response.ok) throw new Error("Failed to fetch users");
          const data: RandomUserAPI = await response.json();
          const users = data.results.map((user: RandomUser) => ({
            id: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            image: user.picture.large,
            phone: user.phone,
            age: user.dob.age,
            address: {
              address: user.location.street.name,
              city: user.location.city,
              state: user.location.state,
            },
            company: {
              title: faker.person.jobTitle(),
              name: faker.company.name(),
            },
          }));
          set({
            users,
            lastFetched: new Date().toISOString(),
            hasEdits: false,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching users:", error);
          set({ users: [], isLoading: false });
        }
      },
      resetUsers: async () => {
        await get().fetchUsers(true);
        set({ hasEdits: false });
      },
    }),
    {
      name: "users-storage",
      // Only persist users, lastFetched, hasEdits; not isLoading
      partialize: (state) => ({
        users: state.users,
        lastFetched: state.lastFetched,
        hasEdits: state.hasEdits,
      }),
    },
  ),
);
