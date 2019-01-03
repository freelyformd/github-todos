/**
 * function that enables an issue comment to be editable, that is to say,
 * provides the delete and edit(overwrite) options.
 *
 * @param: context & issueCommentArray
 * @returns: Promise<void>
 */

import { getBasicRepoProps } from "./utils";
import { Context } from "./types";

type CommentEditAction = "Delete" | "Edit";

const Delete: CommentEditAction = "Delete";
const Edit: CommentEditAction = "Edit";

interface CommentEdit {
  GhIssueId: number;
  GhCommentId: number;
  action: CommentEditAction;
  commentsText: string;
}

type CommentsEdit = CommentEdit[];

export default async function issueCommentToEdit (
      context: Context,
      issueComment: CommentsEdit
    ): Promise<void> {

      const octokit = context.github;
      const { owner, repo } = getBasicRepoProps(context);

      issueComment.map(async (comment) => {
        const commentId = await octokit
          .issues
          .getComment({
              owner,
              repo,
              comment_id: comment.GhCommentId
            });

        if (comment.action === Delete) {
            return await octokit
              .issues
              .deleteComment({
                  owner,
                  repo,
                  comment_id: commentId
                });
        }

        if (comment.action === Edit) {
            return await octokit
              .issues
              .updateComment({
                  owner,
                  repo,
                  comment_id: commentId,
                  body: comment.commentsText
                });
        }
    });
}
