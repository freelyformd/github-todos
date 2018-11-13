/**
 * Gets files that have changed in the last  commits
 */
import { Context, File } from "./types";
import { getBasicRepoProps,  getfileNames } from "./utils";

export default async function getFiles(context: Context): Promise<File[]> {
  const { owner, repo } = getBasicRepoProps (context);
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const treeObject = await octokit.gitdata.getTree({owner, repo, sha, recursive: 5});
  return treeObject.tree.map( async (obj) => {
    return getfileNames(octokit, owner, repo, obj.sha);
  });
}
