/**
 * function that returns basic repository properties from payload.
 */
import { groupBy, flatten, prop } from "ramda";

import { Context, Issue, RepoProps, GHIssue, ModifiedFile, File } from "./types";
import { RepoIssue } from "../parser";

export function getBasicRepoProps (context: Context): RepoProps {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };
  return fields;
}

// returns issue diff. Diff pre-existing issues on github with new ones
// from source code
// TODO: simplify code and break into smaller independent functions
export function diffIssues (repo: Issue[], githubIssues: GHIssue[]): Issue[] {
  const repoTitleGroup: {[key: string]: any[]} = groupBy(obj => obj.title, repo);
  return Object.keys(repoTitleGroup).map((repoIssueTitle) => {

    const diffedBody = githubIssues.map(ghIssue => {
      if (repoIssueTitle === ghIssue.title) {
        const repoIssueArr = repoTitleGroup[repoIssueTitle][0].body.split(`\n`);
        return repoIssueArr.filter(iss => !ghIssue.comments.includes(iss));
      }
      return null;
    })
    .filter(body => body !== null );

    const body = diffedBody.length
      ? flatten(diffedBody).join(`\n`)
      : repoTitleGroup[repoIssueTitle][0].body;

    return {title: repoIssueTitle, body, authors: repoTitleGroup[repoIssueTitle][0].authors};
  });
}

export function mergeFileRepoIssues(repoIssues: RepoIssue[][]): RepoIssue[] {
  const groupedByIssueType =
      groupBy<RepoIssue>(prop("keyWord"), flatten< RepoIssue>(repoIssues));
  const issueGroupsList: RepoIssue[][] =
      Object.keys(groupedByIssueType).map(key => groupedByIssueType[key]);
  return flatten<RepoIssue>(issueGroupsList);
}

export function getModifiedFiles(octokit, array, owner, repo): Promise<ModifiedFile[]> {
  const modifiedFiles: Array<Promise<ModifiedFile>> = array.data.files.map(async(file) => {
  const name = file.filename;
  const content = await octokit.repos.getContent({owner, repo, path: name});
  return { name, htmlUrl: content.data.html_url, downloadUrl: content.data.download_url};
});
  return Promise.all(modifiedFiles);
}

export async function getfileName(
  octokit,
  owner: string,
  repo: string,
  sha: string
): Promise<File> {
 const objFiles = await octokit.gitdata.getTree({owner, repo, sha});
 if (!objFiles) return;
 return objFiles.tree.map( async (obj) => {
  if (obj.type !== "tree") {
    return {name: obj.path, downloadUrl: obj.url};
      } else {
    return await getfileName(octokit, owner, repo, obj.sha);
    }
  });
}
