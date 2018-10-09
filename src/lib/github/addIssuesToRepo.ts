/**
 *  API Function that adds issues with comments to a repository
 */

export interface Issue {
    title: string;
    body: string[];
 }

 export default async function addIssuesToRepo(context: any, issues: Issue[] ): Promise<any> {
    const octokit = context.github;
        const promises: Array<Promise<any>> = issues.map( async (issue: Issue) => {
            const owner = context.payload.repository.owner.login;
            const repo = context.payload.repository.name;
            const title = issue.title;
            const body = issue.body;
            const fields = {
                owner,
                repo,
                title,
                body
            };
            return await octokit.issues.create(fields);
        });
        Promise.all(promises);
 }
