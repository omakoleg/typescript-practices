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
