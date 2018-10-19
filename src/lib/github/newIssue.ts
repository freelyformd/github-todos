import formattedIssueComment from "./issue-presenter";
import { Context } from "./types";
import { RepoIssue } from "../parser";
import { joinIssues, Issue } from "./utils";

async function getAllIssues(context: Context): Promise<Issue[]> {
  const octokit = context.github;
  const result = await octokit.issues.getAll({filter: "all",  state: "open"});
  return result.files.map(objIssue => ({title: objIssue.title, body: objIssue.body}));
}

export default async function getNewIssuesFromSource(context: Context, data: RepoIssue[]): Promise<Issue[]> {
  const oldIssues: Issue[] = await getAllIssues(context);
  const newIssues: Issue[] = formattedIssueComment(data);
  return joinIssues(newIssues, oldIssues);
}
