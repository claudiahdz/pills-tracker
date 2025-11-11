import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest';

import { type Pill } from '../../types';
import InputPill from './InputPill'

// create mock props
const mockNewPill: Pill = {
  name: '',
  checked: false,
  time: '',
  period: null
};
const mockSetNewPill = vi.fn();
let mockSelectedTime: string[] = [];
const mockCheckSelectedTime = vi.fn();
const mockAddPill = vi.fn();

const mockInputPill = (
  newPill: Pill, 
  setNewPill: () => void, 
  selectedTime: string[], 
  checkSelectedTime:  () => void, 
  addPill: () => void) => {
  return (
    <InputPill 
      newPill={newPill}
      setNewPill={setNewPill}
      selectedTime={selectedTime}
      checkSelectedTime={checkSelectedTime}
      addPill={addPill}
    />
  );
};

describe('InputPill', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // reset all mocks before each test
  });

  afterEach(() => {
    cleanup(); // clean up DOM after each test
  });

  it('renders the InputPill component', () => {
    render(mockInputPill(mockNewPill, mockSetNewPill, mockSelectedTime, mockCheckSelectedTime, mockAddPill));
    expect(screen.getByPlaceholderText('💊 Agregar nombre')).toBeInTheDocument();
  })

  it('adds a pill with name and time period', () => {
    const { rerender } = render(mockInputPill(mockNewPill, mockSetNewPill, mockSelectedTime, mockCheckSelectedTime, mockAddPill));
    const inputName = screen.getByPlaceholderText('💊 Agregar nombre');
    const inputTimePeriod = screen.getByRole('checkbox', { name: 'desayuno' });
    const addButton = screen.getByRole('button');

    // adds a new pill
    fireEvent.change(inputName, {
      target: { value: 'Dramamine' },
    });
    expect(mockSetNewPill).toHaveBeenCalled();

    mockNewPill.name = 'Dramamine';
    fireEvent.click(inputTimePeriod); // checks breakfast
    expect(mockCheckSelectedTime).toHaveBeenCalled();

    // rerenders component with updated pill data
    rerender(mockInputPill(mockNewPill, mockSetNewPill, ['breakfast'], mockCheckSelectedTime, mockAddPill));

    fireEvent.click(addButton); // clicks add

    expect(mockAddPill).toHaveBeenCalled();
    expect(mockAddPill).toHaveBeenCalledTimes(1);
  })


  it('adds a pill with name and specific time', () => {
    render(mockInputPill(mockNewPill, mockSetNewPill, mockSelectedTime, mockCheckSelectedTime, mockAddPill));
    
    const inputHours = screen.getByPlaceholderText('hh');
    const inputMinutes = screen.getByPlaceholderText('mm');

    // change the time inputs to 10:30
    fireEvent.change(inputHours, {
      target: { value: '10' }
    });
    fireEvent.change(inputMinutes, {
      target: { value: '30' }
    });

    // check that setNewPill was called with the time 10:30
    expect(mockSetNewPill).toHaveBeenCalledWith(
      expect.objectContaining({
        time: '10:30'
      })
    );
  })

  it('fails when adding a pill with no time period', () => {
    // adds a new pill
    mockNewPill.name = 'Dramamine';
    
    // renders component with updated pill name but no time period
    render(mockInputPill(mockNewPill, mockSetNewPill, [], mockCheckSelectedTime, mockAddPill));
    const addButton = screen.getByRole('button');
    
    fireEvent.click(addButton); // clicks add
    expect(mockAddPill).not.toHaveBeenCalled();
  })

});