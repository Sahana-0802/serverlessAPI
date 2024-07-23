const { postService } = require("../../service/postService");
const { postHandler } = require("../postHandler.js");

//no real time API call, just mocking/fake call
jest.mock("../../service/postService");

//grouping useCases - describe, holds all the sub-blocks
describe("#postHandler", () => {
  //gets executed after each and every testCase
  afterEach(() => {
    // console.log("afterEach");
    jest.clearAllMocks();
  });
  //before each and every testCase/it block
  beforeEach(() => {
    // console.log("beforeEach");
    postService.mockResolvedValue("some-value"); //promise resolved/rejected, resolving the promise and sending 'some-value' as data
    // postService.mockReturnValue('some-value'); //if it's not a promise
  });
  //only once after all testCases
  afterAll(() => {
    // console.log("afterall");
  });
  //
  beforeAll(() => {
    // console.log("beforeAll");
  });

  // it- holds individual testCases, 1st arg-text/desc, 2nd arg-callback function
  it("should call postService", async () => {
    await postHandler();

    expect(postService).toHaveBeenCalled();
  });

  it("should call postService only once", async () => {
    await postHandler();

    expect(postService).toHaveBeenCalledTimes(1);
  });

  it("should return valid values", async () => {
    const result = await postHandler();

    expect(result).toEqual({
      status: 200,
      body: JSON.stringify("some-value"),
    });
  });

  describe("when postService call fails", () => {
    beforeEach(() => {
      console.log("before each inside failure call block");
      postService.mockRejectedValue("some-error-value");
    });

    it("should throw error", async () => {
      try {
        await postHandler();
      } catch (error) {
        expect(error).toEqual("some-error-value");
      }
    });
  });
});
