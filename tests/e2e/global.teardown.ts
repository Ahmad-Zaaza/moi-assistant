import fs from "fs";
import path from "path";
import { AuthStateFolderPath } from "./e2e.utils";

function deleteAuthFiles() {
  try {
    const files = fs.readdirSync(AuthStateFolderPath);
    files.forEach((file) => {
      fs.unlinkSync(path.join(AuthStateFolderPath, file));
    });
  } catch (err) {
    //
  }
}

deleteAuthFiles();
