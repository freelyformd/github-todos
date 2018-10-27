import "jest";
import { diffIssues } from "../../src/lib/github/utils";

const fromSource = [
    {
      "body": `-[ ]README.md: 14 alex testing 1 on the 2s
      -[ ]README.md: 14  see u`,
      "title": "FIXMEs from source code"
    },
    {
      "body": `-[ ]README.md: 12
  -[ ]README.md: 11 test
  -[ ]README.md: 40 check
  -[ ]README.md: 40 see`,
      "title": "TODOs from source code"
    }
  ];
const fromGithub = [
    {
      comments: [
        "-[ ]README.md: 12",
        "-[ ]README.md: 11 test",
        "-[ ]README.md: 10 niggas in paris",
        "-[ ]README.md: 14 whistle`",
      ],
      title: "TODOs from source code",
      number: 1,
    },
    {
      comments: [
        "-[ ]README.md: 14 alex testing 1 on the 2s",
        "-[ ]README.md: 15 look at u",
        "-[ ]README.md: 10 ok",
      ],
      number: 2,
      title: "FIXMEs from source code",
    }
  ];

describe("all issues data tests", () => {
  describe("when both github & source issues exist", () => {
    it("should return blob data",  () => {
      const results = diffIssues(fromSource, fromGithub);
      expect(results ).toMatchSnapshot();
    });
  });
  describe("when only source issues exist", () => {
    it("should return blob data",  () => {
      const results  = diffIssues(fromSource, []);
      expect(results ).toMatchSnapshot();
    });
  });
});
