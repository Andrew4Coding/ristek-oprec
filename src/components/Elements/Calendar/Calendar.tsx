import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface datePickerInterface {
  selectedDate: Date,
  onChange: (date: Date) => void,
  className?: string,
}

const MyDatePicker: React.FC<datePickerInterface> = ({ selectedDate, onChange, className }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      placeholderText="Choose date"
      dateFormat="dd/MM/yyyy"
      className={`text-section-content px-5 py-3 bg-[#f6f6f6] w-full text-sm font-medium rounded-md ${className}`}
    />
  );
};

export default MyDatePicker;
