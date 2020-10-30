/**
 * # Async and arrays
 *
 * ## Sequential for
 *
 * Use `for` for sequential async function execution
 */
// @playground-link
const sequentialAsync = async () => {
  const data = [5, 7, 3, 10, 40];

  const apiCall = (ms: number): Promise<number> =>
    new Promise((res) => {
      console.log(`-> ${ms}`);
      setTimeout(() => {
        console.log(`<- ${ms}`);
        res(ms * 100);
      }, ms);
    });

  const asyncRes = [];
  for (const i of data) {
    asyncRes.push(await apiCall(i));
  }
  console.log(asyncRes);
};
sequentialAsync();
/**
 * Expected output:
 ```
 -> 5
<- 5
-> 7
<- 7
-> 3
<- 3
-> 10
<- 10
-> 40
<- 40
[ 500, 700, 300, 1000, 4000 ]
```
 */
/**
 * ## Parallel async map
 *
 * Using `.map` for parallel async functions execution
 *
 * > Remember: First rejection will throw an error in function without waiting for others to finish.
 *
 * This behavior usually is what is expected: Fails as soon as any request fails.
 */
// @playground-link
const parallelAsyncMap = async () => {
  const data = [5, 7, 3, 10, 40];

  const apiCall = (ms: number): Promise<number> =>
    new Promise((res) => {
      console.log(`-> ${ms}`);
      setTimeout(() => {
        console.log(`<- ${ms}`);
        res(ms * 100);
      }, ms);
    });

  const asyncRes = await Promise.all(
    data.map(async (i) => {
      return await apiCall(i);
    })
  );
  console.log(asyncRes);
};
parallelAsyncMap();
/**
 * Pay attention that `<-` are happening in parallel and returning in order (low to high). 
 * But overall results array is built from corresponding results (not ordered)
```
-> 5
-> 7
-> 3
-> 10
-> 40
<- 3
<- 5
<- 7
<- 10
<- 40
[ 500, 700, 300, 1000, 4000 ]
```
 */

/**
 * ## Async reduce
 *
 * Using async function in reduce.
 */
// @playground-link
const sequentialData = [5, 10, 15, 95, 150];

async function sequentialAsyncReduce() {
  const apiCall = (ms: number): Promise<number> =>
    new Promise((res) => {
      console.log(`-> ${ms}`);
      setTimeout(() => {
        console.log(`<- ${ms}`);
        res(ms * 100);
      }, ms);
    });

  const results = await sequentialData.reduce(
    async (acc: Promise<number[]>, val: number) => {
      const results = await acc;
      await apiCall(val);
      return [...results, val];
    },
    Promise.resolve([])
  );
  console.log(`Results ${results}`);
}
sequentialAsyncReduce();
/**
* Expected output:
```
-> 5
<- 5
-> 10
<- 10
-> 15
<- 15
-> 95
<- 95
-> 150
<- 150
Results 5,10,15,95,150 
```
 */
/**
 * Use `.map` and `.reduce` to apply async function over array elements in groups.
 */
// @playground-link
const chunk = (input: number[], count = 10): number[][] =>
  input.length > 0
    ? [input.slice(0, count), ...chunk(input.slice(count), count)]
    : [];

async function parallelAsyncReduce() {
  const data = [5, 10, 15, 20, 25, 40, 50, 100, 120, 150, 100, 90, 95, 150];

  const apiCall = (ms: number): Promise<number> =>
    new Promise((res) => {
      console.log(`-> ${ms}`);
      setTimeout(() => {
        console.log(`<- ${ms}`);
        res(ms * 100);
      }, ms);
    });

  const mapChunks = (
    localData: number[],
    cb: (i: number) => Promise<number>,
    size = 5
  ): Promise<number[]> => {
    const batches = chunk(localData, size);
    return batches.reduce(async (acc: Promise<number[]>, batch: number[]) => {
      const arr = await acc;
      const thisBatch = await Promise.all(batch.map(cb));
      return [...arr, ...thisBatch];
    }, Promise.resolve([]));
  };

  const result = await mapChunks(data, async (value: number) => {
    return await apiCall(value);
  });
  console.log({ result });
}
parallelAsyncReduce();

/**
 * Expected output:
```
-> 5
-> 10
-> 15
-> 20
-> 25
<- 5
<- 10
<- 15
<- 20
<- 25

-> 40
-> 50
-> 100
-> 120
-> 150
<- 40
<- 50
<- 100
<- 120
<- 150

-> 100
-> 90
-> 95
-> 150
<- 90
<- 95
<- 100
<- 150
{
  result: [
      500,  1000,  1500,
     2000,  2500,  4000,
     5000, 10000, 12000,
    15000, 10000,  9000,
     9500, 15000
  ]
}
```
 */
