/**
 * Gets files that have changed during a commit
 */

export type Files = string[];

export default async function getChangedFiles(context: any): Promise<Files[]> {
  const repo = context.payload.repository.name;
  // could be owner.name
  const owner = context.payload.repository.owner.login;
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const result = await octokit.repos.getCommit({owner, repo, sha});
  return result.files.map(file => file.name);
}