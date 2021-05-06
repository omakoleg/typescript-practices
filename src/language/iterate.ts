/**
 * # Iterate array items
 *
 * ## For-of
 *
 * Iterate over "values" in the given array
 */
// @playground-link
const array1 = ["one", "two", "three"];
for (let entry of array1) {
  console.log(entry);
  // "one"
  // "two"
  // "three"
}
/**
 * ## For-in
 *
 * Iterate over "keys" in the given array
 */
// @playground-link
const array2 = ["one", "two", "three"];
for (let entry in array2) {
  console.log(entry, typeof entry);
  // "0" "string"
  // "1" "string"
  // "2" "string"
}
/**
 * ## Iterate key-value
 *
 * The `.entries()` method returns a new Array Iterator object that contains the key/value pairs for each index in the array.
 */
// @playground-link
const array3 = ["one", "two", "three"];
for (let [key, value] of array3.entries()) {
  console.log(key, value, typeof key, typeof value);
  // 0,  "one",  "number",  "string"
  // 1,  "two",  "number",  "string"
  // 2,  "three",  "number",  "string"
}
/**
 * # Objects
 *
 * ## For-of
 *
 * To have the same approach as for an array, use `Object.values()` to iterate over values
 */
// @playground-link
const obj1 = { one: 10, two: 20, three: 30 };
for (let v of Object.values(obj1)) {
  console.log(v);
  // 10
  // 20
  // 30
}
/**
 * ## For-in
 *
 * Same as for arrays, iterate over keys
 */
const obj2 = { one: 10, two: 20, three: 30 };
for (let k in obj2) {
  console.log(k);
  // "one"
  // "two"
  // "three"
}
/**
 * Can be used `Object.keys()` to transform obejct keys into the array and later can be iterated with `for-of`
 *
 * ## Iterate key-value
 *
 * Objects dont have function `entries`, but it is available via: `Object.entries(<object>)`
 */
// @playground-link
const obj3 = { one: 10, two: 20, three: 30 };
for (let [k, v] of Object.entries(obj3)) {
  console.log(k, v, typeof k, typeof v);
  // "one", 10,  "number",  "string"
  // "two", 20,  "number",  "string"
  // "three", 30,  "number",  "string"
}
