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
  const sha = context.payload.head_commit.id;
  const octokit = context.github;
  const treeObject = await octokit.gitdata.getTree({owner, repo, sha, recursive: 5});
  const changedFilesArray = treeObject.tree.map( async (obj) => {
    if (obj.type !== "tree") {
      return obj.path;
  } else {
    return await octokit.gitdata.getTree({owner, repo, sha: obj.sha});
  }
  });
  // not sure if we shall av a return type if we use map Promise<ModifiedFile[][]>
  // we might return something like that
  return changedFilesArray.forEach(async(file) => {
      return getModifiedFiles(octokit, file, owner, repo);
    });
}
