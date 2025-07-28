import { useState } from "react";
import { OnSelectHandler } from "react-day-picker";
interface UseCalendarResult {
    date: Date | undefined;
    setDate: OnSelectHandler<Date>;
}

export function useCalendar(): UseCalendarResult {
    const [date, setSelectedDate] = useState<Date | undefined>(new Date());

    const setDate = (date: Date) => {
        setSelectedDate(date);
    };
    return { date, setDate };
}