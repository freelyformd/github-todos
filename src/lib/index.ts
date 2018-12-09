/**
 * create issues out of TODO and FIXME comments if they don't exist yet
 * with in a repo issue.
 */

import getChangedFiles from "../lib/github/changedFilesList";
import getFilesContent, { FilesContent } from "./github/getFilesContent";
import getNewIssuesFromSource from "./github/getNewIssue";
import addIssuesToRepo from "./github/addIssuesToRepo";
import getFiles from "../lib/github/getFilesOnInstall";
import parseData from "./parser";

import { mergeFileRepoIssues } from "./github/utils";

import { Context } from "./github/types";

export async function addRepoCommentsToGH(context: Context): Promise<void> {
    // get changed files on a git push
    const changedFiles = await getChangedFiles(context);
    // get file data
    const filesContent: FilesContent[] = await getFilesContent(changedFiles); // error handling

    const filesRepoIssues = filesContent.map(parseData);
    // merge into a single set of FIXME and TODO issues
    const repoIssues = mergeFileRepoIssues(filesRepoIssues);
    const issuesToAddToRepo = await getNewIssuesFromSource(context, repoIssues);
    return addIssuesToRepo(context, issuesToAddToRepo);
}

export async function addCommentsToGHonInstall(context: Context): Promise<void> {
    // get changed files on install
    const changedFiles = await getFiles(context);
    // get file data
    const filesContent: FilesContent[] = await getFilesContent(changedFiles); // error handling

    const filesRepoIssues = filesContent.map(parseData);
    // merge into a single set of FIXME and TODO issues
    const repoIssues = mergeFileRepoIssues(filesRepoIssues);
    const issuesToAddToRepo = await getNewIssuesFromSource(context, repoIssues);
    return addIssuesToRepo(context, issuesToAddToRepo);
}

