describe("replace-class", () => {
  interface Database {
    set: (key: string, value: number) => number;
    get: (key: string) => number | undefined;
    delete: (key: string) => number;
  }

  const verifyDatabase = (db: Database) => {
    db.set("one", 1);
    db.set("two", 2);
    db.set("three", 3);
    expect(db.get("one")).toBe(1);
    expect(db.get("two")).toBe(1);
    expect(db.get("three")).toBe(1);
    expect(db.get("four")).toBe(undefined);
    db.delete("one");
    expect(db.get("one")).toBe(undefined);
  };

  it("Finish implementation", () => {
    class CustomDatabase implements Database {
      private readonly name: string;
      private storage: Record<string, number> = {};
      constructor(name: string) {
        this.name = name;
      }
      set(key: string, value: number): number {
        console.log(`set in ${this.name}`);
        // TODO: Finish implementation, use `storage`
        return 0;
      }
      get(key: string): number | undefined {
        console.log(`get in ${this.name}`);
        // TODO: Finish implementation, use `storage`
        return 0;
      }
      delete(key: string): number {
        console.log(`delete in ${this.name}`);
        // TODO: Finish implementation, use `storage`
        return 0;
      }
    }
    const database: Database = new CustomDatabase("my-db");
    verifyDatabase(database);
  });

  it("Implement without using class", () => {
    // TODO: Implement Database adapter without using `class`
    const buildDatabase = (name: string): Database => {
      return {
        set: jest.fn(),
        get: jest.fn(),
        delete: jest.fn(),
      };
    };
    const database: Database = buildDatabase("my-db");
    verifyDatabase(database);
  });
});
