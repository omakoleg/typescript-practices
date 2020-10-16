# Utility Types

There are utility types provided by typescript which are useful for common use cases

## Partial

Allows to make all object properties "optional"

```ts
interface FullType {
  first: string;
  last: string;
}
const fullData: FullType = {
  first: "a",
  last: "b",
};
const partialData: Partial<FullType> = {
  last: "test",
};
console.log(partialData);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgGIFcA2mAqBPABxQG8AoZZGYKAZzAC5k6pQBzAbnOUzjsebacAvqQQB7EHUpZMAEThg4jDNnxFkAXmRkKVWg2QAiOIYA0XHnyMAjM6SGdxksMgJwoYYHDkKlyAArunt4APCq4hBAAfJraFrwGhpB0dg6iEjRimBAAdJhirAAUbh5ePooAlOxAA)

Commonly used for partial data merge functions

```ts
interface FullUserMerge {
  first: string;
  last: string;
  email: string;
  gender: string;
}
const fullUser: FullUserMerge = {
  first: "a",
  last: "b",
  email: "test-email",
  gender: "f",
};
const mergeDataIntoUser = (
  user: FullUserMerge,
  partialData: Partial<FullUserMerge>
): FullUserMerge => ({
  ...user,
  ...partialData,
});

const mergedData1 = mergeDataIntoUser(fullUser, { gender: "f" });
const mergedData2 = mergeDataIntoUser(fullUser, {
  email: "some-email",
  last: "x",
});
console.log(mergedData1);
console.log(mergedData2);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgGIFcA2mCqBnaAWWgHMUBvAKGWRmCjzAC5lGpQSBua5TORlmw7caEALZxgmQWHYguPMiAAm0GXIUBfSggD2IRrSy4CUFhmz4ipFAF5kVGnQbNkAIjhuANDz4D3AEbePOKS0u6QjAC0oVLBNEqqZu4wwZrcegZgyGI2ACJwYHAAkuC6VlDI9gAUPOim5sYVxFBkPjQADnBQYMBwmAVFLAAK3b39ADwWJtatEAB8lACUjZamLWRV88jVjsgAdIf10O0Hh109fQOFcD6aS9w6+oa5c8qDcACMVTn5N6VgcqmaowJqmLwOZCJNQpNzIe4ZZ7ZV5kd43ABMPxREA+AKB0BBYJODhCEikLDceF0uRiZMw8V4-FcbgAHmkHk8DLpMBB9phdCRqti0UVPhzMlSeXyBUKbCK4OiOUA)

## Required

Opposite of `Partial`, makes all properties required

```ts
interface MaybeSomeOptions {
  db?: string;
  apiUrl?: string;
  api: string; // this is not required, it will stay as is
}
type AllRequiredOptions = Required<MaybeSomeOptions>;
const allRequiredOptions: AllRequiredOptions = {
  db: "db-name", // required now
  apiUrl: "google.com", // required now
  api: "api-url", // required now
};
console.log(allRequiredOptions);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgLJwJ4CMIGUD2AthAPIAOYw+IAzsgN4BQyyAJlgPwBcyNYUoAOYBuZsjhlgAVSgAbbr35DRLCcB58BIEcgD0u5GAAWwOqeQh8YZFAgBHAK7BbrADTJg1gO7BZsxZjiZjSMAL6MYBhkKACCfgBK9k4u5JTUdAC8yImOzhCsADzo2HhEpBRUtAB8ogjp1nAJSXmsqZU0PHGyOcn5benIWUws7DwAROwAtCBwxGPu+jbNLhb4XmJqMrLjgvj4grIQAHR1hPN6Bra5K5brqpLjapMOcueLV72sq+uhten4hyOsn2AApGt1ln0KukAJSiIA)

## Record

Allows to build an object type using 2 types: one for key and second for value

```ts
type FixedMap = Record<"a" | "b", number>;
const fixedTypeInstance: FixedMap = {
  a: 1,
  b: 2,
  // c: 3,// ... and 'c' does not exist in type
};
```

These 2 definitions are equal:

```ts
type ObjectWithStringKeys = { [key: string]: any };
type RecordWithStringKeys = Record<string, any>;
```

This type is very useful when object shape is not fully known.

Commonly used as a type for json parsing results,
json should have keys as a `string` but contain many various "values"

```ts
const jsonData: Record<string, any> = JSON.parse(`{"nobody":"knows"}`);
```

Any type could be used to represent value

```ts
interface DynamoDbRecordType {
  userId: string;
  data: number;
}
const recordsByUserId: Record<string, DynamoDbRecordType> = {
  "1": {
    userId: "1",
    data: 100,
  },
  "2": {
    userId: "2",
    data: 200,
  },
};
console.log(recordsByUserId);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIE8RwLYHtUBGAShArlACYAq6ADigN4BQyyArgM7QCSFAXMg5gooAOYBuFsgpwwcASDbYC0SQF8mZEEORRS5ChwBC6AKpcovASTKUAPEJEhRAGjSYc+Yvso16APmQAXmRmVgAiAEZwgTDWdgsrZCjwlylWGTkBSIAGHLTWNQLkgCYY0PSEnn5S1MrM+WQSvOKipjVJLQ5cABsIADoe3FEACj1bQxNzaoBKSSA)

## Readonly

Set all properties of an object as `readonly`

```ts
interface DynamicInterface {
  a: string;
  b: number;
}
type ReadonlyInterface = Readonly<DynamicInterface>;
const readOnly: ReadonlyInterface = {
  a: "x",
  b: 1,
};
console.log(readOnly);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIE8RwLbAQSXGniWQG8AoZZOALmQGcwpQBzAbiuQCN6QBXbN2icAvhTDoADigBKEOABMA9iAA26QpFiIUAXmTylqjQB4MWXASI6kAPk4JVTZFAWKA8uvT0jK71rEusgGlNR0yABEAB6RADRcvMgAjAmijs7KahAAdGrKrAAUbkpeGgCU7EA)

readOnly.a = "xx"; // Cannot assign to 'a' because it is a read-only property.

## Pick

Constructs new type by "picking" properties from another type.

In practice not so often used.

```ts
interface FullBigType {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
}
type OneAndTwo = Pick<FullBigType, "one" | "two">;
const oneOrTwo: OneAndTwo = {
  one: 1,
  two: 2,
  // three  is not here
};
console.log(oneOrTwo);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/FASwdgLgpgTgZgQwMZQAQDECuAbbAhEAcwBUBPABzQG9hVUB7MKALlTEwFsAjWAbltQQA7vVbtufARAAWMKCzaceMfnTj1MMMUslqQANwXjl-AL7AIFNAHkmAQTAATYiNQBeVAAUQSANYAeLFwCEisAGlQAIkYoSNQAHyjhekiAPn4kRgBnCAYmaxgXUVRbKAdnVw8aOhjWAEYwqRFWACZGugB6DsFZeToQLLZ6XOlYKGBTDOz6bCgAOmx6QgAKGIKigEpeIA)

## Omit

Removes some properties from type definition

```ts
interface DatabaseUserSecret {
  userId: string;
  login: string;
  password: string;
  name: string;
}
type DatabaseUserPublic = Omit<DatabaseUserSecret, "login" | "password">;
const privateDbUser: DatabaseUserSecret = {
  userId: "1",
  login: "username",
  password: "secret",
  name: "My Name",
};
const publicDbUser: DatabaseUserPublic = {
  userId: "1",
  name: "My Name",
  // login: "username", // ...and 'login' does not exist in type
  // password: "secret", // ...and 'password' does not exist in type
};
console.log(privateDbUser);
console.log(publicDbUser);
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCJzHARnAzhAVXygGUIEoIxkBvAKGWQFdiBJAEwC5lcwpQA5gG4GyADYB7AaG69+IYaIAOeXAHcJULjz6CRjEHAC2EWboUiAvnTABPJSnSYc+ItAAKTLGOAJkAXmQAeSNgMAAeJ2w8QmIyCioAGmQAIklpEBTkAB9UlVx1TXYUgD4RBAkQXmQlfgA3DAhULDcobiiXWOh4ympA+kYWaA5uFIBGFMTRdJlUoahDE0nlVQ0tUfwEsGWDY1NUgFlbZAA5PeXLcsrqpS8fBGbW9oxo12JPb18A2lF5kdSJlNdiZRkdTucgcgAPRQ8RSWYpeaLCCTaGwgB0mLgIHYyAA5DMQHjkOwJBBcMgQBJqBAAB7AaqgZB2ByiGE1VZFDbkXqo9mY9HY3F4-KFLTE0nkynU5B0hnUJksiB0S50CpVCRiCDo9IAClqwAakEexAAlFcNVqdVJ9XdfCboOagA)

This type is useful for a cases when type of some properties should be changed

```ts
interface DynamodbItemPlain {
  recordId: string;
  createdAt: string;
  updatedAt: string;
  data: string;
}

interface DynamodbItemData {
  userId: string;
  name: string;
}
interface DynamodbItemParsed extends Omit<DynamodbItemPlain, "data"> {
  data: DynamodbItemData;
}
const plainDbItem: DynamodbItemPlain = {
  recordId: "record-id",
  createdAt: "2020-01-01",
  updatedAt: "2020-02-02",
  data: `{"userId":"user-id", "name":"User Name"}`,
};
const convert = (origin: DynamodbItemPlain): DynamodbItemParsed => ({
  ...origin,
  data: JSON.parse(origin.data),
});
const parsedDbData = convert(plainDbItem);
console.log(parsedDbData); // this will have data as `DynamodbItemData`
```

[open code in online editor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIE8RwLYHsAmARgJKTYAKANnKMgN4BQyyUECuU+x+AXMgM5gooAOYBuJsgSs4kfAEEwfQcJDjJAVwAO+WRAVKBQ0ROa6wcZcbUSAvgwahIsRCgxY8RUhGypZcek1+aG4rVXVmDwgwkwZ7J2h4JDRMHAISMnI4KGD8ZAgAD0gQfH5kAHlsYDAAHnc0r0zqUAAaZAAiczh2gD5As38+es8Mnz8LOwZ2EEFkLWaQVFHsIdSR7woF5ABefpY2Di5eDtZ2TgBaYHx2lslpCD0DPnaAJgAGd-O3gEYv75vNDpHopnu9Ph8vi8AQMLHwAAZ0doaYJQbjtHhIlGXa5tdpRdHtACqKOQADkcBB2rY4bdbBJprNpgA3aBgHbIAAUHGAIlAqw86Q2VBoIAAlPyGsssjl9Ds+hzGMwAHQq7m8kC3GGWZAAKQAyuVSUqtNlglzhOqlV1RbTRfTcDM2SaZfgluMArtmayOfMRUsNnapg7+LhKBAlZRcCIfab9G7-HbkAB6JPIMAAC2AZQA7sBKJRkOm4CzkF1kHAynDhoKyO64QwgA)

## Other types

Check more utility types at official [docs page](https://www.typescriptlang.org/docs/handbook/utility-types.html)

`Exclude`, `Extract`, `NonNullable`, `ReturnType` etc are not so often used
