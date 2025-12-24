export const PHYSICAL_PAIN_SYMPTOMS = [
  { id: 'cramps', label: 'Cramps', emoji: '🔥' },
  { id: 'diarrhea', label: 'Diarrhoea', emoji: '😣' },
  { id: 'fatigue', label: 'Fatigue', emoji: '😫' },
  { id: 'headache', label: 'Headache', emoji: '🤕' },
  { id: 'nausea', label: 'Nausea', emoji: '🤢' },
  { id: 'breast_tenderness', label: 'Breast tenderness', emoji: '🫁' },
  { id: 'abdominal_pain', label: 'Abdominal pain', emoji: '😰' },
  { id: 'pelvic_pain', label: 'Pelvic pain', emoji: '🚶' },
  { id: 'water_retention', label: 'Water retention', emoji: '💦' },
  { id: 'lower_back_pain', label: 'Lower back pain', emoji: '🚶' },
  { id: 'appetite_changes', label: 'Appetite changes', emoji: '🍽️' },
];

export const MOOD_MENTAL_SYMPTOMS = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'low_motivation', label: 'Low Motivation', emoji: '😔' },
  { id: 'mood_swings', label: 'Mood swings', emoji: '🤯' },
  { id: 'irritability', label: 'Irritability', emoji: '😤' },
  { id: 'cravings', label: 'Cravings', emoji: '🍫' },
  { id: 'tearfulness', label: 'Tearfulness', emoji: '😢' },
  { id: 'difficulty_concentrating', label: 'Difficulty Concentrating', emoji: '🤔' },
];

export const PERIOD_INDICATORS = [
  { id: 'spotting', label: 'Spotting', emoji: '🩸' },
  { id: 'heavier_flow', label: 'heavier flow', emoji: '💧' },
  { id: 'lighter_flow', label: 'lighter flow', emoji: '💧' },
  { id: 'vaginal_dryness', label: 'Virginal Dryness', emoji: '😐' },
];

export const SEXUAL_HEALTH_SYMPTOMS = [
  { id: 'increased_sex_drive', label: 'Increased sex drive', emoji: '😊' },
  { id: 'decreased_sex_drive', label: 'Decreased sex drive', emoji: '😐' },
  { id: 'vaginal_discharge', label: 'Virginal discharge', emoji: '😣' },
];

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
