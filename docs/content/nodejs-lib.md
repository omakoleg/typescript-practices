# Node.js modules

Node.js contains a lot of modules allowing ot perform most of required functions to work
with filesystem, http, processes etc.

Most of them provide basic functionality and it is more common nowadays to use
special solutions to solve these tasks.

As an example it is rarely used `http` (`https`) to make API requests, but rather `axios`
which provide more nice options and packed with additional functionality

You could install all Node.js modules type definitions:

```sh
yarn add @types/node -D
```

Some popular modules:

- `fs` module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.

- `crypto` provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

- `Buffer` objects are used to represent binary data in the form of a sequence of bytes

- `globals` objects which are available in all modules: `__dirname`, `__filename`, `require`, `console`

- `cluster` allows easy creation of child processes that all share server ports.

- `process` provides information about, and control over, the current Node.js process

- `url` provides utilities for URL resolution and parsing.

And much more <https://nodejs.org/docs/latest-v13.x/api/>

```ts
import { unlinkSync } from "fs";

try {
  unlinkSync("/tmp/hello");
  console.log("successfully deleted /tmp/hello");
} catch (err) {
  // handle the error
}
```

Hint: `Cannot find module 'fs' or its corresponding type declarations.` error happening when no `@types/node` is installed

## fs

Recommended filesystem access pattern:

```ts
import { promises: fs } from "fs";
const contents = await fs.readFile(name);
```

No need to use `callback` or manual `Promise` wrapping
