import { format, parse } from 'date-fns';
import { ISO_8601_DATE_FORMAT } from '~/lib/constants';

export function parseDate(date: string) {
  return parse(date, ISO_8601_DATE_FORMAT, new Date());
}

export function formatFactDate(date: string) {
  return format(parseDate(date), 'd LLL yyyy');
}

export const oneSecond = 1;
export const oneMinute = oneSecond * 60;
export const oneHour = oneMinute * 60;
export const oneDay = oneHour * 24;
export const oneWeek = oneDay * 7;
export const oneYear = oneWeek * 56;
