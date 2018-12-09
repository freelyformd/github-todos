import { getBasicRepoProps } from "./utils";

import { Context } from "./types";
import { labels } from "./addIssuesToRepo";

export interface GhIssueComment {
  file: string;
  comment: string;
  assignee: string;
}

export function getIssueCommentDetails (strng: String): GhIssueComment {
  const arr = strng.replace(/\s/g, "")
  .replace(/[\[\]-]+/g, "")
  .replace(/\(.*\)/, "").split(":");
  return {
    file: arr[0],
    comment: arr[1],
    assignee: arr[3]
  };
}

export default async function getAllComments (context: Context): Promise<GhIssueComment[]> {
  const octokit = context.github;
  const { owner, repo } = getBasicRepoProps (context);
  const fields = {
      owner,
      repo,
      labels: labels,
    };
  const arrayComments = await octokit.issues.list(fields);
  return arrayComments.map(obj => {
    const commentArray: string[] = obj.body.split(`\n`);
    return commentArray.map(getIssueCommentDetails);
  });
}

