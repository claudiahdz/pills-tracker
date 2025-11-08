import { type Pill, type TimeOfDayType } from '../../types';
import { TimePeriods, TimePeriodLabels } from '../../constants'

interface DayTableProps {
  pills: Pill[];
  editPill: (timeOfDay: TimeOfDayType, index: number, type: 'toggle' | 'delete') => void;
}

const DayTable = ({ pills, editPill }: DayTableProps) => {
    return (
      <div className='border-2 border-slate-200 rounded-lg overflow-hidden mt-6 mb-5 w-full shadow-lg bg-white'>
        {
          TimePeriods.map((period, index) => {
            return (
              <div
                key={`timePeriod-${index}`} 
                className='border-b-2 border-slate-100 last:border-b-0'
              >
                <div className='bg-linear-to-r from-purple-50 to-violet-50 font-bold py-4 px-5 border-b-2 border-slate-200 text-base md:text-lg text-slate-700'>{TimePeriodLabels[period]}</div>
                  { pills.filter(p => p.period === period).map((pill, index) => (
                    <div key={index} className='flex items-center gap-4 py-4 px-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-all'>
                      <input 
                        type='checkbox' 
                        id={`${period}-${index}`} 
                        checked={pill.checked}
                        onChange={() => editPill(period, index, 'toggle')}
                        className='peer w-6 h-6 text-purple-600 border-slate-300 rounded-md focus:ring-purple-500 cursor-pointer transition-transform hover:scale-110' 
                      />
                      <label htmlFor={`${period}-${index}`} className='cursor-pointer flex-1 text-base text-slate-700 font-medium peer-checked:line-through peer-checked:text-slate-400'>{pill.name}</label>
                      <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">{pill.time}</span>
                      <button
                        className="px-3 py-1.5 text-sm font-semibold text-red-600 bg-red-50 rounded-md hover:bg-red-100 hover:text-red-700 active:scale-95 transition-all"
                        onClick={() => editPill(period, index, 'delete')}
                      >
                        ×
                      </button>
                    </div>)
                  )}
              </div>
            )
          })
        }
        </div>
    )
}

export default DayTable;

