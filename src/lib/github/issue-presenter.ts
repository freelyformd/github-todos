import * as R from "ramda";
import { RepoIssue } from "../parser";

type Comment = string;
type Title = string;
interface IssueWithComments {
   title: Title;
   comments: Comment[];
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

export default createIssueWithComments;
