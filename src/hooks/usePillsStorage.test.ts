import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadPills, savePills } from './usePillsStorage';
import type { Pill } from '../types/index'

describe('loadPills', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default pills when localStorage is empty', () => {
    const pills = loadPills();
    expect(pills).toEqual([{
      name: 'Vitamina C',
      checked: false,
      time: '08:00',
      period: 'breakfast'
    }])
  });

  it('should reset checked status on new day', () => {
    // mock yesterday's actions
    localStorage.setItem('pills-tracker-last-date', '2025-11-09');
    localStorage.setItem('pills-tracker-data', JSON.stringify([
      { name: 'Test', checked: true, time: '08:00', period: 'breakfast' }
    ]));

    vi.setSystemTime(new Date('2025-11-10')); // change date

    const pills = loadPills();
    expect(pills[0].checked).toBe(false);
  });
});

describe('savePills', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save pills in localStorage', () => {
    const pills: Pill[] = [
      { name: 'Test', checked: true, time: '08:00', period: 'breakfast' },
      { name: 'Test2', checked: false, time: '04:00', period: 'lunch' },
    ];
    savePills(pills);
    const loadedPills = loadPills();
    expect(pills).toEqual(loadedPills)
  });
});