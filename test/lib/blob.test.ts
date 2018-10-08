import "jest";
import fileContent from "../../src/lib/github/blob";

const list = [{
  name: "readme.md",
  url: "https://github.com/"
}];

describe("blob data tests", () => {
    it.skip("should return blob data", async () => {
      const _data = await fileContent(list);
      expect(_data).toMatchSnapshot();
    }, 10000);
});
