/**
 * Gets files that have changed during a commit
 */
import { Context } from "./types";
import { getBasicRepoProps, getModifiedFiles } from "./utils";

export interface ModifiedFile {
  name: string;
  downloadUrl: string;
  htmlUrl: string;
}

export default async function getChangedFiles(context: Context): Promise<ModifiedFile[]> {
  const { owner, repo } = getBasicRepoProps (context);
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const fields = {
    owner,
    repo,
    sha
  };
  const result = await octokit.repos.getCommit(fields);
  return getModifiedFiles(octokit, result, owner, repo);
}
