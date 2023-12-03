import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export function formatDateInTimeZone(
	date,
	targetTimeZone = 'America/New_York',
) {
	// Parse the inputDate string into a JavaScript Date object
	const parsedDate = parseISO(date);

	const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const timeZone = defaultTimeZone || targetTimeZone;

	// Convert UTC to the target time zone
	const zonedDate = utcToZonedTime(parsedDate, timeZone);

	const formattedDate = format(zonedDate, 'MMMM d, yyyy hh:mm aa', {
		timeZone,
	});

	return formattedDate;
}
