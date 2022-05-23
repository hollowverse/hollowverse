import { format, parse } from 'date-fns';

export function formatFactDate(date: string) {
  return format(parse(date, 'yyyy-MM-dd', new Date()), 'd LLL yyyy');
}
