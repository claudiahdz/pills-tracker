import { useState } from 'react'
import DayTable from "../components/DayTable/DayTable" 
import InputPill from "../components/InputPill/InputPill"
import { Collapse } from '@kunukn/react-collapse'

import { type Pill, type TimeOfDayType } from '../types';

function Home() {

  // Initialize state
  const [pills, setPills] = useState<Pill[]>([])
  const [newPill, setNewPill] = useState<Pill>({ name: '', checked: false, time: ':', period: '' })
  const [selectedTime, setSelectedTime] = useState<string[]>(['morning'])
  const [isAddPillOpen, setIsAddPillOpen] = useState(false)

  // Get currentDate
  const currentDate = new Date()
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  const date = currentDate.toLocaleDateString('es-ES', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const onToggleAddPill = () => setIsAddPillOpen((s) => !s)


  const addPill = () => {
    if (!newPill.name.trim()) return; // no pill to add
    
    const newPills = [ ...pills ];
    selectedTime.forEach(t => {
      const pill = { ...newPill }
      pill.period = t
      newPills.push(pill)
    })

    setPills(newPills)
    setNewPill({ name: '', checked: false, time: ':', period: '' })
    setSelectedTime(['morning'])
  }

  const editPill = (timeOfDay: TimeOfDayType, index: number, type: 'toggle' | 'delete') => {
    const pill = pills.filter(p => p.period === timeOfDay)[index]
    const indexOfPill = pills.indexOf(pill);
    let newPills = [ ...pills ];

    if (type === 'toggle') {
      newPills[indexOfPill] = {
        ...newPills[indexOfPill],
        checked: !newPills[indexOfPill].checked
      }
    }

    if (type === 'delete') {
      newPills = pills.filter((_, index) => index !== indexOfPill);
    }

    setPills(newPills)
  }

  const checkSelectedTime = (el: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = el.target.checked
    isChecked? setSelectedTime([...selectedTime, el.target.value]) 
    : setSelectedTime(selectedTime.filter(t => t !== el.target.value));
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-purple-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-[800px] mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-linear-to-br from-purple-600 to-violet-600 bg-clip-text text-transparent">Control de Pastillas</span> 💊
          </h1>
          <div>
            <h3 className="mt-3 text-base md:text-lg text-slate-500 font-medium">{date}</h3>
          </div>
          <button
            className='mt-6 w-full md:w-auto px-8 py-3 text-base font-semibold bg-linear-to-br from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 shadow-md hover:shadow-lg'
            onClick={onToggleAddPill}
          > { isAddPillOpen? '✕ Cerrar' : '+ Agregar Pastilla' }</button>
        <Collapse
          isOpen={isAddPillOpen}
          transition='height 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        >
          <InputPill 
            newPill={newPill}
            setNewPill={setNewPill}
            selectedTime={selectedTime}
            checkSelectedTime={checkSelectedTime}
            addPill={addPill}
          />
        </Collapse>
        <DayTable 
          pills={pills}
          editPill={editPill} 
        />
        </div>
      </div>
    </div>
  )
}

export default Home
