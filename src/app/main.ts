import { Context } from "../lib/github/types";
import { addRepoCommentsToGH, addCommentsToGHonInstall } from "../lib";

module.exports = app => {
  app.log("Cheers, the app runs on a server!");

  app.on("push", async (context: Context) => {
    addRepoCommentsToGH(context);
  });

  app.on("installation", async (context: Context) => {
    addCommentsToGHonInstall(context);
  });
};
