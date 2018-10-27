/**
 * Gets files that have changed during a commit
 */
import { Context } from "./types";
import { getBasicRepoProps } from "./utils";

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
  const modifiedFiles: Array<Promise<ModifiedFile>> =
    result.data.files.map(async(file) => {
      const name = file.filename;
      const content = await octokit.repos.getContent({owner, repo, path: name});
      return { name, htmlUrl: content.data.html_url, downloadUrl: content.data.download_url};
    });
  return Promise.all(modifiedFiles);
}
