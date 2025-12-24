// User types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriodStartDate?: string;
  dismissedCards: string[];
}

// Cycle types
export interface Cycle {
  _id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  cycleLength?: number;
  periodLength?: number;
  isActive: boolean;
  ovulationDate?: string;
  fertileWindow?: {
    start: string;
    end: string;
  };
  pregnancyTestResult?: {
    taken: boolean;
    result: 'positive' | 'negative' | 'faint' | 'not_taken';
    date?: string;
  };
}

export interface CyclePredictions {
  currentCycleDay: number;
  avgCycleLength: number;
  cycleProgress: number;
  nextPeriodDate: string;
  daysUntilPeriod: number;
  ovulationDate: string;
  fertileWindow: {
    start: string;
    end: string;
  };
}

// Tracking types
export type PeriodIndicator = 'spotting' | 'heavier_flow' | 'lighter_flow' | 'vaginal_dryness';
export type SexualHealthSymptom = 'increased_sex_drive' | 'decreased_sex_drive' | 'vaginal_discharge';
export type PhysicalPainSymptom =
  | 'cramps' | 'diarrhea' | 'fatigue' | 'headache' | 'nausea'
  | 'breast_tenderness' | 'abdominal_pain' | 'pelvic_pain'
  | 'water_retention' | 'lower_back_pain' | 'appetite_changes';
export type MoodMentalSymptom =
  | 'happy' | 'neutral' | 'sad' | 'low_motivation' | 'mood_swings'
  | 'irritability' | 'cravings' | 'tearfulness' | 'difficulty_concentrating';

export interface DailyLog {
  _id: string;
  userId: string;
  cycleId?: string;
  date: string;
  periodIndicators: PeriodIndicator[];
  sexualHealth: SexualHealthSymptom[];
  physicalPain: PhysicalPainSymptom[];
  moodMental: MoodMentalSymptom[];
  flowIntensity: number;
  notes: string;
  isPeriodDay: boolean;
}

export interface TrackingFormData {
  periodIndicators: string[];
  sexualHealth: string[];
  physicalPain: string[];
  moodMental: string[];
  flowIntensity: number;
  notes: string;
}

// Calendar types
export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isPeriodDay: boolean;
  isPredictedPeriod: boolean;
  isFertileDay: boolean;
  isOvulationDay: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  hasLog: boolean;
}

export interface CalendarData {
  days: CalendarDay[];
  currentCycleDay: number;
}

// Article types
export interface Article {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  tags: string[];
  readTimeMinutes: number;
}

// Tip types
export interface Tip {
  _id: string;
  title: string;
  content: string;
  icon: string;
  cycleDays: number[];
  category: string;
  actionText: string;
}

// Health Report types
export interface CycleSummary {
  cycleLength: number;
  periodDuration: number;
  estimatedNextPeriod: string;
  ovulationWindow: string;
}

export interface SymptomFrequency {
  physicalPain: number;
  moodMental: number;
  digestionAppetite: number;
  sexualHealth: number;
}

export interface PeriodLengthData {
  date: string;
  flowIntensity: number;
  periodDay: number;
}

export interface HistoricalEntry {
  date: string;
  time: string;
  topSymptom: string;
  totalSymptoms: number;
  note: string;
}

export interface TrendWatch {
  mostFrequentSymptom: string;
  symptomIntensityChange: 'stable' | 'increasing' | 'decreasing';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
