export function calculateAge(dob) {
  var diff_ms = Date.now() - new Date(dob).getTime();
  var age_dt = new Date(diff_ms);

  const age = Math.abs(age_dt.getUTCFullYear() - 1970);

  return isNaN(age) ? "Unknown" : `${age} years old`;
}

export function localDate(date) {
  return new Date(date).toLocaleDateString("id-ID");
}

export function normalDate(date) {
  let d = date instanceof Date ? date : new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
