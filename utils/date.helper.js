const baseDate = new Date();
baseDate.setDate(baseDate.getDate() + 1);
let dateOffset = 1;

export function getNextFutureDate() {
  const next = new Date(baseDate);
  next.setDate(baseDate.getDate() + dateOffset);
  dateOffset++;

  const mm = String(next.getMonth() + 1).padStart(2, '0');
  const dd = String(next.getDate()).padStart(2, '0');
  const yyyy = next.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}
