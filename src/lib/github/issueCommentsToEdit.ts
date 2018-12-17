/**
 * function to return an array of issue comments to edit (overwrite) or delete, that is to say,
 * checked out or no longer existing issue comments in source code.
 *
 * @param: context & issueList
 * @returns: Promise<void>
 */

import getChangedFiles from "./changedFilesList";
import getFilesContent from "./getFilesContent";
import { RawGHIssue } from "./repoIssuesList";
import { Context } from "./types";

export default async function removeIssue (context: Context, issueList: RawGHIssue): Promise<void> {
    const comments = issueList.comments.split("\n");
    const changedFiles = await getChangedFiles(context);
    const filesContent = await getFilesContent(changedFiles);

    comments.forEach(async issueComment => {
        const issueCommentsToEdit = [];
        return filesContent.forEach(async fileContent => {
            fileContent.content.includes(issueComment) || !issueComment.includes("[x]")
            ? issueComment === comments[comments.length - 1]
                ? issueList
                : comments.concat([issueComment]).join("\n")
            : issueCommentsToEdit.push(issueComment);
        });
    });
}
