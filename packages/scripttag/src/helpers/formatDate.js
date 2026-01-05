export function formatDateRaw(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return [
    zeroSuffix(result.getMonth() + 1),
    zeroSuffix(result.getDate()),
    result.getFullYear()
  ].join('/');
}

function zeroSuffix(str) {
  return ('0' + str).slice(-2);
}
