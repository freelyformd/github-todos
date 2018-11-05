/**
 * Gets files that have changed in the last  commits
 */
import { Context } from "./types";
import { getBasicRepoProps, getModifiedFiles } from "./utils";

export interface ModifiedFile {
  name: string;
  downloadUrl: string;
  htmlUrl: string;
}

export default async function getFiles(context: Context): Promise<ModifiedFile[]> {
  const { owner, repo } = getBasicRepoProps (context);
  const octokit = context.github;
  const committedArray = await octokit.repos.getCommits({owner, repo});
  const changedFilesArray = committedArray.map( async (obj) => {
    const sha = obj.sha;
    return await octokit.repos.getCommit({owner, repo, sha});
  });
  // not sure if we shall av a return type if we use map Promise<ModifiedFile[][]>
  // we might return something like that
  return changedFilesArray.forEach(async(file) => {
      return getModifiedFiles(octokit, file, owner, repo);
    });
}
