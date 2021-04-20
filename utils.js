export const getRandom = (num) => Math.ceil(Math.random() * num);

const twoNumbersTimeFormat = (num) => (num <= 9 ? "0" + num : num);

export function getTime() {
  const date = new Date();
  let hours = twoNumbersTimeFormat(date.getHours());
  let minutes = twoNumbersTimeFormat(date.getMinutes());
  let seconds = twoNumbersTimeFormat(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

