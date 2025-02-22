import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify"
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S'
];

const summaryDates = generateDatesFromYearBeginning();

const minumumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFiell = minumumSummaryDatesSize - summaryDates.length

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number
}>

export function Sumarytable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data)
    })
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day');
          })
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFiell > 0 && Array.from({ length: amountOfDaysToFiell }).map((_, i) => {
          return (
            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
          )
        })}
      </div>
      <ToastContainer
      />
    </div>
  )
}