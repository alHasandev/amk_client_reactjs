export const queryString = (queryObject) =>
  Object.keys(queryObject)
    .map((key) => key + "=" + queryObject[key])
    .join("&");

export const queryObject = (queryString = false) =>
  queryString
    ? JSON.parse(
        '{"' +
          decodeURI(queryString)
            .replace("?", "")
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    : {};

export const backLink = (defaultLink = "") => {
  const query = queryObject(window.location.search);
  let backLink = defaultLink;
  if (query.backLink) {
    backLink = query.backLink;
  }

  return backLink;
};

const url = {
  queryString,
  queryObject,
  backLink,
};

export default url;
