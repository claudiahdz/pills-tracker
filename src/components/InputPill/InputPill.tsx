import { useState, useEffect } from 'react'
import { type Pill } from '../../types';
import { TimePeriods, TimePeriodInputLabels } from '../../constants'

import TimeInput from '../TimeInput/TimeInput';

interface InputPillProps {
    newPill: Pill;
    setNewPill: (pill: Pill) => void;
    selectedTime: string[];
    checkSelectedTime: (el: React.ChangeEvent<HTMLInputElement>) => void;
    addPill: () => void;
}

const InputPill = ({newPill, setNewPill, selectedTime, checkSelectedTime, addPill}: InputPillProps) => {
  const [hours, setHours] = useState('');
  const [seconds, setSeconds] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');

  useEffect (() => {
    // reset inputs
    if (newPill.name === '') {
      setHours('')
      setSeconds('')
      setTime('')
      setName('')
    }
  }, [newPill])

  useEffect (() => {
    const pill: Pill = {
        ...newPill,
        time: time,
        name: name,
    }
    setNewPill(pill)
  }, [name, time])

  useEffect (() => {
    const time = `${hours}:${seconds}`;
    setTime(time)
  }, [hours, seconds])

  return (
    <div className='w-full bg-linear-to-br from-slate-50 to-purple-50 rounded-lg p-6 mt-4 shadow-inner'>
      <div className='flex flex-col md:flex-row md:items-center gap-4'>
      <input 
        type='text' 
        onChange={(el) => { setName(el.target.value) }}
        value={newPill.name}
        placeholder='💊 Agregar nombre'
        className='w-full md:flex-1 px-5 py-3.5 text-base border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all shadow-sm' 
        />
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-slate-200">
        <TimeInput 
          val={newPill.time.split(':')[0] || ''}
          placeholder='hh'
          fn={setHours}
          min={1}
          max={12}
        />
        <span className='text-2xl font-bold text-slate-400'>:</span>
        <TimeInput 
          val={newPill.time.split(':')[1] || ''}
          placeholder='mm'
          fn={setSeconds}
          min={0}
          max={59}
        />
      </div>
    </div>
    <div className='w-full flex flex-wrap gap-3 mt-4'>
      {
        TimePeriods.map((period, index) => {
          return (
            <label
              key={`selectedTime-${index}`} 
              className='flex items-center cursor-pointer min-h-[44px] px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all has-[:checked]:bg-purple-100 has-[:checked]:border-purple-500'
            >
              <input 
                type='checkbox'
                name='time'
                value={period}
                className='mr-2 w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer'
                checked={selectedTime.includes(period)}
                onChange={checkSelectedTime}
              />
              <span className='text-base font-medium text-slate-700'>{TimePeriodInputLabels[period]}</span>
            </label>
          )
        })
      }
    </div>
    <button 
        onClick={addPill}
        className='mt-6 w-full md:w-auto px-8 py-3 text-base font-semibold bg-linear-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 shadow-md hover:shadow-lg'
      >
        Agregar
    </button>
  </div>
 )
}

export default InputPill;