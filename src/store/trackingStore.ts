import { create } from 'zustand';
import { TrackingFormData, DailyLog } from '@/types';
import { trackingService } from '@/services/api';

interface TrackingState {
  currentDayLog: DailyLog | null;
  formData: TrackingFormData;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  fetchDayLog: (date: string) => Promise<void>;
  updateFormField: <K extends keyof TrackingFormData>(field: K, value: TrackingFormData[K]) => void;
  toggleSymptom: (field: keyof TrackingFormData, symptom: string) => void;
  saveDayLog: (date: string) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: TrackingFormData = {
  periodIndicators: [],
  sexualHealth: [],
  physicalPain: [],
  moodMental: [],
  flowIntensity: 0,
  notes: '',
};

export const useTrackingStore = create<TrackingState>((set, get) => ({
  currentDayLog: null,
  formData: { ...initialFormData },
  isLoading: false,
  isSaving: false,
  error: null,

  fetchDayLog: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await trackingService.getByDate(date);
      const log = response.data;
      if (log) {
        set({
          currentDayLog: log,
          formData: {
            periodIndicators: log.periodIndicators || [],
            sexualHealth: log.sexualHealth || [],
            physicalPain: log.physicalPain || [],
            moodMental: log.moodMental || [],
            flowIntensity: log.flowIntensity || 0,
            notes: log.notes || '',
          },
          isLoading: false,
        });
      } else {
        set({
          currentDayLog: null,
          formData: { ...initialFormData },
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateFormField: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    }));
  },

  toggleSymptom: (field, symptom) => {
    const state = get();
    const currentArray = state.formData[field] as string[];
    const newArray = currentArray.includes(symptom)
      ? currentArray.filter((s) => s !== symptom)
      : [...currentArray, symptom];

    set({
      formData: { ...state.formData, [field]: newArray },
    });
  },

  saveDayLog: async (date: string) => {
    set({ isSaving: true, error: null });
    try {
      const { formData } = get();
      await trackingService.create({
        date,
        ...formData,
        isPeriodDay: formData.flowIntensity > 0 || formData.periodIndicators.length > 0,
      });
      set({ isSaving: false });
    } catch (error: any) {
      set({ error: error.message, isSaving: false });
    }
  },

  resetForm: () => {
    set({ formData: { ...initialFormData }, currentDayLog: null });
  },
}));
