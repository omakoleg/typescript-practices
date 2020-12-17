## Errors

There are multiple strategies how to handle an error.

It is always performed by `try-catch` statement.

> Remember: Async function invoking will throw rejected value. It can be captured by try-catch

[Read more at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

### Catch all

```ts
function throwError() {
  try {
    throw new Error("My Error");
  } catch (e) {
    console.log(e);
  }
}
throwError();
```

[open code in online editor](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABFAFgJzgdwKJo2gCgEpEBvAKEWTQE8zKrl0tEwBTTRXfAgIgFk63OGl5EA3AwC+iCAEMoEFIgJsSFRrIQBnOABs2AOj1wA5qonTyU8qgw48I4uKA)

### Re-throwing errors

In some cases you can expect some error, perform an action and throw the same error to be processed
on higher levels.

```ts
function reThrow() {
  try {
    throw new Error("My Error");
  } catch (e) {
    console.log(`Error happened: ${e}`);
    throw e;
  }
}
reThrow();
```

[open code in online editor](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAJwKYBUAWy4HcAUAlIgN4BQiiUyAnqRZVdnomKrogKLI7L4BEAWTrde-QgG4GAX0QQAhlAiZE+VMXKM5CAM5wANqgB0+uAHN8AA1FxkiTPIAOj1GwAmALkQASEqmmWkgyUUMwcqFKU0mTRaFg4BJJAA)

### Catching only subset

You can filter out only necessary errors in `catch` using `instanceof`

```ts
function filterErrorInstanceOf() {
  try {
    throw new TypeError("Bad Type");
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(`Expected type error: ${e}`);
    } else if (e instanceof RangeError) {
      console.log(`Expected range error: ${e}`);
    } else {
      // re-throw all others
      throw e;
    }
  }
}
filterErrorInstanceOf();
```

[open code in online editor](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMGAbKBTATgUS1uLASTAGcoBDSDAeWAAoBKRAbwChFEosBPVjzlwAWBAO6IwGcQBUeABwx4CWegCIAQhQAmiWQtWMA3AIC+iCBSgQhiehmbtBiGMFsZnZStTiu9i-IQOAk4QCKRwqBgAdKhwAOb0AAY4AB4K0Bg6UPLu2MoAXIgAJCwYJolGwYhmGKik7i5uHuRUEBg+iABKVHH+ykFOnKFkEdGxCclpGBk6WD25AViFJWUVxk41de6OgwD0u4hYGAC0UCJw4hSoqIhwZ9ikVZxnYogY64ImpmxfKOjYSkIJBa1DoTGMQA)

Or as variation use `switch` case:

```ts
function filterErrorSwitch() {
  try {
    throw new TypeError("Bad Type");
  } catch (e) {
    switch (e.constructor) {
      case TypeError:
      case RangeError:
        console.log(`Expected error: ${e}`);
        break;
      default:
        throw e;
    }
  }
}
filterErrorSwitch();
```

[open code in online editor](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMGAbKBTATgUS1uLAZQHcYoIALACgEpEBvAKEUSiwE9GXW3KCSiMBkEAVDgAcMeAlmoAiAEIBDACaJxU+bQDcPAL6IIyipUTUM9Zr0QBnMqfMYAdBAS32IaISs8bx2wwNSWl8QgAuP14AoIAlZTAAc1DZSJt-dzhUF1Q4ROoAAxwADyloDHVsVMQAEgYMfQLdKJsAIywMZQBrPXTEVQxgZRB0NL6+AUQMXt59AyY5lHRsGUJScio6PSA)

### Use finally

`finally` is called each time after `try` or `catch` been called, regardless of thrown exceptions

```ts
function errorFinally() {
  try {
    throw new TypeError("Bad Type");
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(`Expected type error: ${e}`);
      throw e;
    }
  } finally {
    console.log("I will be called always");
  }
}
errorFinally();
```

### Custom Errors

Custom errors can be thrown as well. To be able to it, just extend `Error` class, and throw newly created instance.

```ts
class InvalidInputError extends Error {
  code = "SOME_INVALID_INPUT";
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
const invalidValue = 100;
try {
  if (invalidValue > 0) {
    throw new InvalidInputError("Some field is not valid");
  }
} catch (e) {
  console.log(`Error happened: ${e}`); // Error happened: InvalidInputError: Some field is not valid
}
```

[open code in online editor](https://www.typescriptlang.org/play?#code/MYGwhgzhAECSB2A3MICWATBAHArgFwFEAnIgeyOgFMAPPS+dGYsigbwChpphT1LoAvNABEAZQDyAWQIB9WADkAagEEAMrAAic+QAUAqgBVhAbk7dS8CHiI5gecgAoAtpShgA5pQBc0K0VTw7gCU0BxcXBA4WJREzq4QHpRBpuHQeAAWqBAAdPBgLoIiCMhomPC4hCTkJmZcGVnZVmDAANaFAAYAJKz1OS5ungC+ADrw3fCUAO7QzI5BjXjNLYPtKdCD7Bs8lnjQASUYiig4-EIAjAAMF6bWAJ6hZqgAZtAO+yiHx-wAfNAXIWFwhkyNMJtNih8yhVZrExKQCk9UJQQOg9jB4KRdgd0MJkmYNoNuGA8MB0q8kg8uNsIKQQJRsiBSO4HO0YdB0mAsNEJugfN1KCtktAAPTCmZVCgcrn0Si8uBISHYfAwnyieH8RHI1FZaAYrGQzbsIA)
