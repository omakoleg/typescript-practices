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

// TODO;
