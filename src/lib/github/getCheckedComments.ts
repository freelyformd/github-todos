import { getBasicRepoProps } from "./utils";

import { Context } from "./types";

export default async function getCheckedComments (context: Context): Promise<string[]> {
  const octokit = context.github;
  const { owner, repo } = getBasicRepoProps (context);
  const fields = {
      owner,
      repo,
      labels: ["GH-TODO-BOT"],
    };
  const arrayComments = await octokit.octokit.issues.getForRepo(fields);
  return arrayComments.map(obj =>
    obj.body.split(`\n`).filter( (comment: string) => comment.includes(`[x]`)));
}
