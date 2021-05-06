# Iterate array items

## For-of

Iterate over "values" in the given array

```ts
const array1 = ["one", "two", "three"];
for (let entry of array1) {
  console.log(entry);
  // "one"
  // "two"
  // "three"
}
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAhgJwXAngRhgXhgbQETgCmeANDHlAO4inlQAWChxAugNwBQAZiAjABQAbQrEJgoCFDBBd4SVGgCUMAN4cYMUJBDCAdIJABzfmIkpFnDQHor5InnUwbdag+u2KjZg4C+QA)

## For-in

Iterate over "keys" in the given array

```ts
const array2 = ["one", "two", "three"];
for (let entry in array2) {
  console.log(entry, typeof entry);
  // "0" "string"
  // "1" "string"
  // "2" "string"
}
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAhgJwXAngJhgXhgbQETgCmeANDHlAO4inlQAWChxAugNwBQAZiAjABQAbQrEJgoCFDACWYeElRoAlDADeHGDFCQQwgHSCQAc35iJKMlBQAHQiC4wzkpZ00B6N+QAMectASyRngaMB7kAIy+eP6Bwe6eeGhRMWBBHAC+QA)

## Iterate key-value

The `.entries()` method returns a new Array Iterator object that contains the key/value pairs for each index in the array.

```ts
const array3 = ["one", "two", "three"];
for (let [key, value] of array3.entries()) {
  console.log(key, value, typeof key, typeof value);
  // 0,  "one",  "number",  "string"
  // 1,  "two",  "number",  "string"
  // 2,  "three",  "number",  "string"
}
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAhgJwXAngZhgXhgbQETgCmeANDHlAO4inlQAWChxAugNwBQAZiAjABQAbQrBwBrQijIA3OIICuhFjBBd4SVGgB0hMFAQBLQhH4BKUzADeHGDFCQQwrYJABzfhKkxZCwmSgoAA6EqjCe-kEhaj6Kppy2APQJMAAMZOREtORg8gC2AEaECFl40IZgrng2MEkwAIzpFNQlOQVFJWUGFVWJyQBMjQxMxI2thcWNnd0cAL5AA)

# Objects

## For-of

To have the same approach as for an array, use `Object.values()`

```ts
const obj1 = { one: 10, two: 20, three: 30 };
for (let k of Object.values(obj1)) {
  console.log(k);
  // 10
  // 20
  // 30
}
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBCBGArAjDAvDA3nMBTAXDMgAwA0MUA7iIQExkUAWATrgTAMzEwC+A3ACgAZiGYwAFABtcsANZwhMAPJJcwKADoAbgENJAV1wRxCFAEozWATBihIIaRskgA5uNlnBNgPTeixaxhfGHpA4K4BHiA)

## For-in

Same as for arrays, iterate over keys

```ts
const obj2 = { one: 10, two: 20, three: 30 };
for (let v in obj2) {
  console.log(v);
  // "one"
  // "two"
  // "three"
}
```

Can be used `Object.keys()` to transform obejct keys into the array and later can be iterated with `for-of`

## Iterate key-value

Objects dont have function `entries`, but it is available via: `Object.entries(<object>)`

```ts
const obj3 = { one: 10, two: 20, three: 30 };
for (let [k, v] of Object.entries(obj3)) {
  console.log(k, v, typeof k, typeof v);
  // "one", 10,  "number",  "string"
  // "two", 20,  "number",  "string"
  // "three", 30,  "number",  "string"
}
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYewdgzgLgBCBGArAzDAvDA3nMBTAXDAIwAMANDFAO4iEBM5lAFgE64EzIkwC+A3ACgAZiBYwAFABtcsANoBrCgDcAunCEwA8klzAoAOlxgoLAJa4I4hCgCUNrAJgxQkENP2SQAc3GKYSiigATwAHXBANP2CwiP8bQScAekSYACJwXFSKUgo0sABXAFt4XBYsp1ToMzAvVMcYZLTqEHKGXNSC4tLytKrTGrqklNSoVnZyrnbOkrL2voGBHgEgA)
