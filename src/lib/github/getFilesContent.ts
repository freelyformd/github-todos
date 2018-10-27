import fetch from "node-fetch";
import { ModifiedFile } from "./changedFilesList";

export interface FilesContent {
    content: string;
    name: string;
    url: string;
}

const getFilesContent = async (arrList: ModifiedFile[]): Promise<FilesContent[]> => {
  const promises: Array<Promise<FilesContent>> = arrList.map( async (file) => {
    const res = await fetch(file.downloadUrl);
    const textBlob = await res.text();
    return ({
      content: textBlob,
      name: file.name,
      url: file.htmlUrl
    });
  });
  return Promise.all(promises);
};

export default getFilesContent;
