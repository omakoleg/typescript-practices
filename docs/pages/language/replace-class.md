# Use interface instead of class

`class` definition can be replaced by function returning required object interface instance `DbAdapter`.
This is more popular approach compared to define new `class` and using `new`

> Always try to use functional style !

Sample database adapter with few methods and single property

```ts
interface DbAdapter {
  databaseName: string;
  put: (item: string) => void;
  get: (id: string) => string | undefined;
}
```

Could be created inside of `buildDatabaseAdapter` which receive "constructor" parameter `databaseName`
Both functions `get` and `put` are exposed by interface definition as public.

Within function you could define any other scoped functions, they will remain private.

This approach also useful because `this` is not used and all problems related to it disappear.

```ts
const buildDatabaseAdapter = (databaseName: string): DbAdapter => {
  const realDatabaseConnector = {} as any;

  // private
  const _getData = (id: string) => realDatabaseConnector.get(id);

  // exposed via return, it is public
  function get(id: string) {
    return _getData(id);
  }
  function put(item: string) {
    // no `this` required here
    return realDatabaseConnector.put(item);
  }

  return {
    databaseName,
    put,
    get,
  };
};
const myDbAdapter: DbAdapter = buildDatabaseAdapter("sample");
```
