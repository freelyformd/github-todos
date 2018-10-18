/**
 * extracts a list of open issues created by the app
 */

import { Context } from "./types";

export interface OpenIssue {
    title: string; // issue title
    id: string; // issue id
}

export default async function getAppCreatedIssues (context: Context): Promise<OpenIssue[]> {
    const octokit = context.github;

    const opts = {
      filter: "subscribed",
      state: "open"
    };

    const result = await octokit.issues.getAll(opts);
    return result.issues.map(issue => {
      return {
        title: issue.title,
        id: issue.number
      };
    });
}
