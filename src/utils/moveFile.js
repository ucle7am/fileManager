import { copyFile } from "./copyFile.js"
import { deleteFile } from "./deleteFile.js"

export const moveFile = async (filePath, newDirPath) => {
  const isCopeied = await copyFile(filePath, newDirPath);
  if(isCopeied){
    await deleteFile(filePath);
  }
}
