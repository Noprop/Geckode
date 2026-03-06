type TimeSinceUnit = "second" | "minute" | "hour" | "day" | "month" | "year"
type TimeSinceResult = { length: number; unit: TimeSinceUnit };

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

function addUtcMonths(date: Date, monthsToAdd: number): Date {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();

  const totalMonths = year * 12 + month + monthsToAdd;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonth = ((totalMonths % 12) + 12) % 12;
  const maxDayInTargetMonth = new Date(
    Date.UTC(targetYear, targetMonth + 1, 0),
  ).getUTCDate();

  const safeDay = Math.min(day, maxDayInTargetMonth);
  return new Date(
    Date.UTC(
      targetYear,
      targetMonth,
      safeDay,
      hours,
      minutes,
      seconds,
      milliseconds,
    ),
  );
}

export function getTimeSince(value: string | Date | number): TimeSinceResult | null {
  const start =
    value instanceof Date
      ? new Date(value.getTime())
      : typeof value === "number"
        ? new Date(value)
        : new Date(value);

  if (!Number.isFinite(start.getTime())) return null;

  const now = new Date();
  if (now <= start) return { length: 0, unit: "second" };

  let years = now.getUTCFullYear() - start.getUTCFullYear();
  if (years < 0) years = 0;
  while (years > 0 && addUtcMonths(start, years * 12) > now) {
    years -= 1;
  }
  if (years > 0) return { length: years, unit: "year" };

  const afterYears = addUtcMonths(start, years * 12);
  let months =
    (now.getUTCFullYear() - afterYears.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - afterYears.getUTCMonth());
  if (months < 0) months = 0;
  while (months > 0 && addUtcMonths(afterYears, months) > now) {
    months -= 1;
  }
  if (months > 0) return { length: months, unit: "month" };

  const afterMonths = addUtcMonths(afterYears, months);
  const diffMs = now.getTime() - afterMonths.getTime();

  const days = Math.floor(diffMs / MS_PER_DAY);
  if (days > 0) return { length: days, unit: "day" };

  const hours = Math.floor(diffMs / MS_PER_HOUR);
  if (hours > 0) return { length: hours, unit: "hour" };

  const minutes = Math.floor(diffMs / MS_PER_MINUTE);
  if (minutes > 0) return { length: minutes, unit: "minute" };

  const seconds = Math.floor(diffMs / MS_PER_SECOND);
  return { length: Math.max(0, seconds), unit: "second" };
}

export function formatTimeSince(value: string | Date | number): string {
  const result = getTimeSince(value);
  if (!result) return "-";
  return `${result.length} ${result.unit}${result.length === 1 ? "" : "s"} ago`;
}