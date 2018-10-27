import "jest";
import formattedIssueComment from "../../src/lib/github/issuePresenter";
import { RepoIssue } from "../../src/lib/parser";
const data: RepoIssue[] = [
    {
      "commentText": "@aleku399 look into why this was causing bars not to show",
      "fileName": "README.md",
      "keyWord": "TODO",
      "lineNumber": 12,
      "url": "https://github.com/epicallan/repo/"
    },
    {
      "commentText": "alex testing 1 on the 2s",
      "fileName": "README.md",
      "keyWord": "FIXME",
      "lineNumber": 14,
      "url": "https://github.com/epicallan/repo/"
    },
    {
      "commentText": "test",
      "fileName": "README.md",
      "keyWord": "TODO",
      "lineNumber": 11,
      "url": "https://github.com/epicallan/repo/"
    }
  ];
describe("parsed data tests", () => {
    it("should return modified parsed data", () => {
      const result = formattedIssueComment(data);
      expect(result).toMatchSnapshot();
    });
});