/**
 * Practical lesson for http://localhost:4000/pages/language/variables.html
 */
describe("[variables] lessons/language/variables.test.ts", () => {
  it("1. Sample variable assignments", () => {
    // TODO: Fix to match `expect`
    const one = "on";
    // TODO: Fix to match `expect`
    const twoCombined = `tw-${one}`;
    // TODO: Fix to match `expect`
    const three = 4;
    expect(one).toBe("one");
    expect(twoCombined).toBe("two-one");
    expect(three).toBe(4);
  });
  it("2. variable scoping", () => {
    // TODO: This function uses `var`
    // Fix it by using more modern approach
    function checkForError(isError = true) {
      var errorPrefix = "Error";
      if (isError) {
        var errorPrefix = "Internal Error";
      }
      return errorPrefix;
    }
    expect(checkForError(true)).toBe("Error");
  });
});
