/**
 * Gets files that have changed during a commit
 */
import { Context } from "./types";
import { getBasicRepoProps } from "./util";

export interface ModifiedFile {
  name: string;
  url: string;
}

export default async function getChangedFiles(context: Context): Promise<ModifiedFile[]> {
  const repoPropsObj = getBasicRepoProps (context);
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const fields = {
    owner: repoPropsObj.owner,
    repo: repoPropsObj.repo,
    sha
  };
  const result = await octokit.repos.getCommit( fields);
  return result.files.map(file => ({name: file.filename, url: file.blob_url}));
}