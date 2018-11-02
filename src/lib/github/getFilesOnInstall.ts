/**
 * Gets files that have changed in the last  commits
 */
import { Context } from "./types";
import { getBasicRepoProps } from "./utils";

export interface ModifiedFile {
  name: string;
  downloadUrl: string;
  htmlUrl: string;
}

export default async function getFiles(context: Context): Promise<ModifiedFile[]> {
  const { owner, repo } = getBasicRepoProps (context);
  const octokit = context.github;
  const committedArray = await octokit.repos.getCommit({owner, repo});
  const changedFilesArray = committedArray.map( async (obj) => {
    const sha = obj.sha;
    return await octokit.repos.getCommit({owner, repo, sha});
  });
  // const arrayUniq = R.uniq(obj => obj.files[0].filename, changedFilesArray);
  // wanted to remove duplicate files but realized files may have different todos
  const modifiedFiles: Array<Promise<ModifiedFile>> =
    changedFilesArray.map(async(file) => {
      const name = file.files[0].filename;
      const content = await octokit.repos.getContent({owner, repo, path: name});
      return { name, htmlUrl: content.data.html_url, downloadUrl: content.data.download_url};
    });
  return Promise.all(modifiedFiles);
}
