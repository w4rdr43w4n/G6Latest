import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parse_date(dateString:string) {
  let date,time;
  if (dateString!= null) {
  const timeEnd = dateString.indexOf('.')
  const dateEnd = dateString.indexOf('T')
   date = dateString.substring(0,dateEnd)
   time = dateString.substring(dateEnd+1,timeEnd)}
  else {date = 'today'; time = 'now';}
  return `${date} ${time}`
}