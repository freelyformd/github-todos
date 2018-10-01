import "jest";
import { Application } from "probot";
// Requiring our app implementation
import  myProbotApp  from "../src/app/main";
import repoPushPayload from "./fixtures/push.json";

describe("My Probot app", () => {
  let app;
  let github;

  beforeEach(() => {
    app = new Application();
    // Initialize the app based on the code from index.js
    app.load(myProbotApp);
    // This is an easy way to mock out the GitHub API
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    };
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github);
  });


  test.skip("creates an issue when code is pushed to a repository", async () => {
    // Simulates delivery of an issues.opened webHook
    await app.receive({
      name: "push",
      payload: repoPushPayload
    });

    // This test passes if the code in your main.ts file calls `context.github.issues.createComment`
    expect(github.issues.createComment).toHaveBeenCalled();
  });
});

