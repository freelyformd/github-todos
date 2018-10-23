/**
 * Diffs existing issues on github with new issues from source code
 * and returns the diff that includes issues that are not on github yet
 */
import formattedIssueComment from "./issuePresenter";
import { Context } from "./types";
import { RepoIssue } from "../parser";
import { diffIssues, Issue } from "./utils";

async function getAllIssues(context: Context): Promise<Issue[]> {
  const octokit = context.github;
  const result = await octokit.issues.getAll({filter: "all",  state: "open"});
  return result.files.map(objIssue => ({title: objIssue.title, body: objIssue.body}));
}

export default async function getNewIssuesFromSource(context: Context, data: RepoIssue[]): Promise<Issue[]> {
  const oldIssues: Issue[] = await getAllIssues(context);
  const newIssues: Issue[] = formattedIssueComment(data);
  return diffIssues(newIssues, oldIssues);
}
