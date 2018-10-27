/**
 * function that returns basic repository properties from payload.
 */
import fetch from "node-fetch";
import { GHIssue } from "./types";
import { getBasicRepoProps } from "./utils";
import { flatten } from "ramda";


export interface RawGHIssue {
  comments: number;
  number: number;
  title: string;
}

export async function getAllRepoIssues(context: any): Promise<GHIssue[]> {
  const { owner, repo } = getBasicRepoProps(context);
  const base = "https://api.github.com/repos";
  const url = `${base}/${owner}/${repo}/issues`;
  // TODO: Need to pass authentication token so as to be able to get issues for private repos
  // TODO: To query only open issues and created by bot
  const res = await fetch(url);
  const data: RawGHIssue[] = await res.json();
  const issues = data.map(obj => ({
    title: obj.title,
    number: obj.number,
    comments: obj.comments,
  }));
  return issuesWithComments(owner, repo, issues, context.github);
}


function issuesWithComments(
  owner: string,
  repo: string,
  ghIssues: RawGHIssue[],
  octokit: any
): Promise<GHIssue[]> {
  const ghIssuesWithComments = ghIssues.map(async (issue) => {
    const commentsPayload = await octokit.issues.getComments({owner, repo, number: issue.number});
    const comments = flatten<string>(commentsPayload.data.map(obj => obj.body.split("\n")));
    return {title: issue.title, comments, number: issue.number};
  });
  return Promise.all(ghIssuesWithComments);
}
