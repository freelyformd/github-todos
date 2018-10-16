import * as R from "ramda";
import { RepoIssue } from "../parser";

type Comment = string;
type Title = string;
type Body = string;

interface IssueWithComments {
   title: Title;
   comments: Comment[];
}

interface Issue {
  title: Title;
  body: Body;
}

const createIssueWithComments = (data: RepoIssue[]): IssueWithComments[] => {
  const groupedObj  = R.groupBy(obj => obj.keyWord, data);

  return Object.keys(groupedObj).map(key => {
    const singleArrObj: RepoIssue[] = groupedObj[key];
    const title = `${key}s from source code`;
    const comments = singleArrObj.map((obj: RepoIssue) =>
      `${obj.fileName}: ${obj.lineNumber} ${obj.commentText}`);
    return {title, comments};
  });
};

const formattedIssueComment = (data: RepoIssue[]): Issue[] => {
    const arrComments = createIssueWithComments(data);
    return arrComments.map( (obj: IssueWithComments) => {
          return ({
            title: obj.title,
            body: obj.comments.map( (comment: Comment) => `-[ ]${comment}`).join(`\n`)
          });
    });
};
export default formattedIssueComment;
