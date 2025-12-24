"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  differenceInDays,
} from "date-fns";

interface CalendarWidgetProps {
  cycleStartDate?: Date;
  periodLength?: number;
  predictedPeriodStart?: Date;
  avgCycleLength?: number;
  cycleProgress?: number;
  nextPeriodDate?: string;
  daysUntilPeriod?: number;
  fertileWindowStart?: string;
  onDateClick?: (date: Date) => void;
}

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

export function CalendarWidget({
  cycleStartDate,
  periodLength = 5,
  predictedPeriodStart,
  avgCycleLength = 28,
  cycleProgress = 78,
  nextPeriodDate,
  daysUntilPeriod = 17,
  fertileWindowStart,
  onDateClick,
}: CalendarWidgetProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today);
  const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed on mobile

  // Set collapsed state based on screen size on mount
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate period days based on cycle data or use demo data
  const periodStartDate = useMemo(() => {
    if (cycleStartDate) return cycleStartDate;
    // Demo: period starts around day 26-30 of current month
    return new Date(today.getFullYear(), today.getMonth(), 26);
  }, [cycleStartDate, today]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const isPeriodDay = (date: Date) => {
    const diff = differenceInDays(date, periodStartDate);
    return diff >= 0 && diff < periodLength;
  };

  const isPredictedPeriod = (date: Date) => {
    if (!predictedPeriodStart) return false;
    const diff = differenceInDays(date, predictedPeriodStart);
    return diff >= 0 && diff < periodLength;
  };

  // Get current week for collapsed view
  const currentWeekStart = startOfWeek(today);
  const currentWeekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(today),
  });

  // Always show full month, unless collapsed
  const displayDays = isCollapsed ? currentWeekDays : days;

  const formatNextPeriod = () => {
    if (nextPeriodDate) {
      const date = new Date(nextPeriodDate);
      return format(date, "MMM d");
    }
    return "Nov 12";
  };

  const formatFertileWindow = () => {
    if (fertileWindowStart) {
      const date = new Date(fertileWindowStart);
      return format(date, "MMM d");
    }
    return "Nov 3";
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border border-pink-100 shadow-sm bg-white"
      style={{
        backgroundImage: "url(/date-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Calendar Section with Background Image */}
      <div className="relative p-4 pb-0">
        {/* Today's date */}
        <p className="text-center text-white/80 text-sm mb-1">
          Today, {format(today, "MMMM d")}
        </p>

        {/* Month selector with navigation */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{format(currentMonth, "MMMM yyyy")}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn("transition-transform", isCollapsed ? "" : "rotate-180")}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] text-white/70 font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          className={cn(
            "grid grid-cols-7 gap-1",
            !isCollapsed ? "mb-4" : "mb-0"
          )}
        >
          {displayDays.map((day, idx) => {
            const isToday = isSameDay(day, today);
            const isPeriod = isPeriodDay(day);
            const isPredicted = isPredictedPeriod(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <button
                key={idx}
                onClick={() => onDateClick?.(day)}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all w-9 h-9 mx-auto",
                  !isCurrentMonth && !isCollapsed && "opacity-30",
                  
                  isPeriod && !isToday && "bg-pink-600 text-white",
                  
                  isToday &&
                    isPeriod &&
                    "bg-blue-500 text-white ring-2 ring-white",
                
                  isToday && !isPeriod && "bg-white text-gray-900",
          
                  isPredicted &&
                    !isPeriod &&
                    !isToday &&
                    "border-2 border-pink-300 text-white",
                
                  !isPeriod &&
                    !isPredicted &&
                    !isToday &&
                    "border border-white/40 text-white hover:bg-white/20"
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>


      <div className="relative bg-white/80 rounded-xl m-4 px-6 pt-4 pb-6 overflow-hidden">
        <div className="relative text-center">
          <p className="text-gray-600 mb-4 text-sm">Today is Cycle Day</p>

          <div className="relative inline-block mb-4">
         
            <div className="relative h-16 w-16 flex items-center justify-center flower" >
              <span className="text-3xl font-bold text-white">
                {today.getDate()}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
            <span>
              Avg. Cycle:{" "}
              <strong className="text-gray-700">{avgCycleLength} Days</strong>
            </span>
            <span>
              Currently:{" "}
              <strong className="text-gray-700">{cycleProgress}% of 100</strong>
            </span>
          </div>

          {/* Next period badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-200 bg-white mb-3">
            <span className="text-gray-500 text-sm">Next Period:</span>
            <span className="text-primary font-semibold text-sm">
              {formatNextPeriod()} ({daysUntilPeriod} Days)
            </span>
          </div>

          {/* Fertile window */}
          <p className="text-xs text-gray-500">
            Fertile window starts{" "}
            <strong className="text-gray-700">{formatFertileWindow()}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
