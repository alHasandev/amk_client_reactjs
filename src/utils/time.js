class Time {
  daynames = ["minggu", "senin", "selasa", "rabu", "kamis", "jum'at", "sabtu"];
  moonnames = [
    "Januari",
    "Pebruari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  year = (date) => {
    return new Date(date).getFullYear();
  };
  month = (date, adjustment = 0) => {
    return new Date(date).getMonth() + adjustment;
  };
  date = (date) => {
    return new Date(date).getDate();
  };

  yearMonth = (date, adjustment = 0) => {
    if (this.month(date) < 10)
      return `${this.year(date)}-0${this.month(date, adjustment)}`;
    return `${this.year(date)}-${this.month(date)}`;
  };

  getDayName = (date) => {
    const day = new Date(date).getDay();
    return this.daynames[day];
  };

  getMonth = (date) => {
    const [year, month] = date.split("-");

    return `${this.moonnames[Number(month) - 1]} ${year}`;
  };

  getDateString = (date) => {
    date = new Date(date);

    // const [year, month, day] = normalDate(date).split("-");
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (!year || !month || !day) return "";

    return `${day} ${this.moonnames[Number(month)]} ${year}`;
  };
}

export function calculateAge(date) {
  let dateBirth = new Date(date);
  var diff_ms = Date.now() - dateBirth.getTime();
  // console.log(new Date(date));
  var age_dt = new Date(diff_ms);

  const age = Math.abs(age_dt.getUTCFullYear() - 1970);

  return isNaN(age) ? "-" : `${age}`;
}

export function localDate(date) {
  return new Date(date).toLocaleDateString("id-ID");
}

export function normalDate(date, separator = "-") {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return !!date ? [year, month, day].join(separator) : "";
}

export function reverseNormalDate(date, separator = "-") {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return !!date ? [day, month, year].join(separator) : "";
}

export default new Time();
