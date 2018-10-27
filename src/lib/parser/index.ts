/**
 * uses an AST parser to analyse commits
 * currently supports ts and js files
 */
import extract from "esprima-extract-comments";

import { FilesContent } from "../github/getFilesContent";

type KeyWord = "TODO"  | "FIXME";

const keyWords: KeyWord[] = ["TODO", "FIXME"];

export interface RepoIssue {
   commentText: string;
   lineNumber: number;
   keyWord: KeyWord;
   fileName: string;
   url: string;
}

interface ExtractedBlob {
    type: string;
    value: string;
    range: number[];
    loc: any;
}

const findWord = (str: string): KeyWord | null => {
  const wordArr = keyWords.filter(word => str.includes(word));
  return wordArr ?  wordArr[0] : null;
};

const replaceWord = (str: string): string => {
    const regex = /[TODO:FIXME:]/g;
    return str.replace(regex, "").trim();
};

function parseData (data: FilesContent): RepoIssue[] {
    const extractedFile: ExtractedBlob[] = extract(data.content);
    return extractedFile
    .map( (obj: ExtractedBlob) => ({
        commentText: replaceWord(obj.value),
        lineNumber: obj.loc.end.line,
        keyWord: findWord(obj.value) as KeyWord,
        fileName: data.name,
        url: data.url
    }))
    .filter(obj => keyWords.includes(obj.keyWord));
}

export default parseData;
