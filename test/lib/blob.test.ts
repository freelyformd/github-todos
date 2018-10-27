import "jest";
import getFilesBlob from "../../src/lib/github/getFilesBlob";

const list = [{
  name: "readme.md",
  downloadUrl: "https://github.com/",
  htmlUrl: "https://github.com/"
}];

describe("blob data tests", () => {
    it.skip("should return blob data", async () => {
      const data = await getFilesBlob(list);
      expect(data).toMatchSnapshot();
    }, 10000);
});
