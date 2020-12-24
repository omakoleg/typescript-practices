describe("dest-spread", () => {
  it("Spread tuple", () => {
    // TODO: Use destructuring to assign values directly to variables instead of _tuple
    let stringValue, numberValue, booleanValue;
    const _tuple = ["test", 1, true];
    expect(stringValue).toBe("test");
    expect(numberValue).toBe(1);
    expect(booleanValue).toBe(true);
  });
  it("Spread array partially", () => {
    const arr = [1, 2, 3, 4];
    // TODO: Modify destructuring to match expectation
    const [, rest] = arr;
    expect(rest).toEqual([2, 3, 4]);
  });

  it("Extract from array", () => {
    const arr = [1, 2, 3, 4];
    // TODO: Modify destructuring to match expectation
    const [second] = arr;
    expect(second).toEqual(2);
  });

  it("Function result destructuring", () => {
    const calculateSumAndMultiply = (a: number, b: number): any => {
      const sum = a + b;
      const mul = a * b;
      // TODO: Modify return to provide both values as result
      return undefined;
    };
    const [numbersSum, numbersMultiplied] = calculateSumAndMultiply(2, 3);
    expect(numbersSum).toBe(5);
    expect(numbersMultiplied).toBe(6);
  });

  it("Function result object destructuring", () => {
    interface Result {
      sum: number;
      mul: number;
      div: number;
    }
    const calculateSumAndMultiply = (a: number, b: number): Result => {
      const sum = a + b;
      const mul = a * b;
      const div = a / b;
      // TODO: Modify return to provide `Result` type
      return undefined as any;
    };
    const { sum, mul, div } = calculateSumAndMultiply(4, 2);
    expect(sum).toBe(6);
    expect(mul).toBe(8);
    expect(div).toBe(2);
  });

  it("Function result deep object destructuring", () => {
    interface Result {
      items: {
        name: string;
        counts: number[];
      };
      total: number;
    }
    const calculateSum = (a: number[]): Result => ({
      items: {
        name: "Sum",
        counts: a,
      },
      total: a.reduce((p, c) => p + c, 0),
    });
    // TODO: Use destructuring to assign `name` into variable alias `itemsName` on the next line
    const itemsName = calculateSum([4, 2, 5, 6]);
    expect(itemsName).toBe("Sum");
  });

  it("Pick only required properties from the object", () => {
    interface Operations {
      sum: () => number;
      mul: () => number;
      div: () => number;
    }
    const getOperations = (a: number, b: number): Operations => ({
      sum: () => a + b,
      mul: () => a * b,
      div: () => a / b,
    });
    const { div } = getOperations(10, 5);
    expect(div()).toBe(2);
    // TODO: Use function `sum` to calculate current value instead of `undefined`
    expect(undefined).toBe(15);
    // TODO: Use function `mul` to calculate current value instead of `undefined`
    expect(undefined).toBe(50);
  });

  it("Use tuple spread for the function parameters", () => {
    const args = [1, 2, "3"];
    const paramsConcat = (a: number, b: number, c: string): string =>
      `${a}${b}${c}`;
    // TODO: Use `...` operator to pass `args` into the function
    expect(paramsConcat(1, 2, "1")).toBe("123");
  });

  it("Merge objects", () => {
    interface One {
      one: number;
      name: string;
    }
    interface Two {
      two: number;
      name: string;
    }
    interface Three {
      three: number;
    }
    type Merged = One & Two & Three;
    // TODO: Implement `mergeData` function to merge all parameters
    // Use `...` operator instead of `Object.assign()`
    // Pay attention on `name` and keep correct merging order
    const mergeData = (one: One, two: Two, three: Three): Merged => one as any;
    expect(
      mergeData(
        {
          one: 1,
          name: "One",
        },
        {
          two: 2,
          name: "Two",
        },
        { three: 3 }
      )
    ).toEqual({
      one: 1,
      name: "One",
      two: 2,
      three: 3,
    });
  });

  it("Merge complex objects", () => {
    interface User {
      name: string;
      gender: string;
      address: {
        country: string;
        city: string;
        street: string;
      };
      allGivenNames?: string[];
    }
    // TODO: Implement function for all test cases to pass
    // Use object spread operator `...`
    const smartMerge = (one: User, two: User): User => one as any;
    const user = {
      name: "Name 1",
      gender: "f",
      address: {
        country: "DE",
        city: "Berlin",
        street: "Berliner str",
      },
    };
    const userUpdates = {
      name: "Second Name",
      gender: "f",
      address: {
        country: "DE",
        city: "Berlin",
        street: "Berliner str 15",
      },
    };
    const withUpdatedAddress = smartMerge(user, userUpdates);
    expect(withUpdatedAddress.allGivenNames).toEqual(["Name 1", "Second Name"]);
    expect(withUpdatedAddress.address.street).toEqual("Berliner str 15");
  });
});
