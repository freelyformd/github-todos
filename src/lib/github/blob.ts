import fetch from "node-fetch";

export interface Blob {
    content: string;
    name: string;
}

const getFileContent = async (arrList): Promise<Blob[]> => {
  const promises: Array<Promise<Blob>> = arrList.map( async (file) => {
    const res = await fetch(file.url);
    const textBlob = await res.text();
    return ({
      content: textBlob,
      name: file.name
    });
  });
  return Promise.all(promises);
};

export default getFileContent;
