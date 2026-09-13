/**
 * Calendar export.
 *
 * The app is a folder of static files, so it cannot send you an email or push a
 * notification while it is closed — both need a server holding a subscription
 * and doing the sending. What it can do is hand your calendar a repeating
 * appointment, and let the calendar do what calendars are already good at:
 * reminding you on your phone, and by email if you have that switched on.
 *
 * Times are floating (no zone, no Z) so the reminder lands at 08:00 wherever
 * the clinician happens to be.
 */

const pad = (n) => String(n).padStart(2, '0');

const stamp = (date) =>
  `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T` +
  `${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;

const floating = (date, hour) =>
  `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hour)}0000`;

const esc = (text) =>
  String(text ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

/** RFC 5545 caps a line at 75 octets; continuations start with one space. */
const fold = (line) => {
  const bytes = [...new TextEncoder().encode(line)];
  if (bytes.length <= 75) return line;
  const out = [];
  let start = 0;
  let limit = 75;
  while (start < bytes.length) {
    const chunk = bytes.slice(start, start + limit);
    out.push(new TextDecoder().decode(new Uint8Array(chunk)));
    start += limit;
    limit = 74;
  }
  return out.join('\r\n ');
};

const REMINDER_HOUR = 8;

/**
 * @param {Array<{procedure: object, standing: object}>} entries
 * @param {string} appUrl Absolute URL of the app, so the reminder is one tap from the procedure.
 */
export const rehearsalCalendar = (entries, appUrl, now = new Date()) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EM Procedures//HALO rehearsal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:HALO rehearsal',
    'X-WR-CALDESC:Spaced rehearsal of high acuity, low occurrence procedures.',
  ];

  for (const { procedure, standing } of entries) {
    // Never rehearsed, or already due: start tomorrow. Otherwise start on the date it falls due.
    const start = standing.due && standing.daysUntilDue > 0
      ? new Date(standing.due)
      : new Date(now.getTime() + 86_400_000);
    const url = `${appUrl}#/rehearse/${procedure.id}`;
    const summary = `Rehearse: ${procedure.name}`;
    const detail =
      `${procedure.summary}\n\nHigh acuity, low occurrence — rehearsed every ` +
      `${standing.interval} days.\n\n${url}`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:emproc-${procedure.id}@em-procedures`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART:${floating(start, REMINDER_HOUR)}`,
      `DURATION:PT20M`,
      `RRULE:FREQ=DAILY;INTERVAL=${standing.interval}`,
      fold(`SUMMARY:${esc(summary)}`),
      fold(`DESCRIPTION:${esc(detail)}`),
      fold(`URL:${esc(url)}`),
      'CATEGORIES:HALO,Rehearsal',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'TRIGGER:PT0S',
      fold(`DESCRIPTION:${esc(summary)}`),
      'END:VALARM',
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return `${lines.join('\r\n')}\r\n`;
};

/** Hand the file to the browser. Nothing leaves the device. */
export const downloadCalendar = (text, filename = 'halo-rehearsal.ics') => {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
