import log from "loglevel";
import { MutationFunction } from "../../services/types";

export function withSafeError<T, S>(
  func: MutationFunction<T, S>,
  errorReturnFn = (e: Error) => ({ error: e })
): MutationFunction<T, S> {
  return async (parent, args, context) => {
    try {
      return await func(parent, args, context);
    } catch (e) {
      log.error((e as Error).stack);
      return errorReturnFn(e as Error);
    }
  };
}
