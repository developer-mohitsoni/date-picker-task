import { useDatePickerStore } from "../datePickerStore"; // Assuming you have created the store in this file
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecurringDatePicker = () => {
  const {
    selectedDate,
    recurrence,
    recurringDates,
    setSelectedDate,
    setRecurrence,
  } = useDatePickerStore();

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 shadow-xl rounded-lg border border-blue-300">
      {/* DatePicker Component */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        isClearable
        placeholderText="Select a date"
        className="border border-gray-300 p-3 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {/* Recurrence Dropdown */}
      <select
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
        className="border border-gray-300 p-3 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="none">No Recurrence</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Recurring Dates List */}
      <div className="w-full mt-6">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
          Recurring Dates:
        </h3>
        <ul className="list-disc list-inside pl-4 space-y-3">
          {recurringDates.length > 0 ? (
            recurringDates.map((date, index) => (
              <li
                key={index}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-100"
              >
                {date.toDateString()}
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-2 bg-gray-200 rounded-lg shadow-md">
              No dates available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
