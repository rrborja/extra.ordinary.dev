const pluralize = (value, unit) => {
  const roundedValue = Math.floor(value);
  return `${roundedValue} ${unit}${roundedValue !== 1 ? 's' : ''}`;
};

/**
 * Util function to return the since format of a datetime
 * @param {string} date the ISO string format of the date
 * @return {string} the formatted since time
 */
export default function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return pluralize(interval, 'year');
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return pluralize(interval, 'month');
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return pluralize(interval, 'day');
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return pluralize(interval, 'hour');
  }

  interval = seconds / 60;
  if (interval > 1) {
    return pluralize(interval, 'minute');
  }

  return pluralize(interval, 'second');
}
