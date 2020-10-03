# Async

The next iteration on async processing improvement.

Functions are defined as `async` and executed with `await`

```ts
const makeApiRequest = async (id: number): Promise<number> =>
  Promise.resolve(id);

async function asyncExecution(): Promise<any> {
  const first = await makeApiRequest(1);
  const second = await makeApiRequest(2);
  const third = await makeApiRequest(3);
  console.log(first + second + third);
}
asyncExecution();
```

In Node.js async functions called in main scope and "awaited" by runtime

`await` could be used with `async` function, function returning `Promise` or literal.

> Generally `await` for literals should not be used !

This introduces errors and could be checked by `await-thenable` rule in `eslint-typescript`

Here is classical issue when working with `aws-sdk`:

```ts
import { DynamoDB } from "aws-sdk";
const dynamo = new DynamoDB();

const saveRecord = (data: any) =>
  dynamo.putItem({
    TableName: "xx",
    Item: data,
  });

async function criticalBug() {
  const data = {};
  await saveRecord(data);
  console.log(`Item saved`);
  // Actually it was not yet saved
  // await waited for callback function.
}
criticalBug();
```

Correctly will be to await for Promise:

```ts
const saveRecordCorrect = (data: any): Promise<DynamoDB.Types.PutItemOutput> =>
  dynamo
    .putItem({
      TableName: "xx",
      Item: data,
    })
    .promise();
```

Will be also useful to enable `eslint` rule to require return types on functions: `@typescript-eslint/explicit-function-return-type`

This will require to specify `Promise<DynamoDB.Types.PutItemOutput>` as return type explicitly and
potentially error will not happen

## Async errors handling

Errors are captured with try-catch or propagated into surrounding scope.
This way wrapping code will catch all errors thrown within this code.

Important to remember: Error will be thrown at a context where `await` is used.

This is very common misconception

```ts
const makeApiRequestRejection = async (): Promise<number> =>
  Promise.reject(1000);

async function function1(): Promise<number> {
  try {
    return await makeApiRequestRejection();
  } catch (e: unknown) {
    console.error(`Api error in function1`);
    throw e;
  }
}

async function function2(): Promise<number> {
  try {
    return await function1();
  } catch (e: unknown) {
    console.error(`Api error in function2`);
    throw e;
  }
}
function2();
```

Error will have a way thru all layers:

- "Api error in function1"
- "Api error in function2"
- "(node:88361) UnhandledPromiseRejectionWarning: 1000" ...

```ts
async function updatedFunction1(): Promise<number> {
  try {
    return makeApiRequestRejection();
  } catch (e: unknown) {
    console.error(`Api error in function1`);
    throw e;
  }
}
async function updatedFunction2(): Promise<number> {
  try {
    return await updatedFunction1();
  } catch (e: unknown) {
    console.error(`Api error in function2`);
    throw e;
  }
}
updatedFunction2();
```

Here `updatedFunction1` returns function result without `await`

Error will first appear only in surrounding block

- "Api error in function2"
- "(node:88361) UnhandledPromiseRejectionWarning: 1000" ...

Try-catch in `updatedFunction1` will not be used to handle error

### Sequential await

```ts
async function sequenceSample() {
  const getItem = async (id: number) => Promise.resolve(id * 100);

  const ids = [1, 2, 3, 5, 7, 34, 3, 645, 23, 345];
  const results = [];

  for (const id of ids) {
    // execute requests one by one
    const result = await getItem(id);
    results.push(result);
  }
  return results;
}
sequenceSample();
```

### Parallel await

`Promise.all` could be used to achieve this.

```ts
const ids1 = [1, 2, 3, 5, 7, 34, 3, 645, 23, 345];
const getItem1 = async (id: number) => Promise.resolve(id * 100);

async function parallelSample() {
  const runningRequests: Promise<number>[] = ids1.map((x) => getItem1(x));
  const results: number[] = await Promise.all(runningRequests);
  return results;
}
parallelSample();
```

Remember: First rejection will throw an error in function without waiting for others to finish.

```ts
const ids2 = [1, 2, 3, 5, 7, 34, 3, 645, 23, 345];
const getItem2 = async (id: number) =>
  new Promise<number>((res, rej) => {
    setTimeout(() => {
      if (id === 3) {
        rej("Bam");
      } else {
        console.log(id);
        res(id * 100);
      }
    }, id);
  });

async function parallelSampleVisualizeIssue() {
  const results: number[] = await Promise.all(ids2.map((x) => getItem2(x)));
  console.log(results);
}
parallelSampleVisualizeIssue();
```

This will print:

```
1
2
(node:91215) UnhandledPromiseRejectionWarning: Bam
5
...
645
```

This behavior usually is what is expected: Fails as soon as any request fails.
Outside function maybe will retry all again

For the cases when others should be still finished, use `Promise.allSettled`

```ts
const ids3 = [1, 2, 3, 5, 7, 34, 3, 645, 23, 345];

const getItem3 = async (id: number) =>
  new Promise<number>((res, rej) => {
    setTimeout(() => {
      if (id === 3) {
        rej("Bam");
      } else {
        console.log(id);
        res(id * 100);
      }
    }, id);
  });

async function waitAllToFinishIgnoringFailed() {
  const maybeResults: PromiseSettledResult<number>[] = await Promise.allSettled(
    ids3.map((x) => getItem3(x))
  );
  const results = maybeResults
    .filter((x) => x.status === "fulfilled")
    .map((x) => (x as PromiseFulfilledResult<number>).value);
  console.log(results);
}
waitAllToFinishIgnoringFailed();
```

```txt
1
2
...
645
[
   1500,  100,   200,
    500,  700,  3400,
  64500, 2300, 34500
]

There is no `3` in results, or even `Bam`. `Bam` was filtered out by `x.status === "fulfilled"`
```
