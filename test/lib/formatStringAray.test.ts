import "jest";
import { formatStringArray } from "../../src/lib/github/utils";

const strng = ` - [ ] [app.js](https://github.com/aleku399/sequelizeDemoApp/blob/master/app.js#L36) : testing the bot`;

describe("should return an array of file and comment", () => {
    it.only("should return array", () => {
      const results = formatStringArray(strng);
      expect(results).toMatchSnapshot();
    });
});

