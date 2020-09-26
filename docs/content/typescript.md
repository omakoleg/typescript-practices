# Typescript introduction

Official documentation <https://www.typescriptlang.org/docs/>

TypeScript stands in an unusual relationship to JavaScript.

TypeScript offers all of JavaScript’s features, and an additional layer on top of these: TypeScript’s type system.

# Usage

Typescript code could be transpiled (also used as "compiled") into javascript to be run in browser or server-side.

When transpiling into browser-compatible js it will include all polyfills required by targeted browsers.

Commonly used scenarios:

| Source Code | transpiled to javascript | Runtime                                           |
| ----------- | ------------------------ | ------------------------------------------------- |
| Typescript  | yes                      | Browser                                           |
| Typescript  | yes                      | [Node.js](https://nodejs.org/en/)                 |
| Typescript  | yes                      | [Chakra](https://github.com/microsoft/ChakraCore) |
| Typescript  | no                       | [Deno](https://deno.land/)                        |

## Installation

Typescript distributed as NPM package and could be installed by:

`yarn add -g typescript`

After this `tsc` will be available within project:

```sh
$ yarn tsc index.ts
```

By default it will produce `index.js` file in same directory

## Configuration

Typescript `tsc` could be configured using cli arguments ot using `tsconfig.json`.

Default configuration file can be generated any time:

```sh
$ yarn tsc --init
```

To use existing config file, use `-p` or `--project` cli arg

```sh
$ tsc -p tsconfig.json
```

Generated file will have multiple commented lines explaining most commonly used compiler flags:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

_Visit https://aka.ms/tsconfig.json to read more about this file_

Configuration file could extends another configuration file and override some properties:

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "skipLibCheck": false,
    "forceConsistentCasingInFileNames": true
  }
}
```

Relaxed options in `tsconfig.development.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "strict": false,
    "skipLibCheck": true
  }
}
```

Source files and ignored files can be also given explicitly:

```json
{
  "compilerOptions": {
    "target": "es5"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

Some most commonly used:

- `allowJs` allow to use `typescript` files together with `javascript`. It is very useful when doing migration of old js projects.
- `target` EcmaScript version of current typescript.
- `module` which modules system will have resulting files.
- `outDir` where to put generated javascript files, useful when required to separate artifacts from source code.
- `lib` specify global libraries to be used in code
- `skipLibCheck` do not check types in external libraries

And many [others](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

# Using compiler programmatically

This enables developers to use typescript compiler in non-standard way

`index.ts`

```ts
import * as ts from "typescript";

const source = "let x: string  = 'string'";

let result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
});

console.log(JSON.stringify(result));
```

Run it

```sh
$ yarn tsc index.ts && node index.js
```

Will output javascript code:

```json
{ "outputText": "var x = 'string';\n", "diagnostics": [] }
```

Read more [here](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
