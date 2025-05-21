/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';

// Internal Imports
import { db } from './firebase';

// User Store
const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: false,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    set({ isLoading: true });

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      set({ currentUser: null });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: (updates) => {
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        ...updates,
      },
    }));
  },
}));

// Export
export { useUserStore };
