import { useState, useEffect } from 'react';
import { type Pill } from '../types';

const PILLS_STORAGE_KEY = 'pills-tracker-data';
const LAST_DATE_KEY = 'pills-tracker-last-date';

const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const getDefaultPills = (): Pill[] => [
  {
    name: 'Vitamina C',
    checked: false,
    time: '08:00',
    period: 'breakfast'
  }
];

export const loadPills = (): Pill[] => {
  try {
    const savedPills = localStorage.getItem(PILLS_STORAGE_KEY);
    const lastDate = localStorage.getItem(LAST_DATE_KEY);
    const today = getTodayString();

    if (savedPills) {
      const parsedPills = JSON.parse(savedPills);

      // If it's a new day, reset all checked values
      if (lastDate !== today) {
        const resetPills = parsedPills.map((pill: Pill) => ({
          ...pill,
          checked: false
        }));
        // Update the date in localStorage
        localStorage.setItem(LAST_DATE_KEY, today);
        return resetPills;
      }

      return parsedPills;
    }

    // First time - set today's date
    localStorage.setItem(LAST_DATE_KEY, today);
    return getDefaultPills();
  } catch (error) {
    console.error('Error loading pills from localStorage:', error);
    return getDefaultPills();
  }
};

export const savePills = (pills: Pill[]): void => {
  try {
    localStorage.setItem(PILLS_STORAGE_KEY, JSON.stringify(pills));
    localStorage.setItem(LAST_DATE_KEY, getTodayString());
  } catch (error) {
    console.error('Error saving pills to localStorage:', error);
  }
};

export const usePillsStorage = () => {
  const [pills, setPills] = useState<Pill[]>(loadPills);

  // Save pills to localStorage whenever they change
  useEffect(() => {
    savePills(pills);
  }, [pills]);

  return { pills, setPills };
};

