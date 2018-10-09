/**
 * Gets files that have changed during a commit
 */
import { Context } from "./types";

export interface ModifiedFile {
  name: string;
  url: string;
}

export default async function getChangedFiles(context: Context): Promise<ModifiedFile[]> {
  const repo = context.payload.repository.name;
  // could be owner.name
  const owner = context.payload.repository.owner.login;
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const result = await octokit.repos.getCommit({owner, repo, sha});
  return result.files.map(file => ({name: file.filename, url: file.blob_url}));
}