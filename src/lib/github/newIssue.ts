import formattedIssueComment, { Issue } from "./issue-presenter";
import { Context } from "./types";
import { RepoIssue } from "../parser";

export default async function getNewIssuesFromSource(context: Context, data: RepoIssue[]) {
  const repo = context.payload.repository.name;
  // could be owner.name
  const owner = context.payload.repository.owner.login;
  const octokit = context.github;
  // octokit.authenticate({repo, owner});
  const result = await octokit.issues.getAll({filter: "all"});
  const oldIssues: Issue[] = result.files.map(objIssue => ({title: objIssue.title, body: objIssue.body}));
  const newIssues: Issue[] = formattedIssueComment(data);
  const diff: Issue[] =   oldIssues.map(issue => {
          const issueArr: string[] = issue.body.split(`\n`);
          for (const obj of newIssues) {
            const objIssArr = obj.body.split(`\n`);
            for (const valIssue of objIssArr) {
                if (!issueArr.includes(valIssue)) return issueArr.push(valIssue);
            }
          }
          return {title: issue.title, body: issueArr.join(`\n`)};
      });
  return diff;
}