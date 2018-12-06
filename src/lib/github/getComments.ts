import { getBasicRepoProps, formatStringArray } from "./utils";

import { Context } from "./types";
import { label } from "./addIssuesToRepo";

export interface GhIssueComment {
  file: string;
  comment: string;
  assignee: string;
}

export default async function getAllComments (context: Context): Promise<GhIssueComment[]> {
  const octokit = context.github;
  const { owner, repo } = getBasicRepoProps (context);
  const fields = {
      owner,
      repo,
      labels: label,
    };
  const arrayComments = await octokit.issues.list(fields);
  return arrayComments.map(obj => {
    const commentArray: string[] = obj.body.split(`\n`);
    return commentArray.map( (comment: string) => {
        const individualCommentArr = formatStringArray(comment);
        return {
          file: individualCommentArr[0],
          comment: individualCommentArr[1],
          assignee: obj.assignee.login
          };
    });
  });
}

