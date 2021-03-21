import { db } from "./db";

function order(data, ordering, orderingKey = "id") {
  return ordering.map((id) => data.find((datum) => datum[orderingKey] === id));
}
function groupByOrder(data, ordering, orderingKey) {
  return ordering.map((id) =>
    data.filter((datum) => datum[orderingKey] === id).map((datum) => datum.id)
  );
}

const SOURCE_CONFIG_LIST = db.prepareIn(
  "SELECT * FROM SourceConfigList WHERE id IN (!?!)"
);
const SOURCE_CONFIG = db.prepareIn(
  "SELECT * FROM SourceConfig WHERE abs_source_config_id IN (!?!)"
);
const PROVIDER_SETTING = db.prepareIn(
  "SELECT * FROM ProviderSettings WHERE id IN (!?!)"
);
const ITEM = db.prepareIn("SELECT * FROM Item WHERE id IN (!?!)");
const TIMESTAMP = db.prepareIn("SELECT * FROM Timestamp WHERE id IN (!?!)");
const REGION = db.prepareIn("SELECT * FROM ImageRegions WHERE id IN (!?!)");
const TAG = db.prepareIn("SELECT * FROM Tag WHERE id IN (!?!)");
const TAG_GROUP = db.prepareIn("SELECT * FROM TagGroup WHERE id IN (!?!)");
const CRAWL = db.prepareIn("SELECT * FROM CrawlEvent WHERE id IN (!?!)");
const FILE = db.prepareIn("SELECT * FROM File WHERE id IN (!?!)");
const IMAGE_FILE = db.prepareIn(
  "SELECT * FROM ImageFile WHERE file_id IN (!?!)"
);
const VIDEO_FILE = db.prepareIn(
  "SELECT * FROM VideoFile WHERE file_id IN (!?!)"
);
const TEXT_FILE = db.prepareIn("SELECT * FROM TextFile WHERE file_id IN (!?!)");
const URL_FILE = db.prepareIn("SELECT * FROM UrlFile WHERE file_id IN (!?!)");
const REGION_KEYS = db.prepareIn(
  "SELECT file_id, id FROM ImageRegions WHERE file_id IN (!?!)"
);

export async function SourceConfigList(ids) {
  const result = SOURCE_CONFIG_LIST.all(ids);
  return order(result, ids);
}
export async function SourceConfig(ids) {
  const result = SOURCE_CONFIG.all(ids);
  return order(result, ids, "abs_source_config_id");
}
export async function Item(ids) {
  const result = ITEM.all(ids);
  return order(result, ids);
}
export async function ProviderSetting(ids) {
  const result = PROVIDER_SETTING.all(ids);
  return order(result, ids);
}
export async function Timestamp(ids) {
  const result = TIMESTAMP.all(ids);
  return order(result, ids);
}
export async function Region(ids) {
  const result = REGION.all(ids);
  return order(result, ids);
}
export async function Tag(ids) {
  const result = TAG.all(ids);
  return order(result, ids);
}
export async function TagGroup(ids) {
  const result = TAG_GROUP.all(ids);
  return order(result, ids);
}
export async function Crawl(ids) {
  const result = CRAWL.all(ids);
  return order(result, ids);
}
export async function RegionKey(fileIds) {
  const result = REGION_KEYS.all(fileIds);
  return groupByOrder(result, fileIds, "file_id");
}

const add = (addObj) => (elem) => ({ ...elem, ...addObj });

export async function File(ids) {
  const files = FILE.all(ids);
  const images = IMAGE_FILE.all(ids).map(add({ __typename: "ImageFile" }));
  const videos = VIDEO_FILE.all(ids).map(add({ __typename: "VideoFile" }));
  const texts = TEXT_FILE.all(ids).map(add({ __typename: "TextFile" }));
  const urls = URL_FILE.all(ids).map(add({ __typename: "UrlFile" }));

  return ids.map((id) => {
    return {
      ...(images.find((image) => image.file_id === id) || {}),
      ...(videos.find((video) => video.file_id === id) || {}),
      ...(texts.find((text) => text.file_id === id) || {}),
      ...(urls.find((url) => url.file_id === id) || {}),
      ...files.find((file) => file.id === id),
    };
  });
}
