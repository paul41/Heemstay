import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ label, selectedDate, onChange, minDate }) => {
  return (
    <div className="date-picker">
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={minDate || new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        className="datepicker-input"
      />
    </div>
  );
};

export default CustomDatePicker;