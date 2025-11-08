import { TimePeriods } from '../constants'

export type Pill = { 
  name: string; 
  checked: boolean, 
  time: string, 
  period: TimeOfDayType 
};

// get the type of elements accessible by a numeric index
export type TimeOfDayType = typeof TimePeriods[number];