/**
 * function that returns basic repository properties from payload.
 */
import { groupBy, flatten, prop } from "ramda";

import { Context, Issue, RepoProps, GHIssue } from "./types";
import { RepoIssue } from "../parser";


export function getBasicRepoProps (context: Context): RepoProps {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };
  return fields;
}

// returns issue diff. Diff pre-existing issues on github with new ones
// from source code
export function diffIssues (repo: Issue[], githubIssues: GHIssue[]): Issue[] {
  const repoTitleGroup = groupBy(obj => obj.title, repo);
  return Object.keys(repoTitleGroup).map((repoIssueTitle) => {

    const diffedBody = githubIssues.map(ghIssue => {
      if (repoIssueTitle === ghIssue.title) {
        const repoIssueArr = repoTitleGroup[repoIssueTitle][0].body.split(`\n`);
        return repoIssueArr.filter(iss => !ghIssue.comments.includes(iss));
      }
      return null;
    })
    .filter(body => body !== null );

    const body = diffedBody.length
      ? flatten(diffedBody).join(`\n`)
      : repoTitleGroup[repoIssueTitle][0].body;

    return {title: repoIssueTitle, body};
  });
}

export function mergeFileRepoIssues(repoIssues: RepoIssue[][]): RepoIssue[] {
  const groupedByIssueType =
      groupBy<RepoIssue>(prop("keyWord"), flatten< RepoIssue>(repoIssues));
  const issueGroupsList: RepoIssue[][] =
      Object.keys(groupedByIssueType).map(key => groupedByIssueType[key]);
  return flatten<RepoIssue>(issueGroupsList);
}
