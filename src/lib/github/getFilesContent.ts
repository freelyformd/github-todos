import fetch from "node-fetch";
import { ModifiedFile } from "./types";

export interface FilesContent {
    content: string;
    name: string;
    author: string;
    url: string;
}

const getFilesContent = async (arrList: ModifiedFile[]): Promise<FilesContent[]> => {
  const promises: Array<Promise<FilesContent>> = arrList.map( async (file) => {
    const res = await fetch(file.downloadUrl);
    const textBlob = await res.text();
    return ({
      content: textBlob,
      author: file.author,
      name: file.name,
      url: file.htmlUrl
    });
  });
  return Promise.all(promises);
};

export default getFilesContent;
