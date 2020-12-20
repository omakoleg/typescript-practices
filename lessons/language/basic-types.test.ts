/**
 * Practical lesson for http://localhost:4000/pages/language/basic-types.html
 */
describe("[basic-types] lessons/language/basic-types.test.ts", () => {
  it("1. Symbol", () => {
    let symbolYes1 = Symbol("yes");
    // TODO: Update right side of assignment to pass the test
    let symbolYes2 = Symbol("yes");
    expect(symbolYes1).toBe(symbolYes2);
  });

  it("2. Long number issues", () => {
    // TODO: Update number literal to use `_` separator and test to pass
    expect(4000000000).toBe(400000000);
  });

  it("3. Maximum value", () => {
    // TODO: Use maximum possible value in const definition: `Infinity`
    const maximumNeverReachableValue = 10;
    expect(10000000000000000000n).toBeLessThan(maximumNeverReachableValue);
  });

  it("4. Array and Tuple", () => {
    // TODO: Adjust definition to pass the test
    const mixed: [number, string, string] = [10, "20", "30"];
    expect(mixed.toString()).toBe("10,20,30,40");
  });

  it("5. NUmbered enum", () => {
    enum Counter {
      TEN = 10,
      TWENTY = 20,
      FIFTY = 50,
    }
    // TODO: Use `Counter` enum to assign correct `value`
    const value = {} as unknown;
    expect(value).toBe(20);
  });

  it("6. Undefined type", () => {
    let value;
    // TODO: Correct `toBe` to expect current type of `value`
    expect(typeof value).toBe("number");
  });

  it("7. Empty types", () => {
    let value;
    let value2 = null;
    // TODO: Correct any of `value` or `value2` to pass the expectation
    expect(typeof value).toBe(typeof value2);
  });

  it("8. General types", () => {
    let value = {};
    let value2 = () => 100;
    // TODO: Correct any of `value` or `value2` to pass the expectation
    expect(typeof value).toBe(typeof value2);
  });
});
