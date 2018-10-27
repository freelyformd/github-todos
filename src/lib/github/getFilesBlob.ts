import fetch from "node-fetch";
import { ModifiedFile } from "./changedFilesList";

export interface Blob {
    content: string;
    name: string;
    url: string;
}

const getFilesBlob = async (arrList: ModifiedFile[]): Promise<Blob[]> => {
  const promises: Array<Promise<Blob>> = arrList.map( async (file) => {
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

export default getFilesBlob;
