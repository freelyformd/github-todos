import { getBasicRepoProps } from "./utils";

import { Context } from "./types";
import { label } from "./addIssuesToRepo";

export interface GhIssueComment {
  file: string;
  comment: string;
  assignee: string;
}

export default async function getCheckedComments (context: Context): Promise<GhIssueComment[]> {
  const octokit = context.github;
  const { owner, repo } = getBasicRepoProps (context);
  const fields = {
      owner,
      repo,
      labels: label,
    };
  const arrayComments = await octokit.issues.list(fields);
  return arrayComments.map(obj => ({
    comment: obj.body,
    assignee: obj.assignee.login
  }));
}
