import DataLoader from "dataloader";
import { BurndownTargetLoaderType } from "./BurndownTarget";
import { CrawlEventLoaderType } from "./CrawlEvent";
import { FileLoaderType } from "./File";
import { ImageFileLoaderType } from "./ImageFile";
import { ItemLoaderType } from "./Item";
import { ProviderSettingsLoaderType } from "./ProviderSettings";
import { RegionLoaderType } from "./Region";
import { SavedSearchLoaderType } from "./SavedSearch";
import { SourceConfigLoaderType } from "./SourceConfig";
import { SourceConfigListLoaderType } from "./SourceConfigList";
import { TagLoaderType } from "./Tag";
import { TagGroupLoaderType } from "./TagGroup";
import { TextFileLoaderType } from "./TextFile";
import { TimestampLoaderType } from "./Timestamp";
import { UrlFileLoaderType } from "./URLFile";
import { VideoFileLoaderType } from "./VideoFile";

export type DataLoaders = {
  SourceConfigList: DataLoader<number, SourceConfigListLoaderType>;
  SourceConfig: DataLoader<number, SourceConfigLoaderType>;
  AdHocSourceConfig: DataLoader<number, any>;
  AdHocSourceConfigTarget: DataLoader<number, any>;
  BurndownTarget: DataLoader<number, BurndownTargetLoaderType>;
  ProviderSettings: DataLoader<number, ProviderSettingsLoaderType>;
  CrawlEvent: DataLoader<number, CrawlEventLoaderType>;
  Item: DataLoader<number, ItemLoaderType>;
  Region: DataLoader<number, RegionLoaderType>;
  ImageFile: DataLoader<number, ImageFileLoaderType>;
  TextFile: DataLoader<number, TextFileLoaderType>;
  VideoFile: DataLoader<number, VideoFileLoaderType>;
  URLFile: DataLoader<number, UrlFileLoaderType>;
  Timestamp: DataLoader<number, TimestampLoaderType>;
  TagGroup: DataLoader<number, TagGroupLoaderType>;
  Tag: DataLoader<number, TagLoaderType>;
  File: DataLoader<number, FileLoaderType>;
  SavedSearch: DataLoader<number, SavedSearchLoaderType>;
  RegionKey: DataLoader<number, number[]>;
};

export type Context = {
  loaders: DataLoaders;
};

export type NoLoaderDomainObject<ObjectType, LoaderType> = {
  resolver: {
    [key in keyof ObjectType]:
      | ((
          loadedObject: LoaderType,
          args: any,
          context: Context
        ) => Promise<ObjectType[key]>)
      | ((
          loadedObject: LoaderType,
          args: any,
          context: Context
        ) => ObjectType[key]);
  };
};

export type DomainObject<ObjectType, LoaderType> = NoLoaderDomainObject<
  ObjectType,
  LoaderType
> & {
  loader: (id: readonly number[]) => Promise<LoaderType[]>;
};
