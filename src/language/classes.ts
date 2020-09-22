/**
 * # Class definitions
 *
 * Originally to make classes, was used "prototype-based inheritance" when new functions were added into function prototype.
 *
 * This was complex and brought a lot of confusion.
 *
 * Staring from `ECMAScript 2015` classes were introduced
 */

type LogLevel = "error" | "debug";
class Logger {
  level: LogLevel;

  constructor(level: LogLevel) {
    this.level = level;
  }

  log(message: string) {
    return `${this.level}: ${message}`;
  }
}

const logger = new Logger("debug");

/**
 * Try to use functional approaches always.
 * Your code should not have `class` definitions, believe you don't need them.
 */

/**
 * Inheritance in classes
 */

class BaseLogger {
  name: string;
  constructor(prefix: string) {
    this.name = prefix;
  }
  getFullMassage(message: string) {
    return `${this.name}: ${message}`;
  }
}

class ExtendedLogger extends BaseLogger {
  constructor(name: string) {
    super(name); // call base class constructor
  }
  getFullMassage(message: string) {
    //call base version of `getFullMassage`
    return `Extended: ${super.getFullMassage(message)}`;
  }
}

const extendedLogger = new ExtendedLogger("SampleLog");
extendedLogger.getFullMassage("some message"); // => Extended: SampleLog: some message
/**
 * Class members
 */
class PublicPrivate {
  // public by default
  name0: string = "test";
  // private
  #name: string = "test";
  // private
  private name2 = "test3";
  // public
  public name3 = "test3";
  // readonly (public)
  readonly canBeSetInConstructorOnly: boolean;

  constructor() {
    this.canBeSetInConstructorOnly = true;
  }
  private get() {}
  set() {}
}
const publicPrivate = new PublicPrivate();
publicPrivate.name0; // ok
publicPrivate.name3; // ok
publicPrivate.set(); // ok
