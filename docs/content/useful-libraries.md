# Useful libraries

In javascript/typescript world almost for everything exists many libraries.
You could check them at <https://npmjs.com/>

# lodash

Contains multiple helpers for an array and object.

<https://lodash.com/>

Chunking arrays

```ts
import _ from "lodash";
_.chunk([1, 2, 3, 4, 5], 2); /// [ [1,2], [3,4], [5] ]
```

- `_.sortBy` - order array of objects by some criteria
- `_.flattenDeep` - flatten deep internal array into one `[1, [2, [3, [4]], 5]] => [1, 2, 3, 4, 5]`
- `_.uniq` - removed duplicates `[2, 1, 2]=> [2, 1]`

Any many others.

`underscore` package has almost same functionality but types there is messed a bit.

# axios

Make API requests from browser or backend.

<https://github.com/axios/axios>

```ts
const axios = require("axios");
```

Use with callbacks

```ts
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

Use with async/await

```ts
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

# uuid

Generates `uuid` v1 and v4.

<https://github.com/uuidjs/uuid>

```ts
import { v4 } from "uuid";
v4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

# kafkajs

Provides producer and consumer for Kafka.

<https://kafka.js.org/>

```ts
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka1:9092", "kafka2:9092"],
});
```

Produce messages:

```ts
const producer = kafka.producer();
await producer.connect();
await producer.send({
  topic: "test-topic",
  messages: [{ value: "Hello KafkaJS user!" }],
});

await producer.disconnect();
```

Consume messages:

```ts
const consumer = kafka.consumer({ groupId: "test-group" });
await consumer.connect();
await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
  },
});
```

Supports `SSL`, `SASL` and other Auth [approaches](https://kafka.js.org/docs/configuration)

```ts
const fs = require("fs");
new Kafka({
  clientId: "my-app",
  brokers: ["kafka1:9092", "kafka2:9092"],
  ssl: {
    rejectUnauthorized: false,
    ca: [fs.readFileSync("/my/custom/ca.crt", "utf-8")],
    key: fs.readFileSync("/my/custom/client-key.pem", "utf-8"),
    cert: fs.readFileSync("/my/custom/client-cert.pem", "utf-8"),
  },
});
```

# aws-sdk

AWS Client for every service provided

```sh
npm install aws-sdk
```

Sample usage

```ts
import AWS, { DynamoDB } from "aws-sdk";

const docClient = new DynamoDB.DocumentClient({
  region: "eu-west-1",
});

const result = await docClient
  .put({
    TableName: "my-table",
    Item: {
      userId: 1,
    },
  })
  .promise();
```

- `DynamoDB` has plain methods to work with `Attribute`s approach: `{userId: {N: '1'}}`
- `DynamoDB.DocumentClient` has methods to work with dynmodb and use regular ts/js objects:`{userId: 1`

# ajv

`json-schema` validator.

<https://github.com/ajv-validator/ajv>

Given json schema

`schema.json`:

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["userId", "email"],
  "properties": {
    "userId": { "type": "string", "pattern": "^[0-9]{1,}$" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "number", "min": 18, "max": 200 }
  }
}
```

Json request object can be validated using this schema:

```ts
import Ajv, { ErrorObject } from "ajv";
import itemSchema from "./schema.json";

interface PartialData {
  userId: string;
  email: string;
  age?: number;
}

type ItemValidationResult = Either<
  ErrorObject[] | undefined,
  PartialData | undefined
>;

export interface Validator {
  validateItem: (data: Record<string, any>) => ItemValidationResult;
}

/**
 * Validation wrapper to perform ajv `compile` only once
 */
export const initValidator = (): Validator => {
  const ajv = new Ajv({ allErrors: true, messages: true });
  const itemValidator = ajv.compile(itemSchema);

  const validateItem = (data: Record<string, any>): ItemValidationResult => {
    const validationResult = itemValidator(data);
    return validationResult ? [undefined, data as PartialData] : itemValidator.errors]
  };

  return {
    validateItem,
  };
};
const initValidator = initValidator()
const [errors, result] = initValidator.validateItem({
    userId: 'a'
})
```

`errors` will contain extended information about all errors in validated payload including missing properties,
wrong types, values not matching minimum or maximum values, etc. Errors are pretty verbose

# fs-extra

Provides missing parts for standard bundled `fs` module

<https://www.npmjs.com/package/fs-extra>

Contains high level functions like `ensureDir` (recursively ensure directory exists), `copy` (copy directory with files) etc.

# fp-ts

Provides developers with popular patterns and reliable abstractions from typed functional languages in TypeScript.

```ts
import { Option, isNone, none, some } from "fp-ts/lib/Option";
```

Read more at <https://gcanti.github.io/fp-ts/>
