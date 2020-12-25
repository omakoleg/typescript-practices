describe("array-async", () => {
  const apiCall = (ms: number): Promise<number> =>
    new Promise((res) => {
      setTimeout(() => {
        res(ms * 100);
      }, ms);
    });

  it("sequential requests", async () => {
    const data = [10, 2, 30];
    const accumulator: number[] = [];
    // TODO: Use for-of to sequentially iterate over `data` and accumulate results in `accumulator`
    // of calling `apiCall` for each `data` element
    expect(accumulator).toEqual([10_000, 2_000, 30_000]);
  });

  it("parallel requests", async () => {
    const data = [10, 5, 20];
    // TODO: Update next line to wait for all Promises to resolve
    const asyncRes = data.map((i) => apiCall(i));
    expect(asyncRes).toEqual([5_000, 10_000, 20_000]);
  });
});
