import "jest";
import getFilesContent from "../../src/lib/github/getFilesContent";

const list = [{
  name: "readme.md",
  downloadUrl: "https://github.com/",
  htmlUrl: "https://github.com/"
}];

describe("blob data tests", () => {
    it.skip("should return blob data", async () => {
      const data = await getFilesContent(list);
      expect(data).toMatchSnapshot();
    }, 10000);
});
