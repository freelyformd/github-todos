/**
 * API function to add comments to existing bot created issues.
 */

import { Context } from "./types";
import { Issue } from "./addIssuesToRepo";
import { getBasicRepoProps } from "./utils";

export default async function updateExistingIssues (context: Context, newIssue: Issue): Promise<void> {
  const octokit = context.github;

  const options = {
    filter: "subscribed",
    state: "open",
    sort: "created",
    order: "asc"
  };

  const results = await octokit.issues.getAll(options);

  results.issues.forEach( async (issue: Issue) => {
    if (issue.title === newIssue.title ) {

      const issueNumber = context.payload.issue.number;
      const { owner, repo } = getBasicRepoProps (context);

      const fields = {
      owner,
      repo,
      issueNumber,
      body: newIssue.body
    };

      await octokit.issues.createComment(fields);
    }
  });

}
