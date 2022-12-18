import fs from'fs/promises';

export const checkIsPathExists = async (path) => {
  try{
      await fs.access(path);
      return true;
  }
  catch(e){
      return false;
  }
}