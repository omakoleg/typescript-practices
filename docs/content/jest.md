# Jest

Jest is a delightful JavaScript Testing Framework with a focus on simplicity

```sh
yarn add --dev jest @types/jest ts-jest
```

Installs jest, types and wiring with typescript

Sample:

```ts
export const sum = (a: number, b: number): number => a + b;
//
import { sum } from "./sum";
// `test`
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
// `it`
it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Using `describe` to group tests

```ts
describe(".asyncSum", () => {
  describe("success cases", () => {
    it("works with dummy payload", () => {});
    it("works with broken data", () => {});
  });
});
```

Using `async` in tests

```ts
export const asyncSum = (a: number, b: number): Promise<number> =>
  Promise.resolve(a + b);

it("works with async", async () => {
  const result = await asyncSum(1, 2);
  expect(result).toBe(3);
});
```

_no need to put `async` in `describe` sections_

Using `callbacks` in tests

```ts
test("the data is peanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
```

Using `Promise` in tests

> Better to use `async` approach and `await` for promise result and check it outside ot `.then`

```ts
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

Running only some tests out of all in a file:

`my-test.test.ts`

```ts
describe(".asyncSum", () => {
  it("works with dummy payload", () => {});
  it("works with broken data", () => {});
  it.only("need to verify this", () => {});
  it.only("and this", () => {});
  it("skipped as well", () => {});
});
```

Execute only one file tests. And only `.only` tests will be running, all others will be skipped

```sh
jest -i my-test.test.ts
```

Using generated tests

```ts
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

Before and After

```ts
beforeAll(() => {});
afterAll(() => {});
describe("scoped setups", () => {
  beforeAll(() => {});
  afterAll(() => {});
});
// per test
beforeEach(() => {});
afterEach(() => {});
```

Using `async` is fine also:

```ts
afterAll(async () => {
  await cleanupDatabase();
  console.log("Database is removed");
});
```

## configuration

Config file name `jest.config.js`, or any other passed in cli with `--config`.

Configuration can also be provided in `package.json`

```json
{
  "jest": {
    "preset": "...",
    "globals": {
      "ts-jest": {
        "tsConfig": "tsconfig.json"
      }
    }
  }
}
```

There are many possible configurations <https://jestjs.io/docs/en/configuration>

## expectations

There are many ways to match result with expected value <https://jestjs.io/docs/en/expect>

Most commonly used

```ts
test("dummy test", () => {
  // Comparing sample values like number, boolean, string
  expect(1).toBe(1);
  // `not` cases available in any expectation
  expect(1).not.toBe(2);
  // Comparing array length
  expect([1, 2, 3]).toHaveLength(3);
  // Something is defined
  const value: number | undefined = 1;
  expect(value).toBeDefined();
  // opposite to defined
  expect(value).not.toBeUndefined();
  // Deep comparing
  const object = {
    a: 10,
    b: [1, 2, 3],
  };
  expect(object).toEqual(object);
  // regex
  expect("car").toMatch(/.*/);
  // throws
  expect(() => {
    throw new Error(`Bam!`);
  }).toThrow();
});
```

## mocks

It is useful to mock modules and provide dummy expected implementations without external network communications

Topic itself is complex and I will recommend to read docs:

- mock functions <https://jestjs.io/docs/en/mock-functions>
- mock classes <https://jestjs.io/docs/en/es6-class-mocks>
- mock with separate module files <https://jestjs.io/docs/en/manual-mocks>

`jest.fn` function mock

```ts
const mockCallback = jest.fn((x) => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);
```

Mock returned values

```ts
const myMock = jest.fn();

myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
```

Mocking module fully

```ts
import * as uuid from "uuid";

jest.mock("uuid", () => ({
  v4: () => "some-uuid",
}));

uuid.v4(); // => some-uuid
```

Capture some values by mock function

```ts
import { sendDistributionMetric } from "datadog-lambda-js";
const metrics: any[] = [];

jest.mock("datadog-lambda-js", () => ({
  sendDistributionMetric: (...args: any) => {
    metrics.push(args);
  },
}));
sendDistributionMetric("my-metric", 1);

expect(metrics).toEqual([["my-metric", 1]]);
```

Checking mocks been called

```ts
import { trackRecordPushed, trackRecordRejected } from "./metrics";

jest.mock("./metrics", () => ({
  trackRecordPushed: jest.fn(),
  trackRecordRejected: jest.fn(),
}));

const trackRecordPushedMocked = trackRecordPushed as jest.Mock;
const trackRecordRejectedMock = trackRecordRejected as jest.Mock;
// Call some code internally including "./metrics" and calling `trackRecordPushed`
// Verify:
expect(trackRecordPushed).toHaveBeenCalledWith(3); // check arguments also
```

## jest-dynamodb

Jest has excellent plugin to setup test `DynamoDB` within tests

<https://jestjs.io/docs/en/dynamodb>

```sh
yarn add @shelf/jest-dynamodb --dev
```

Use as `preset` (`package.json/jest`)

```json
{
  "preset": "@shelf/jest-dynamodb"
}
```

Or provision manually (`package.json/jest`)

```json
{
  "globalSetup": "@shelf/jest-dynamodb/setup.js",
  "globalTeardown": "@shelf/jest-dynamodb/teardown.js",
  "testEnvironment": "@shelf/jest-dynamodb/environment.js"
}
```

Describe databases in `jest-dynamodb-config.js`:

```js
module.exports = {
  tables: [
    {
      TableName: `files`,
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    },
  ],
};
```

In tests create client connected to test database:

```ts
import { DynamoDB } from "aws-sdk";
const config = {
  convertEmptyValues: true,
  endpoint: "localhost:8000",
  sslEnabled: false,
  region: "local-env",
};

const docClient = new DynamoDB.DocumentClient(config);
```
