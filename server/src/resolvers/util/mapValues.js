export const mapValues = (object, mapper) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, mapper(value)])
  );
