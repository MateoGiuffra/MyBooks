"use client"
import { DropdownNavProps, DropdownProps, OnSelectHandler } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface BookCalendarProps {
    date: Date | undefined;
    setDate: OnSelectHandler<Date>;
    bgColor?: "white" | string
}

export default function BookCalendar({ date, setDate, bgColor = "transparent" }: BookCalendarProps) {
    const handleCalendarChange = (
        _value: string | number,
        _e: React.ChangeEventHandler<HTMLSelectElement>
    ) => {
        const _event = {
            target: {
                value: String(_value),
            },
        } as React.ChangeEvent<HTMLSelectElement>
        _e(_event)
    }

    return (
        <div>
            <Calendar
                mode="single"
                style={{ backgroundColor: bgColor }}
                required={true}
                selected={date}
                onSelect={setDate}
                className="rounded-md p-2"
                captionLayout="dropdown-years"
                defaultMonth={new Date()}
                startMonth={new Date(1980, 6)}
                components={{
                    DropdownNav: (props: DropdownNavProps) => {
                        return (
                            <div className="flex w-full  items-center justify-center gap-3 [&>span]:text-sm [&>span]:font-medium">
                                {props.children}
                            </div>
                        )
                    },
                    YearsDropdown: (props: DropdownProps) => {
                        return (
                            <Select
                                value={String(props.value)}
                                onValueChange={(value) => {
                                    if (props.onChange) {
                                        handleCalendarChange(value, props.onChange)
                                    }
                                }}
                            >
                                <SelectTrigger className="h-8 w-fit font-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                                    {props.options?.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={String(option.value)}
                                            disabled={option.disabled}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )
                    },
                }}
            />
        </div>
    )
}
