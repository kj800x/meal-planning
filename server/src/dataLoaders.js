import DataLoader from "dataloader";
import { mapValues } from "./resolvers/util/mapValues";

export const buildDataLoaders = (loaders) =>
  mapValues(loaders, (loader) => new DataLoader(loader));
