# Class definitions

Originally to make classes, was used "prototype-based inheritance" when new functions were added into function prototype.

This was complex and brought a lot of confusion.

Staring from `ECMAScript 2015` classes were introduced

```ts
type LogLevel = "error" | "debug";
class Logger {
  level: LogLevel;

  constructor(level: LogLevel) {
    this.level = level;
  }

  log(message: string) {
    console.log(`${this.level}: ${message}`);
  }
}

const logger = new Logger("debug");
logger.log("Test message");
```

[open code in online editor](https://www.typescriptlang.org/play?#code/C4TwDgpgBAMg9gcxhAbhANlAvFARBAJwLgNygB88ATCAIwFcFcBuAKAGN0BDAZx9kQJCUAN6soUdKgwAuAUmno24qOzgA7HsAL12wEgAopadHPgKTASlEqJwABYBLHgDpjGbJMVsJAX1Yq6IgGALYQfFxCcloEjuoI1mISEmqacFJuwQAGACQiDs5uir5yeWERQr5Zlj5Q-v4cGlqSgsI46hAA7vJCBAa4NAxMNaxBCL2ZCP0AKuHAUOU8kRC4I0A)

Try to use functional approaches always.
Your code should not have `class` definitions, believe you don't need them.

Inheritance in classes

```ts
class BaseLogger {
  name: string;
  constructor(prefix: string) {
    this.name = prefix;
  }
  getFullMessage(message: string) {
    return `${this.name}: ${message}`;
  }
}

class ExtendedLogger extends BaseLogger {
  constructor(name: string) {
    super(name); // call base class constructor
  }
  getFullMessage(message: string) {
    //call base version of `getFullMessage`
    return `Extended: ${super.getFullMessage(message)}`;
  }
}

const extendedLogger = new ExtendedLogger("SampleLog");
console.log(extendedLogger.getFullMessage("some message")); // Extended: SampleLog: some message
```

[open code in online editor](https://www.typescriptlang.org/play?#code/FAYwNghgzlAEBC0CmAZA9gcw0gTrA3sLLAHYQC2SAXLFAC44CWJGA3EbCGifTgK4g6aHAAoADjiQAzRgA8avZhgCUBDsToALRlAB0ZSrAC8sCdLntiAXw7Y6AMT5gwAWSQwI2EZQ-YFDJVVCYmJJOj4cElgAAwASfC0dfQokKxp4nyhPVOjLWBsbUEgYWABRWTokEgATJGr0LFxYJAqq6rhEKFRMbDxgzm5eASFRA2paAJYg9Vo+MVwRMeVWWAB6Vc4IZ1gAI2ROYrguHgZh4Q4bYjtHZzdfJG93LL8Jpim1ELXVkC2wXf2AG64KCMbiwNBSGLXJyuJ7ZaIzMIRKLRcqVGp1dL4KBzXC6aG3OFeTLZZRWXIXYCFY70ZqtDH1HpNEwkJAAdzK9NqjMaogARABlChiMDdDB85agQZoUW6MCYEQtdHchq9fFIBwwu7PB58qBoQwk7AS5ZfTnKzGwIXkEVihQGpCwI1IIA)

Class members definition

```ts
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
  i_am_using_all() {
    this.#name;
    this.name2 = `${this.name2}something`;
  }
}

const publicPrivate = new PublicPrivate();
publicPrivate.name0; // ok
publicPrivate.name3; // ok
publicPrivate.set(); // ok
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCuAjEBLYsBOKBuYAuAptAN4BQ00A9JdAA5KrDSICe0AJgQGZjwh7loAOzABbAgAYAXNAh4sQgObQAvNABEhOeoDcg6nSy5CggMQjxMuQuVrNBbXooHaR-AUGuc74WIIAmVQ0tPABmXX0aemQ0TwY0X3FQoPs5cKcqGgwCMHYAeyEQNgAKaMYASkFs3IKi6GAwIQAhAgBlAjwASSEAYQLreGA8PIwAeUKWGUQ8vJAcoT1BYH75QeGMYvKSQQo8AAsUCAA6Bua2ju6+oQGhkfG6tVWCDIBfTzdCaEUOzZI3iggPy2xH+0BQAH0xOD4BAUEpISAQL8yBRdgdjuY-Bk0YcjhYAkEAAYAEmI+1x+P8LwgeXE5KUhNepDepGW1zwdHi6A+RDUQgIAHc4FzMN5CJs9GU0KLjAQ8X4JDpMtA8gBrUhS7liuX40JKgxqjUinlHQF4CXKw1AA)
