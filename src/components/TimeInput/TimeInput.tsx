interface TimeInputProps {
  val: string;
  fn: (v: string) => void;
  placeholder: string;
  min: number;
  max: number;
}

const TimeInput = ({ val, fn, placeholder, min, max }: TimeInputProps) => {
  return (
    <input
      type='number'
      placeholder={placeholder}
      value={val}
      onChange={(el) => {
        const value = el.target.value;
        // only allow 2 digits and range
        if (value === '' || (value.length <= 2 && parseInt(value) >= min && parseInt(value) <= max)) {
          fn(value);
        }
      }}
      onBlur={(el) => {
        // pad with zero on blur if needed
        const value = el.target.value;
        if (value && value.length === 1) {
          fn(value.padStart(2, '0'));
        }
      }}
      className='border rounded px-2 py-1 w-10 text-center'
    />
  )
}

export default TimeInput;