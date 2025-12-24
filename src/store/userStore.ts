import { create } from 'zustand';
import { User } from '@/types';
import { userService } from '@/services/api';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  dismissCard: (cardId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getMe();
      set({ user: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  dismissCard: async (cardId: string) => {
    try {
      await userService.dismissCard(cardId);
      const user = get().user;
      if (user) {
        const currentDismissed = user.dismissedCards || [];
        set({
          user: {
            ...user,
            dismissedCards: [...currentDismissed, cardId],
          },
        });
      }
    } catch (error: any) {
      console.error('Failed to dismiss card:', error);
    }
  },
}));
