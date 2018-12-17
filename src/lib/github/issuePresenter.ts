import * as R from "ramda";

import { RepoIssue } from "../parser";
import { Issue } from "./types";

type Comment = string;
type Title = string;

interface IssueWithComments {
   title: Title;
   authors: string[];
   comments: Comment[];
}

const createIssueWithComments = (data: RepoIssue[]): IssueWithComments[] => {
  const groupedObj = R.groupBy(obj => obj.keyWord, data);

  return Object.keys(groupedObj).map(key => {
    const singleArrObj: RepoIssue[] = groupedObj[key];
    const title = `${key}s from source code`;
    const authors = singleArrObj.map((obj: RepoIssue) => `${obj.commentAuthor}`);
    const comments = singleArrObj.map((obj: RepoIssue) =>
    `[${obj.fileName}](${obj.url}#L${obj.lineNumber}) : ${obj.commentText}: ${obj.keyWord}: by @${authors}.`);
    return {title, comments, authors};
  });
};

const formattedIssueComment = (data: RepoIssue[]): Issue[] => {
    const arrComments = createIssueWithComments(data);
    return arrComments.map( (obj: IssueWithComments) => {
      return ({
        title: obj.title,
        authors: obj.authors,
        body: obj.comments.map( (comment: Comment) => `- [ ] ${comment}`).join(`\n`)
      });
    });
};
export default formattedIssueComment;
