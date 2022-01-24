## Typescript Practices

This is opinionated documentation giving introduction into `typescript`language and beyond.

Idea of its creation is to give fast onboarding and knowledge refresh for the commonly used approaches and practices
in day-to-day work.

### Typescript Introduction

|                                                             | Includes                                           |
| ----------------------------------------------------------- | -------------------------------------------------- |
| [Typescript Introduction](./content/typescript.md)          | Typescript, tsc, `tsconfig.json`, programmatic use |
| [Project structure and package tools](./content/project.md) | npm, yarn, `package.json`, DefinitelyTyped         |
| [Linting And Formatting](./content/lint-format.md)          | `eslint`, `prettier`, `@typescript-eslint`         |

### Typescript Language

|                                                               | Includes                                                                  | Practice             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- |
| [Variables](./pages/language/variables.md)\*                  | let, const, scoping                                                       | `lesson-variables`   |
| [Basic types](./pages/language/basic-types.md)\*              | common types                                                              | `lesson-basic-types` |
| [Type & interface](./pages/language/type-interface.md) \*     | definition, recursive, combining                                          |                      |
| [Destructuring and spread](./pages/language/dest-spread.md)\* | for: tuples, array, objects                                               | `lesson-dest-spread` |
| [Function](./pages/language/function.md) \*                   | type definitions for regular, async , curried functions. `this` capturing |                      |
| [Modules](./content/modules.md)                               | import, export, default export                                            | -                    |
| [Callbacks](./pages/language/callbacks.md) \*                 | usage, maintenance complexity                                             |                      |
| [Promise](./pages/language/promise.md) \*                     | chaining, error handling, parallel processing                             |                      |
| [async/await](./pages/language/async-await.md) \*             | async definitions, error handling                                         | `lesson-async-await` |
| [Classes](./pages/language/classes.md) \*                     | members definitions                                                       |                      |
| [Iterate Array/Object](./pages/language/iterate.md) \*        | for..of, for..in, Object alternatives                                     |                      |

### Advanced topics

|                                                      | Includes                                  | Practice              |
| ---------------------------------------------------- | ----------------------------------------- | --------------------- |
| [Generics](./pages/language/generics.md) \*          | function, type, interface                 |                       |
| [Utility Types](./pages/language/utility-types.md)\* | Partial, Required, Record, Pick, Omit etc |                       |
| [Node.js](./content/nodejs-lib.md)                   | Node.js modules and globals               | -                     |
| [TSDocs](./content/tsdocs.md)                        | source code documentation                 | -                     |
| [Async arrays](./pages/topics/array-async.md) \*     | async functions in `map`, `reduce`, etc   | `lesson-array-async"` |
| [Custom Errors](./pages/topics/errors.md) \*         | Error, extend Error, catch                | `lesson-errors`       |

### Practical Concepts

|                                                         | Includes                                                           | Practice               |
| ------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------- |
| [Class replacement](./pages/topics/replace-class.md) \* | use builder function instead of `class` definition                 | `lesson-replace-class` |
| [Useful libraries](./content/useful-libraries.md)       | walk thru some commonly used libraries                             |                        |
| [jest](./content/jest.md)                               | writing tests, configuration, mocks, expectations, `jest-dynamodb` |                        |
| [AWS Lambda](./content/lambda.md)                       | `@types/aws-lambda`, env, caching, DI, aws-sdk faking for tests    |                        |

### Notes

Generated pages index:

[Typescript Practices](./pages/index.md)

`*` pages are fully generated from code, and could be examined in your favorite editor as one typescript file. Check them [here](https://github.com/omakoleg/typescript-practices/tree/master/src/language)

Some code samples include code playground links (bottom right) to <https://www.typescriptlang.org/play> so you could
test it without leaving browser

[Privacy Policy](./privacy.md)
