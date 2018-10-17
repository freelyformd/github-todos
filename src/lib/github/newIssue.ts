import * as R from "ramda";
import formattedIssueComment from "./issue-presenter";
import { Context } from "./types";
import { RepoIssue } from "../parser";

interface Issue {
  title: string;
  body: string;
}

export default async function getNewIssuesFromSource(context: Context, data: RepoIssue[]): Promise<Issue[]> {
  const octokit = context.github;
  const result = await octokit.issues.getAll({filter: "all",  state: "open"});
  const oldIssues: Issue[] = result.files.map(objIssue => ({title: objIssue.title, body: objIssue.body}));
  const newIssues: Issue[] = formattedIssueComment(data);
  const groupedObj = R.groupBy(obj => obj.title, newIssues);
  return Object.keys(groupedObj).map( (key: string) => {
        const bodyArr = oldIssues.map(old => {
          if (key === old.title) {
            const newIssueArr: string[] = groupedObj[key][0].body.split(`\n`);
            const oldIssueArr: string[] = old.body.split(`\n`);
            const filteredArr: string[] = oldIssueArr.filter( (iss: string) => newIssueArr.indexOf(iss) === -1);
            return [...newIssueArr, ...filteredArr];
            }
          });
        return {title: key, body: bodyArr.join(`\n`)};
      });
}