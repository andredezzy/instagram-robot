import { parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import siconvConfig from '@config/siconv';

export default function parseDate(
  dateString: string,
  formatString = 'dd/MM/yyyy',
): Date {
  if (!dateString) return undefined;

  const parsedDate = parse(dateString, formatString, Date.now());
  const utcDate = zonedTimeToUtc(parsedDate, siconvConfig.timezone);

  return utcDate;
}
