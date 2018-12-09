/**
 * Gets files that have changed during a commit
 */
import { Context, ModifiedFile } from "./types";
import { getBasicRepoProps } from "./utils";

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
  const author = result.data.committer.login;
  const modifiedFiles: Array<Promise<ModifiedFile>> =
    result.data.files.map(async(file) => {
      const name = file.filename;
      const content = await octokit.repos.getContents({owner, repo, path: name});
      return {
        name,
        htmlUrl: content.html_url,
        downloadUrl: content.download_url,
        author
      };
    });
  return Promise.all(modifiedFiles);
}
