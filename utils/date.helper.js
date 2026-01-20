export function getRandomFutureDateWithin30Days() {
  const today = new Date();

  const randomOffset = Math.floor(Math.random() * 30) + 1; // 1–30 days
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + randomOffset);

  const mm = String(futureDate.getMonth() + 1).padStart(2, '0');
  const dd = String(futureDate.getDate()).padStart(2, '0');
  const yyyy = futureDate.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}
