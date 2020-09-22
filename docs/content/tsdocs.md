# TSDocs

As any other common language `typescript` has its preferred way to comment functions.

It is `tsdoc` (by Microsoft) or community based `typedoc`. They are mostly compatible and helps to generate documentation out of specially formatted comments.

- Tsdoc <https://www.npmjs.com/package/@microsoft/tsdoc>
- Typedoc <https://github.com/TypeStrong/typedoc>

How it looks like:

```ts
/**
   * Returns the average of two numbers.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */
  public static getAverage(x: number, y: number): number {
    return (x + y) / 2.0;
  }
```

Mode samples are in [typedoc](https://typedoc.org/guides/doccomments/#supported-tags) documentation pages

You could also use playground to try it out <https://microsoft.github.io/tsdoc/>

IntelliSense editor features are usually enabled when imported modules have tsdoc/jsdoc definitions

> IntelliSense is a code-completion aid that includes a number of features: List Members, Parameter Info, Quick Info, and Complete Word. These features help you to learn more about the code you're using, keep track of the parameters you're typing, and add calls to properties and methods with only a few keystrokes.

[IntelliSense in VSCode](https://docs.microsoft.com/en-us/visualstudio/ide/using-intellisense?view=vs-2019)
