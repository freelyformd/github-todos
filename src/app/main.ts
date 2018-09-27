/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
export default function main (app: any): void {
    app.log("Cheers, the app runs on a server!");

    app.on("push", async (context: any) => {
      const postIssue: string = context.issue({body: "Thanks for opening a repository in this account."});
      return context.github.issues.createComment(postIssue);
    });
}
