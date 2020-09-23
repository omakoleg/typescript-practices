# Utility Types

There are utility types provided by typescript which are useful for common use cases

## Partial

Allows to make all object properties "optional"

```ts
interface FullUser {
  first: string;
  last: string;
  email: string;
  gender: string;
}
const fullUser: FullUser = {
  first: "a",
  last: "b",
  email: "email",
  gender: "?",
};
const partialUser: Partial<FullUser> = {
  email: "test-email",
};
```

Commonly used for partial data merge functions

```ts
const mergeDataIntoUser = (
  user: FullUser,
  partialData: Partial<FullUser>
): FullUser => ({
  ...user,
  ...partialData,
});

mergeDataIntoUser(fullUser, { gender: "f" });
mergeDataIntoUser(fullUser, { email: "some-email", last: "x" });
```

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
```

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

This 2 definitions are equal:

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
```

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
```

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
```

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
```

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

## Other types

Check more utility types at official [docs page](https://www.typescriptlang.org/docs/handbook/utility-types.html)

`Exclude`, `Extract`, `NonNullable`, `ReturnType` etc are not so often used
