# Async

The next iteration on async processing improvement.

Functions are defined as `async` and executed with `await`.

When `Promise` is awaited, resolver value will be returned and rejected thrown.

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

# Key takeaways

- Use `try-catch` if `await`-ed value can throw errors.
- Do not `await` for literal values, only thenable.
- Always explicitly provide returned type in async function definition
