import { migrator } from ".";
import { DATA_DIR } from "../env/dataDir";

async function main() {
  const dataMigrator = migrator.useDataDir(DATA_DIR);
  await dataMigrator.migrate();
}

main().catch(console.error);
