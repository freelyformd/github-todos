import "jest";
import { joinIssues } from "../../src/lib/github/utils";

const fromSource = [
    {
      "body": `-[ ]README.md: 14 alex testing 1 on the 2s
      -[ ]README.md: 14  see u`,
      "title": "FIXMEs from source code"
    },
    {
      "body": `-[ ]README.md: 12 @aleku399 look into why this was causing bars not to show
  -[ ]README.md: 11 test
  -[ ]README.md: 40 check
  -[ ]README.md: 40 see`,
      "title": "TODOs from source code"
    }
  ];
const fromGithub = [
    {
      "body": `-[ ]README.md: 12 @aleku399 look into why this was causing bars not to show
  -[ ]README.md: 11 test
  -[ ]README.md: 10 niggas in paris
  -[ ]README.md: 14 whistle`,
      "title": "TODOs from source code"
    },
    {
      "body": `-[ ]README.md: 14 alex testing 1 on the 2s
      -[ ]README.md: 15 look at u
      -[ ]README.md: 10 ok`,
      "title": "FIXMEs from source code"
    }
  ];

describe("all issues data tests", () => {
    it.only("should return blob data",  () => {
      const _data = joinIssues(fromSource, fromGithub);
      expect(_data).toMatchSnapshot();
    }, 10000);
});
