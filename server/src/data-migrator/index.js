import fs from "fs";
import path from "path";

const MANIFEST_FILE = "manifest.json";

class BoundDataMigrator {
  constructor(migrations, dataDir) {
    this.migrations = migrations;
    this.dataDir = dataDir;
  }

  getVersion() {
    const manifest = this.getManifest();
    if (manifest.version) {
      return manifest.version;
    }
    return 0;
  }

  getManifestPath() {
    return path.resolve(this.dataDir, MANIFEST_FILE);
  }

  getManifest() {
    const manifestPath = this.getManifestPath();

    if (!fs.existsSync(manifestPath)) {
      return {};
    }
    try {
      const contents = fs.readFileSync(manifestPath, "utf8");
      const json = JSON.parse(contents);
      return json;
    } catch (e) {
      throw new Error("[DATA MIGRATOR] Manifest file was in unexpected format");
    }
  }

  getTargetVersion() {
    return this.migrations.length;
  }

  setManifestVersion(version) {
    const manifest = this.getManifest();
    manifest.version = version;
    fs.writeFileSync(
      this.getManifestPath(),
      JSON.stringify(manifest, null, 2) + "\n"
    );
  }

  executeMigration(index) {
    console.log(`[DATA MIGRATOR] Running migration ${index + 1}`);
    const migration = this.migrations[index];
    migration(this.dataDir);
    this.setManifestVersion(index + 1);
  }

  migrate() {
    const version = this.getVersion();
    const target = this.getTargetVersion();

    if (version === target) {
      return;
    }

    if (version > target) {
      console.warn(
        "[DATA MIGRATOR] Manifest version is newer than expected. This app might not work. YOLO"
      );
      return;
    }

    for (let i = version; i < target; i++) {
      this.executeMigration(i);
    }
  }
}

export class DataMigrator {
  constructor(migrations) {
    this.migrations = migrations;
  }

  useDataDir(dataDir) {
    return new BoundDataMigrator(this.migrations, dataDir);
  }
}
