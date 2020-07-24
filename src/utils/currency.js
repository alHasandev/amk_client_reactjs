export default function currency(amount, localId, currencyCode) {
  return new Intl.NumberFormat(localId, {
    style: "currency",
    currency: currencyCode,
  })
    .format(amount)
    .replace(",00", "");
}

export const IDR = (amount) => currency(amount, "id-ID", "IDR");

export const currToNumber = (currency) =>
  Number(currency.replace(/[^0-9,]/g, "").replace(/[,]/g, "."));
