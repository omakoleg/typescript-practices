# Using Promise

`Promise<T>` can be either `pending` or `fulfilled` or `rejected`. `fulfilled` and `rejected` are representing results.

Every promise should eventually be resolved or rejected

```ts
const promiseSample: Promise<number> = Promise.resolve(1);
```

Dummy result wrappers can be created directly

```ts
Promise.resolve(1);
Promise.reject(1);
```

Constructor

```
new <T>(executor: (
   resolve: (value?: T | PromiseLike<T>) => void,
   reject: (reason?: any) => void) => void
): Promise<T>;
```

```ts
new Promise<number>(
  (resolve: (data: number) => void, reject: (reason: any) => void) => {
    try {
      resolve(1 + 1);
    } catch (e) {
      reject(e);
    }
  }
);
```

Promise transforms callback approach into chaining of error or result handlers

```ts
import axios from "axios";
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then((response) => {
    // process response
    console.log(response);
  })
  .catch((error) => {
    // process error
    console.log(error);
  })
  .then(() => {
    // always executed
  });
```

Chain calls

```ts
Promise.resolve(1)
  .then((result) => result + 1)
  .then((result) => {
    console.log(result); // 2
    return result;
  })
  .then((result) => result + 1)
  .then((result) => {
    console.log(result); // 3
    return result;
  });
```

Catching errors in one place for all `then` cases

```ts
Promise.resolve(1)
  .then((result) => result + 1)
  .then((result) => result / 0)
  .then((result) => result * 1)
  .catch((error) => {
    console.error(error);
  });
```

Catching expected errors in the middle of the processing

```ts
Promise.resolve(1)
  .then((result) => result / 0)
  .catch((error) => {
    // catch division by zero
    console.error(error);
    // it will be Promise.resolve(0)
    // so `.then` chaining could be used again
    return 0;
  })
  .then((result) => result + 1)
  .then((result) => result * 1);
```

Chaining promise functions

```ts
interface UserShape {
  userId: number;
  name: string;
}
const loadUser = (userId: number): Promise<UserShape> =>
  Promise.resolve({
    userId: 1,
    name: "Some user",
  });

const capitalizeUser = (user: UserShape): Promise<UserShape> =>
  Promise.resolve({
    ...user,
    name: user.name.toUpperCase(),
  });

const logUser = (user: UserShape): Promise<UserShape> => {
  console.log(user);
  return Promise.resolve(user);
};

const sendUser = (user: UserShape): Promise<any> => axios.post("url", user);

loadUser(42)
  .then(capitalizeUser)
  .then(logUser)
  .then(sendUser)
  .catch(console.error);
```

Transforming callback function into Promise based

```ts
const plusOneCallback = (
  value: number,
  cb: (err: Error | undefined, result: number) => void
) => cb(undefined, value + 1);

const plusOnePromise = (value: number) =>
  new Promise((resolve, reject) => {
    plusOneCallback(value, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });

plusOnePromise(42).then(console.log);
```

## Promise helper functions

### Promise.all

Returns a single Promise that resolves to an array of the results of the input promises

> It rejects immediately upon any of the input promises rejecting

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = Promise.resolve(2);

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, 2]
});
```

Rejection in Promise.all()

```ts
const promise11 = Promise.resolve(3);
const promise22 = Promise.reject(42);
const promise33 = new Promise((resolve) => {
  setTimeout(() => resolve(100), 100);
});

Promise.all([promise11, promise22, promise33])
  .then((values) => {
    console.log(values);
  })
  .catch(console.error); // => 42
```

### Promise.allSettled

Method returns a promise that resolves after all of the given promises have either fulfilled or rejected,
with an array of objects that each describes the outcome of each promise.

> You usually want to use `.allSettled` instead of `.all`

```ts
function settledExample() {
  const promise100 = Promise.resolve(3);
  const promise200 = new Promise((resolve, reject) => {
    setTimeout(() => reject(100), 100);
  });
  Promise.allSettled([promise100, promise200]).then((results) => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 3 },
    //   { status: 'rejected', reason: 100 }
    // ]
    const finishedValues = results
      .filter((x) => x.status === "fulfilled")
      .map((x) => (x as PromiseFulfilledResult<number>).value);
    console.log(finishedValues); // [ 3 ]
  });
}
settledExample();
```

### Promise.race

Method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
with the value or reason from that promise.

```ts
function raceSample() {
  const apiCallSuccess = new Promise((res, rej) =>
    setTimeout(() => res("Done"), 100)
  );
  const apiCallFailure = new Promise((res, rej) =>
    setTimeout(() => rej("Error"), 100)
  );
  const timeoutPromise = (ms = 300) =>
    new Promise((res, rej) => setTimeout(rej, ms));

  const requestWithTimeout = <T>(request: Promise<T>, timeout = 300) =>
    Promise.race([timeoutPromise(timeout), request]);

  requestWithTimeout(apiCallSuccess).then(console.log);
  requestWithTimeout(apiCallFailure).catch(console.error);
}
raceSample();
```

# More info

Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
