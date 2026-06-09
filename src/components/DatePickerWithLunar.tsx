"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
// @ts-ignore
import solarLunar from "solarlunar";

interface DatePickerWithLunarProps {
  selectedDate: string; // format "YYYY-MM-DD"
  onChange: (date: string) => void;
  label: string;
  minDate?: string; // format "YYYY-MM-DD"
  disabled?: boolean;
}

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const MONTH_NAMES = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

// Helper to format date "YYYY-MM-DD" -> "DD/MM/YYYY"
function formatToDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

export default function DatePickerWithLunar({
  selectedDate,
  onChange,
  label,
  minDate = "",
  disabled = false
}: DatePickerWithLunarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Date states for the calendar view
  const [viewDate, setViewDate] = useState(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() + 1 }; // month is 1-indexed
  });

  const [lunarSummary, setLunarSummary] = useState("");

  // Close calendar popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update lunar summary for the selected date
  useEffect(() => {
    if (selectedDate) {
      const [y, m, d] = selectedDate.split("-").map(Number);
      try {
        // @ts-ignore
        const lunar = solarLunar.solar2lunar(y, m, d);
        setLunarSummary(`(Âm lịch: ${lunar.lDay}/${lunar.lMonth} ${lunar.cMonth})`);
      } catch (e) {
        setLunarSummary("");
      }
    }
  }, [selectedDate]);

  const { year, month } = viewDate;

  // Navigation handlers
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate((prev) => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate((prev) => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // Calendar generation logic
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();
  
  // Align day index: JS 0 is Sunday, we want T2 (Monday) as index 0, so CN (Sunday) is index 6.
  const rawFirstDay = new Date(year, month - 1, 1).getDay(); // 0 is Sunday
  const firstDayOfWeek = (rawFirstDay + 6) % 7; // Monday is 0, Sunday is 6

  const calendarDays: Array<{
    day: number;
    monthOffset: number; // -1: prev month, 0: current month, 1: next month
    dateString: string;
    isToday: boolean;
    isDisabled: boolean;
    lunarDayText: string;
    isLunarFirst: boolean;
    isFestival: boolean;
  }> = [];

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // 1. Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDay = daysInPrevMonth - i;
    const prevMonthVal = month === 1 ? 12 : month - 1;
    const prevYearVal = month === 1 ? year - 1 : year;
    const dateStr = `${prevYearVal}-${String(prevMonthVal).padStart(2, "0")}-${String(prevDay).padStart(2, "0")}`;
    
    // Calculate Lunar
    let lunarText = "";
    let isLunarFirst = false;
    try {
      // @ts-ignore
      const lunar = solarLunar.solar2lunar(prevYearVal, prevMonthVal, prevDay);
      isLunarFirst = lunar.lDay === 1;
      lunarText = isLunarFirst ? `${lunar.lDay}/${lunar.lMonth}` : String(lunar.lDay);
    } catch {}

    calendarDays.push({
      day: prevDay,
      monthOffset: -1,
      dateString: dateStr,
      isToday: dateStr === todayStr,
      isDisabled: true, // disable prev month trailing days for simplicity
      lunarDayText: lunarText,
      isLunarFirst,
      isFestival: false
    });
  }

  // 2. Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isDisabled = minDate ? dateStr < minDate : false;
    
    // Calculate Lunar details
    let lunarText = "";
    let isLunarFirst = false;
    let isFestival = false;
    try {
      // @ts-ignore
      const lunar = solarLunar.solar2lunar(year, month, d);
      isLunarFirst = lunar.lDay === 1;
      lunarText = isLunarFirst ? `${lunar.lDay}/${lunar.lMonth}` : String(lunar.lDay);
      
      // Basic lunar festivals checking: 1/1, 15/1, 5/5, 15/7, 15/8
      if (
        (lunar.lDay === 1 && lunar.lMonth === 1) || // Tết
        (lunar.lDay === 15 && lunar.lMonth === 1) || // Rằm Thượng Nguyên
        (lunar.lDay === 5 && lunar.lMonth === 5) || // Tết Đoan Ngọ
        (lunar.lDay === 15 && lunar.lMonth === 7) || // Vu Lan
        (lunar.lDay === 15 && lunar.lMonth === 8) // Trung Thu
      ) {
        isFestival = true;
      }
    } catch {}

    calendarDays.push({
      day: d,
      monthOffset: 0,
      dateString: dateStr,
      isToday: dateStr === todayStr,
      isDisabled,
      lunarDayText: lunarText,
      isLunarFirst,
      isFestival
    });
  }

  // 3. Next month days to pad to 42 cells (6 rows)
  const remainingCells = 42 - calendarDays.length;
  for (let n = 1; n <= remainingCells; n++) {
    const nextMonthVal = month === 12 ? 1 : month + 1;
    const nextYearVal = month === 12 ? year + 1 : year;
    const dateStr = `${nextYearVal}-${String(nextMonthVal).padStart(2, "0")}-${String(n).padStart(2, "0")}`;

    // Calculate Lunar
    let lunarText = "";
    let isLunarFirst = false;
    try {
      // @ts-ignore
      const lunar = solarLunar.solar2lunar(nextYearVal, nextMonthVal, n);
      isLunarFirst = lunar.lDay === 1;
      lunarText = isLunarFirst ? `${lunar.lDay}/${lunar.lMonth}` : String(lunar.lDay);
    } catch {}

    calendarDays.push({
      day: n,
      monthOffset: 1,
      dateString: dateStr,
      isToday: dateStr === todayStr,
      isDisabled: true, // disable next month leading days
      lunarDayText: lunarText,
      isLunarFirst,
      isFestival: false
    });
  }

  const handleDaySelect = (dateString: string, isDisabled: boolean) => {
    if (isDisabled) return;
    onChange(dateString);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      <label className="text-xs text-slate-600 uppercase tracking-wider mb-1 block pl-1 font-semibold">{label}</label>
      
      {/* Input Display Box */}
      <div 
        onClick={() => {
          if (disabled) return;
          setIsOpen(!isOpen);
        }}
        className={`flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition-all min-h-[54px] ${
          disabled ? "opacity-35 pointer-events-none bg-slate-100" : "hover:bg-slate-100/50 cursor-pointer"
        }`}
      >
        <CalendarIcon className="text-[var(--accent)] w-5 h-5 mr-3 shrink-0" />
        <div className="w-full flex flex-col min-w-0">
          <span className="text-slate-800 font-semibold text-sm whitespace-nowrap">
            {formatToDisplay(selectedDate) || "Chọn ngày"}
          </span>
          {lunarSummary && (
            <span className="text-[10px] text-slate-500 truncate font-medium">
              {lunarSummary}
            </span>
          )}
        </div>
      </div>

      {/* Popover Calendar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 md:left-auto md:w-[340px] mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl p-4"
          >
            {/* Header: Month / Year selectors */}
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-slate-800 font-bold text-sm whitespace-nowrap">
                {MONTH_NAMES[month - 1]}, {year}
              </span>
              
              <button 
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {WEEKDAYS.map((day) => (
                <span key={day} className="text-[10px] font-bold text-slate-400 py-1">
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((cell, idx) => {
                const isSelected = cell.dateString === selectedDate;
                const isCurrentMonth = cell.monthOffset === 0;
                
                let btnClass = "relative h-11 w-full rounded-lg flex flex-col justify-center items-center transition-all cursor-pointer ";
                
                if (isSelected) {
                  btnClass += "bg-[var(--accent)] text-white font-bold shadow-lg shadow-[var(--accent)]/20";
                } else if (cell.isDisabled) {
                  btnClass += "text-slate-350 cursor-not-allowed pointer-events-none opacity-20";
                } else if (!isCurrentMonth) {
                  btnClass += "text-slate-400 hover:bg-slate-50";
                } else {
                  btnClass += "text-slate-700 hover:bg-slate-100";
                }

                if (cell.isToday && !isSelected) {
                  btnClass += " border border-[var(--accent)]/50";
                }

                return (
                  <button
                    type="button"
                    key={idx}
                    disabled={cell.isDisabled}
                    onClick={() => handleDaySelect(cell.dateString, cell.isDisabled)}
                    className={btnClass}
                  >
                    {/* Solar Date */}
                    <span className="text-xs font-semibold leading-none mb-0.5">
                      {cell.day}
                    </span>
                    
                    {/* Lunar Date */}
                    <span 
                      className={`text-[8px] font-medium leading-none ${
                        isSelected 
                          ? "text-white/80" 
                          : cell.isLunarFirst || cell.isFestival
                            ? "text-orange-600 font-bold" 
                            : "text-slate-400"
                      }`}
                    >
                      {cell.lunarDayText}
                    </span>

                    {/* Lunar Festival indicator dot */}
                    {cell.isFestival && !isSelected && (
                      <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-orange-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
