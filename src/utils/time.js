class Time {
  year = (date) => {
    return new Date(date).getFullYear();
  };
  month = (date) => {
    return new Date(date).getMonth();
  };
  date = (date) => {
    return new Date(date).getDate();
  };
}

export function calculateAge(date) {
  let dateBirth = new Date(date);
  var diff_ms = Date.now() - dateBirth.getTime();
  // console.log(new Date(date));
  var age_dt = new Date(diff_ms);

  const age = Math.abs(age_dt.getUTCFullYear() - 1970);

  return isNaN(age) ? "Unknown" : `${age}`;
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
