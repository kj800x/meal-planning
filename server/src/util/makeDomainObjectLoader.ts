import { order } from "./ordering";

export function makeDomainObjectLoader<T>(loader: {
  all: (ids: readonly number[]) => T[];
}) {
  return async function (ids: readonly number[]): Promise<T[]> {
    const result = loader.all(ids);
    return order(result, ids as any);
  };
}
