/**
 *  API Function that adds issues with comments to a repository
 */

import { Context } from "./types";
import { getBasicRepoProps } from "./util";

export interface Issue {
  title: string;
  body: string[];
}

export default async function addIssuesToRepo(context: Context, issues: Issue[] ): Promise<any[]> {
  const octokit = context.github;
  const repoPropsObj = getBasicRepoProps (context);
    const promises: Array<Promise<any>> = issues.map( async (issue: Issue) => {
      const title = issue.title;
      const body = issue.body;
      const fields = {
        owner: repoPropsObj.owner,
        repo: repoPropsObj.repo,
        title,
        body
      };
     return await octokit.issues.create(fields);
    });
  return Promise.all(promises);
}
