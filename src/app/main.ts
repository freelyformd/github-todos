/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
import getChangedFiles from "../lib/github/changedFilesList";

export interface Context {
  github: any; // an object with octokit methods
  payload: any;
  logger: any;
  issue: any; // methods
  repo: any;  // methods
}

export default function main (app: any): void {
    app.log("Cheers, the app runs on a server!");

    app.on("push", async (context: Context) => {
      // examine commit and get changed files
      // get source code from changed files
      const changedFiles = getChangedFiles(context);
      console.log("changed Files", changedFiles);
      // get Comments that start with TODO and FIXME
      // weed out duplicate issues that may already have been posted
      // present them as an issue object and post to github
      const postIssue: string = context.issue({body: "Thanks for opening a repository in this account."});
      return context.github.issues.createComment(postIssue);
    });
}
