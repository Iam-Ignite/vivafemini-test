import { create } from 'zustand';
import { Cycle, CyclePredictions } from '@/types';
import { cycleService, trackingService } from '@/services/api';

interface CycleState {
  currentCycle: Cycle | null;
  predictions: CyclePredictions | null;
  calendarData: Record<string, any>;
  isLoading: boolean;
  error: string | null;
  fetchCurrentCycle: () => Promise<void>;
  fetchCalendarData: (year: number, month: number) => Promise<void>;
  updatePregnancyTest: (result: string) => Promise<void>;
}

export const useCycleStore = create<CycleState>((set, get) => ({
  currentCycle: null,
  predictions: null,
  calendarData: {},
  isLoading: false,
  error: null,

  fetchCurrentCycle: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await cycleService.getCurrent();
      if (response.data) {
        set({
          currentCycle: response.data.cycle,
          predictions: response.data.predictions,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchCalendarData: async (year: number, month: number) => {
    try {
      const response = await trackingService.getCalendar(year, month);
      set({ calendarData: response.data });
    } catch (error: any) {
      console.error('Failed to fetch calendar data:', error);
    }
  },

  updatePregnancyTest: async (result: string) => {
    const cycle = get().currentCycle;
    if (!cycle) return;

    try {
      await cycleService.updatePregnancyTest(cycle._id, result);
      await get().fetchCurrentCycle();
    } catch (error: any) {
      console.error('Failed to update pregnancy test:', error);
    }
  },
}));
