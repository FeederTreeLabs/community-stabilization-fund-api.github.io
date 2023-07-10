import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const addDays = (dt: Date | string, days: number) => {
  const date = dayjs(dt).add(days, 'day').format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');
  return date;
};

export const addWeeks = (dt: Date | string, weeks: number) => {
  const date = dayjs(dt).add(weeks, 'week').format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');
  return date;
};

export const compareDates = (compare_keyword: string, dt1: string | Date, dt2: string | Date) => {
  if(compare_keyword.toLowerCase() === 'before') {
    return dayjs(dt1).isBefore(dt2);
  }

  if(compare_keyword.toLowerCase() === 'after') {
    return dayjs(dt1).isAfter(dt2);
  }
};