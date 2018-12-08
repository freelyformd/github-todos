import "jest";
import { getIssueCommentDetails } from "../../src/lib/github/getComments";

const strng = ` - [ ] [app.js](https://github.com/aleku399/sequelizeDemoApp/blob/master/app.js#L36) : testing the bot: TODO : aleku399`;

describe("should return an array of file and comment", () => {
    it("should return array", () => {
      const results = getIssueCommentDetails(strng);
      expect(results).toMatchSnapshot();
    });
});

