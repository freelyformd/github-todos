/**
 * Diffs existing issues on github with new issues from source code
 * and returns the diff that includes issues that are not on github yet
 */
import formattedIssueComment from "./issuePresenter";
import { Context, Issue, GHIssue } from "./types";
import { RepoIssue } from "../parser";
import { diffIssues } from "./utils";
import { getAllRepoIssues } from "./repoIssuesList";

export default async function getNewIssuesFromSource(context: Context, data: RepoIssue[]): Promise<Issue[]> {
  const oldIssues: GHIssue[] = await getAllRepoIssues(context);
  const newIssues: Issue[] = formattedIssueComment(data);
  return diffIssues(newIssues, oldIssues);
}
