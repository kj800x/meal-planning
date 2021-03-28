export const withSafeError = (
  func,
  errorReturnFn = (e) => ({ error: e })
) => async (...args) => {
  try {
    return await func(...args);
  } catch (e) {
    console.log(e.stack);
    return errorReturnFn(e);
  }
};
