// Format time as 24-hour countdown and date
export const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDate = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format ordinal suffix for the day
  const ordinal = (n: number) =>
    ["th", "st", "nd", "rd"][
      (n % 100 > 10 && n % 100 < 20) || n % 10 > 3 ? 0 : n % 10
    ];

  return `${dayName}, ${day}${ordinal(day)} ${month} ${year}`;
};
