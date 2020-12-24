import { DynamoDB } from "aws-sdk";
describe("async-await", () => {
  it("1. Await function", async () => {
    const makeApiRequest = async (id: number): Promise<number> =>
      Promise.resolve(id + 1);
    // TODO: Async function should be `await`ed
    const result = makeApiRequest(1);
    expect(result).toBe(2);
  });

  it("2. Async rejection", async () => {
    const makeApiRequest = async (id: number): Promise<number> =>
      Promise.reject(id);
    const hasError = false;
    // TODO: Use try-catch to catch an error and set hasError = true
    await makeApiRequest(1);
    expect(hasError).toBe(true);
  });

  it("3. Common mistake with aws-sdk", async () => {
    const dynamo: DynamoDB = ({
      putItem: (_p: DynamoDB.Types.PutItemInput) => ({
        promise: () => ({
          ConsumedCapacity: 10,
        }),
      }),
    } as unknown) as DynamoDB;
    // TODO: Fix known error in `brokenSaveRecord`
    // When using AWS CDK await for the promise always
    const brokenSaveRecord = (data: any) =>
      dynamo.putItem({
        TableName: "xx",
        Item: data,
      });
    const result = await brokenSaveRecord({ a: 1 });
    expect((result as any).ConsumedCapacity).toBe(10);
  });

  it("4. Catch error within function and handle fallback", async () => {
    // TODO: Fix function to catch rejection and return 10
    async function function1(): Promise<number> {
      try {
        return Promise.reject(new Error("function1 error"));
      } catch (e: unknown) {
        return 10;
      }
    }

    async function function2(): Promise<number> {
      try {
        return await function1();
      } catch (e: unknown) {
        return 20;
      }
    }
    expect(await function2()).toBe(10);
  });
});
