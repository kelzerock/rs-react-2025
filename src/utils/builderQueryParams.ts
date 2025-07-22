export const buildQueryString = (
  queries: Record<string, string | number | boolean>,
) =>
  Object.entries(queries)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
