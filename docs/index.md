## Typescript Practices

### Typescript Introduction

|                                                             | Includes                                           |
| ----------------------------------------------------------- | -------------------------------------------------- |
| [Typescript Introduction](./content/typescript.md)          | Typescript, tsc, `tsconfig.json`, programmatic use |
| [Project structure and package tools](./content/project.md) | npm, yarn, `package.json`, DefinitelyTyped         |
| [Linting And Formatting](./content/lint-format.md)          | `eslint`, `prettier`, `@typescript-eslint`         |

### Typescript Language

|     |                                                                          | Includes                                                                  |
| --- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| \*  | [Variables](./pages/language/variables.md)                               | let, const, scoping                                                       |
| \*  | [Basic types](./pages/language/basic-types.md)                           | common types                                                              |
| \*  | [Type & interface](./pages/language/type-interface.md)                   | definition, recursive, combining                                          |
| \*  | [Destructuring and spread](./pages/language/destructuring-and-spread.md) | for: tuples, array, objects                                               |
| \*  | [Function](./pages/language/function.md)                                 | type definitions for regular, async , curried functions. `this` capturing |
|     | [Modules](./content/modules.md)                                          | import, export, default export                                            |
| \*  | [Callbacks](./pages/language/callbacks.md)                               | usage, maintenance complexity                                             |
| \*  | [Promise](./pages/language/promise.md)                                   | chaining, error handling, parallel processing                             |
| \*  | [async/await](./pages/language/async-await.md)                           | error handling, parallel and sequential processing                        |
| \*  | [Classes](./pages/language/classes.md)                                   | members definitions                                                       |

### Advanced topics

|     |                                                    | Includes                                  |
| --- | -------------------------------------------------- | ----------------------------------------- |
| \*  | [Generics](./pages/language/generics.md)           | function, type, interface                 |
| \*  | [Utility Types](./pages/language/utility-types.md) | Partial, Required, Record, Pick, Omit etc |
|     | [Node.js lib](./content/nodejs-lib.md)             | Node.js modules and globals               |
|     | [TSDocs](./content/tsdocs.md)                      | typescript documentation                  |

### Practical Concepts

|                                                        | Includes                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| [Class replacement](./pages/language/replace-class.md) | use builder function instead of `class` definition                 |
| [Useful libraries](./content/useful-libraries.md)      | walk thru some commonly used libraries                             |
| [jest](./content/jest.md)                              | writing tests, configuration, mocks, expectations, `jest-dynamodb` |
| [AWS Lambda](./content/lambda.md)                      | `@types/aws-lambda`, env, caching, DI, aws-sdk faking for tests    |

Generated pages index:

[Typescript Practices](./pages/index.md)

`*` pages are fully generated from code, and could be examined in your favorite editor as one typescript file. Check them [here](https://github.com/omakoleg/typescript-practices/tree/master/src/language)
