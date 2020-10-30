# Async and arrays

## Sequential for

Use `for` for sequential async function execution

```ts
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
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBBCmBHArvMUCWBDANgQQgE8xgYBeGLIkmACgEpyA+GAbwCgYZRJYATLFCzkYAbQCsAGhgB2aQGZpARgAM0gCwqAugG52nbuGiUADhgDCuHCNoBbCAC4YYZLYBG8AE70nABU8gthgIADwu7l4sZEwGXGDwAO4w-oHB8LS0nvAQjNFssVyGkCA48AB0OCAA5rQABgC0LAAkrPYAvrX0eoWFCFAAKhi28CDIUBm5LBw9PTwQJeWVNbUh9TAt7Z3dM1xZEHYQMABUMKoqXQVcbdL2Fz1tFwZzsFTEwABK2SKiugYAZiBPHRnjAMDAQH8YAIhIxpoVXiRPhAyiZkBAABa0LAJLAYF5mSw4HC0DD0O4wNpPIwLCrVLHUD7ZC5tPQIFBoTC4AhvBg6IA)

Expected output:

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

## Parallel async map

Using `.map` for parallel async functions execution

> Remember: First rejection will throw an error in function without waiting for others to finish.

This behavior usually is what is expected: Fails as soon as any request fails.

```ts
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
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBADgQwE4IDaoKaoIIQJ5jACyCcMAvDAvoTABQCUFAfDAN4BQMMoksAJgigIKMANoBWADQwA7DIDMMgIwAGGQBZVAXQDcHLj3DQqcAJYBhNKlF0AthABcMMAFc7AIwxIGzgApIIHZmEBgAPG6e3qzkzIbcYBgA7jABQSEYdHRIGBBMsezx3EaQIJgAdKggAOZ0AAYAtKwAJGwOAL51DPrFxaFQACpmdhggrlBZ+aycvb28EGUYlTX1YQ0wrR1dPbPcORD2EDAAVDBqqt1F3O0yDpe97ZeG87DUBMAASrmiCEkIZrA0sFQuVrHQioJhOU7KQ6G9aHQzFNCrsclBXEgwFQ-gDTJYwUidtcGIZ7iUFhUqrV4Z9cpd2vpECh0FhcO8SHBGLogA)

Pay attention that `<-` are happening in parallel and returning in order (low to high).
But overall results array is built from corresponding results (not ordered)

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

## Async reduce

Using async function in reduce.

```ts
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
```

[open code in online editor](https://www.typescriptlang.org/play?#code/FAYw9gdgzgLgBFApgRwK6IjAlgQwDYAiOMOcAvHANoCsANHAIwAM9DdcAnO20wLoDcwYDigBPCCDgAzVBOyQEKdJlx4AgmIkAlRABNUIRAAoAlHADewOHHDR4OAA5YAwvjzk4RgLZQAXHAhULwAjRAAnE38ABTCwLywkAB5AkPCAPnI0q2sAxAB3OBi4hOMjMMQoMzIMyxyc2ygwPEQAOjwwAHMjAAMAWgyAEnMfAF9uk0E66yQYABUsL0QwVBgjU0yLbKmbSEbmts6exN64IdHxye24cqhvKDgAKkYmJgmtnJH6Hze6kbfshrwG6oPAwe4UHB5HBYeBINAYbD4IgkFrlfSGIzvETiSRGHAgEDRWLxJIpUJhSi8NL0ABu+H8ZPCVRq72sgOuFRBYI8kOh9gJlzqvJhcEcLjcRjpeB+U3KMFQYQgVBaKuBoKgtPwAnen3eRRJrRuTRpxkpJmyMoaTVa7S63R0UC59yGarBYzeI2AcOUiPUmhAOnRxgmQA)

Expected output:

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

Use `.map` and `.reduce` to apply async function over array elements in groups.

```ts
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
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBMAWBXMBrGBeGAKAlmADolAFwxiIC2ARgKYBOA2gLoA0cIysmAjAAwCUpctXrNmGAHwAoGDDyEoAOgA2NMAHMo8GBJi8ZsmAH4YDeUUURlOYDSy82oTvzaK3CZClwELVm3acwKBd2ZyYDWVJmAG4pKQBDCABPMGAYADNkYCgccBh8eLp45VVlAEFk1IAlGgATRFssfhgAbwNQSFha+Kh4jFMAVjY+YaGYACYHCbGAFimBqb5FydHF3imATk2x7gWmWPbwaBh4-BwAYWLlfqwKCCFKWjpBGAAFOhAKHAgaAB5hJ66dDSQxkGgAdzeHy+PywWDoNAgzWBrQihg6EBAqhUIHUWAABgBaXQAEhadwAvvj+LFQbIflAACo4Cg0DhQOHI3RtOnoo5Ymg4vH436EmBkynU2m8mAIiC3CAwABUMCWNLRsgpbDu6tBFPVh06MAop3OSFQiswWDRyhAwGKABEevEHiJGKw0cAqKRcK6nlyoZ9vn8AfQJCw0RAcAAvGj9AYGF7vIM-f6PURMIHcz1HWBUHoIRH9DyoLC2+3KJ29NhR2O6wwIqCIOhgGD5qCFiCKBH1RqJFJpLDxYDAUjJmEh9Pu8NtgvwP0ZgM8ukY2CFOj9eLg+I4Ncj6Wg1cwLTfABCc83293gYniiuWHbCEUJvwWC9-HroMbzdbDDcd7oOhXDcE8IHPDt4H2NEtRvYNu0RLEADc7GYD9pQpA5ZCPOVEGULgTivWAXzNTx5W6asTkqQdEOKRAaAXZ5JFRL8aCbFsCJ3NczkuEosBo5Q6PrfVpQxAUhSwFpZURXDYGEqQKSkAoihKGhyiompezsdUgA)

Expected output:

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
