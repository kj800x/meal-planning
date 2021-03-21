import fs from "fs";

const providerDirListing = fs.readdirSync("./providers");

export const providers = [];

for (const provider of providerDirListing) {
  providers.push(require("../providers/" + provider));
}
