// remove checked out or no longer existing issueComment from bot created issuesList

import getChangedFiles from "./changedFilesList";
import getFilesContent from "./getFilesContent";
import { RawGHIssue } from "./repoIssuesList";
import { Context } from "./types";

export default async function removeIssue (context: Context, issueList: RawGHIssue): Promise<void> {
    const comments = issueList.comments.split("\n");
    const changedFiles = await getChangedFiles(context);
    const filesContent = await getFilesContent(changedFiles);

    comments.forEach(issueComment => {
        const issueCommentIndex = comments.indexOf(issueComment);
        return filesContent.forEach(fileContent => {
            fileContent.content.includes(issueComment) || !issueComment.includes("[x]")
            ? issueComment === comments[comments.length - 1]
                ? issueList
                : comments.concat([issueComment]).join("\n")
            : issueCommentIndex > -1
                ? issueComment === comments[comments.length - 1]
                    ? comments.splice(issueCommentIndex, 1).join("\n")
                    : comments.splice(issueCommentIndex, 1)
                : issueList;
        });
    });
}