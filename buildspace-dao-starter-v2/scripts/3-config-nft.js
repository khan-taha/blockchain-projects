import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x1249deBf09051b4A506A0428E2fef022eBd8e35A");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Manchester United Membership",
        description: "This NFT will give you access to TransferMarketDAO!",
        image: readFileSync("scripts/assets/mu-mem.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();