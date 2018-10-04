/**
 *  API Function that adds an issue with comments to a repository
 */

 export interface IssuesWithComments {
    title: string;
    comments: string[];
 }

 export default async function addIssueToRepo(context: any, issuesWithComments: IssuesWithComments[] ): Promise<void> {
    const octokit = context.github;

    const fields = {
      owner: "author",
      repo: "repository",
      title: "title",
      body: "comments"
    };

    const result = await octokit.issues.create(fields);
    return result.issues.map( issue => {
      return {
        title: issue.title,
        comments: issue.comments
      };
    });
 }