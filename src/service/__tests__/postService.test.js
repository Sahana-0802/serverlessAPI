const { postService } = require("../../service/postService");
const mockAxios = require("axios");

jest.mock("../../service/postService");
jest.mock("axios");

describe("#postService", () => {
  afterEach(() => {
    // console.log("afterEach block");
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // console.log("beforeEach block");
    // postService.mockResolvedValue("some-value");
    mockAxios.get.mockResolvedValue({ data: "some-link" });
  });

  afterAll(() => {
    // console.log("afterAll block");
  });

  afterEach(() => {
    // console.log("beforeEach block");
  });

  it("should call postService", async () => {
    await postService();

    expect(postService).toHaveBeenCalled();
  });

  it("should call postService only once", async () => {
    await postService();

    expect(postService).toHaveBeenCalledTimes(1);
  });

  it("makes axios get call to the API", async () => {
    // const res = await postService();
    // console.log(res);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it("returns proper response", async () => {
    const res = await postService();
    // console.log(res);
    expect(res).toEqual("some-link");
  });

  describe("#postService call fails", () => {
    beforeEach(() => {
      postService.mockRejectedValue("some-error-value");
    });
    it("returns error value", async () => {
      try {
        await postService();
      } catch (error) {
        expect(error).toEqual("some-error-value");
      }
    });
  });
});
