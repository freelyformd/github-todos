/**
 * Gets files that have changed in the last  commits
 */
import { Context, ModifiedFile, File } from "./types";
import { getBasicRepoProps,  getfileName } from "./utils";

export default async function getFiles(context: Context): Promise<ModifiedFile[]> {
  const { owner, repo } = getBasicRepoProps (context);
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const treeObject = await octokit.gitdata.getTree({owner, repo, sha, recursive: 5});
  const filePromises: Array<Promise<File>> =  treeObject.tree.map( async (obj) => {
    return getfileName(octokit, owner, repo, obj.sha);
  });
  const arrFile = await Promise.all(filePromises);
  const modifiedFiles: Array<Promise<ModifiedFile>> = arrFile.map( async (objFile: File) => {
    const content = await octokit.repos.getContents({owner, repo, path: objFile.name});
    return {
      name: objFile.name,
      htmlUrl: content.html_url,
      downloadUrl: content.download_url,
      author: owner
    };
  });
  return Promise.all(modifiedFiles);
}
