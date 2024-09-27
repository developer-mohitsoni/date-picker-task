import { create } from "zustand";
import { devtools } from "zustand/middleware"; // Import devtools middleware

interface DatePickerStore {
  selectedDate: Date | null;
  recurrence: string;
  recurringDates: Date[];
  setSelectedDate: (date: Date | null) => void;
  setRecurrence: (recurrence: string) => void;
  calculateRecurringDates: (
    startDate: Date | null,
    recurrence: string
  ) => Date[];
}

export const useDatePickerStore = create<DatePickerStore>()(
  devtools((set) => ({
    selectedDate: null,
    recurrence: "none",
    recurringDates: [],

    // Function to set the selected date and recalculate recurring dates
    setSelectedDate: (date) =>
      set((state) => ({
        selectedDate: date,
        recurringDates: state.calculateRecurringDates(date, state.recurrence),
      })),

    // Function to set recurrence type and recalculate recurring dates
    setRecurrence: (recurrence) =>
      set((state) => ({
        recurrence: recurrence,
        recurringDates: state.calculateRecurringDates(
          state.selectedDate,
          recurrence
        ),
      })),

    // Function to calculate the recurring dates
    calculateRecurringDates: (startDate, recurrence) => {
      const dates: Date[] = [];
      if (!startDate || recurrence === "none") return dates;

      for (let i = 0; i < 10; i++) {
        let currentDate = new Date(startDate); // Clone the startDate
        if (recurrence === "daily") {
          currentDate = new Date(
            currentDate.setDate(currentDate.getDate() + i)
          );
        } else if (recurrence === "weekly") {
          currentDate = new Date(
            currentDate.setDate(currentDate.getDate() + i * 7)
          );
        } else if (recurrence === "monthly") {
          currentDate = new Date(
            currentDate.setMonth(currentDate.getMonth() + i)
          );
        } else if (recurrence === "yearly") {
          currentDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() + i)
          );
        }
        dates.push(new Date(currentDate));
      }
      return dates;
    },
  }))
);
