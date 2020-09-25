# AWS Lambda

Lambda is a small handler supposed to do one thing.
It is crucial to make logic simple and optimized. This will reduce runtime costs and code maintenance.

There are no fixed requirements how code should looks like, but there are some practical
solutions proven to be useful.

## @types/aws-lambda

`aws-sdk` package provide everything needed to work with any AWS service.

But it doesn't have types for event shapes received in lambda handler function
from various sources.

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handleApiRequest = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  await Promise.resolve(1);
  return {
    statusCode: 200,
    body: "ok",
  };
};
```

In day-to-day practice mostly used are:

- `APIGatewayProxyEvent` and `APIGatewayProxyResult` for API Gateway request/response
- `DynamoDBStreamEvent` for lambdas attached to DynamoDB stream.
- `KinesisStreamEvent`for lambdas attached to Kinesis stream.
- `SNSEvent` triggered by EventSourceMapping attached to SNS
- `SQSEvent` triggered by EventSourceMapping attached to SQS

Package also provide full Lambda handler function types

```ts
import { DynamoDBStreamHandler, DynamoDBStreamEvent } from "aws-lambda";

export const handleStreamEvent: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
): Promise<void> => {
  await Promise.resolve(1);
  console.log("Process db event");
};
```

Internally handler type has definition:

```ts
export type APIGatewayProxyHandler = Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
>;
export type DynamoDBStreamHandler = Handler<DynamoDBStreamEvent, void>;
// Handler Generic
export type Handler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context,
  callback: Callback<TResult>
) => void | Promise<TResult>;
// For callback use case
export type Callback<TResult = any> = (
  error?: Error | string | null,
  result?: TResult
) => void;
```

_Such types available for all types of handlers_

## Environment

Environment variables in Lambda function available in any file by using `process.env.VARIABLE_NAME`

Nevertheless is recommended to have one environment constant and pass it as dependency:

`index.ts`

```ts
const config: EnvConfig = {
  databaseName: process.env.DATABASE_NAME!,
  gsiCustomerIdName: process.env.CUSTOMER_ID_GSI_NAME!,
};
// use config
```

This will isolate all external setup and will be useful for testing lambda code in future

## Caching

When lambda called there is initialization delay happening to create runtime environment
for a given handler.
This time depends on multiple factors and not fixed.
Based on X-Ray traces DynamoDB event handler could spend up to 2 second to start function execution.

There is "caching" trick often used to reduce this delay:

> Initialize all aws-sdk and other classes outside of lambda handler function

```ts
import { DynamoDBStreamEvent, SQSEvent } from "aws-lambda";
import AWS, { DynamoDB } from "aws-sdk";
import { initCustomerValidator } from "./validator";
const region = "eu-west-1";
// Create DocumentClient and cache it.
const docClient = new DynamoDB.DocumentClient({
  region,
});
// Create validator and cache it.
const customerValidator = initCustomerValidator();
// Resolve ENV
const config: EnvConfig = {
  databaseName: process.env.DATABASE_NAME!,
  gsiCustomerIdName: process.env.CUSTOMER_ID_GSI_NAME!,
};
export async function eventHandler(event: DynamoDBStreamEvent): Promise<void> {
  const eventNames = event.Records.map((x) => x.eventName);
  console.log(`Received DynamoDB Stream events: ${eventNames}`);
  console.log(`Writing data to ${config.databaseName} by ${gsiCustomerIdName}`);
}
```

Next time Lambda called to process stream event there are high chances
that Lambda runtime agent will still be available and everything created outside of `eventHandler`
will be still available: `docClient`, `customerValidator` and env object.

Caches like everywhere could be there, or not, nobody knows. If your lambda
was not triggered for some time there are high chances that all "cached" objects
have to be initialized again.
But if they are still there and agent is alive, then each Lambda call will cost less.

Recently was added possibility to always keep pool of already initialized agents
with Lambdas in "warmup state".
This of course has additional costs but allows to keep at least one Lambda which caches will
not be removed and completely remove initialization time.

Read more about Lambda [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/invocation-scaling.html)

## DI container

Lambda code could became pretty messy and some time.

It is better to use Dependency Injection approach from early stages.
All external communications are wrapped into types which can be replaced
later in tests

> Sample of Lambda stream event handler which resolves parameters form `SSM`,
> skips any event except 'INSERT'
> validates something in payload
> and pushes data into another `DynamoDB` table

Assumed here that `DynamoDBStreamEvent` will be triggered for one record

`index.ts` Lambda event handler

```ts
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { DynamoDB, SSM } from "aws-sdk";
import { initValidator } from "./validator"; // definition skipped
import { eventHandlerInternal } from "./lib";

const region = "eu-west-1";
// Create cached clients
const docClient = new DynamoDB.DocumentClient({
  region,
});
const ssm = new SSM({
  region,
});
// Create validator and cache it.
const validator = initValidator();
// Resolve ENV
const config: EnvConfig = {
  ssmConfigKey: process.env.SSM_CONFIG_KEY!,
};
// Lambda handler
export const eventHandler = eventHandlerInternal(
  docClient,
  ssm,
  config,
  validator
);
```

`lib.ts` With implementation

```ts
export const eventHandlerInternal = (
  docClient: DynamoDB.DocumentClient,
  ssm: SSM,
  config: EnvConfig,
  validator: Validator
): DynamoDBStreamHandler => async (
  event: DynamoDBStreamEvent
): Promise<void> => {
  const { Parameter } = await ssm
    .getParameter({
      Name: config.ssmConfigKey,
    })
    .promise();
  const tableName = Parameter!.Value!;
  const record = event.Records[0];
  if (record.eventName === "INSERT") {
    // decode payload
    const recordData = DynamoDB.Converter.unmarshall(
      record.dynamodb!.NewImage!
    );
    const isValid = await validator.validate(recordData);
    if (isValid) {
      await docClient
        .put({
          TableName: tableName,
          Item: recordData,
        })
        .promise();
    }
  } else {
    console.log(`Skipped ${JSON.stringify(record)}`);
  }
};
```

Here `eventHandlerInternal` is a curried function which returns Lambda event handler based
on `docClient`,`ssm` and `config`.

Handler itself in of type `DynamoDBStreamHandler` which has one parameter: `event: DynamoDBStreamEvent`

Now it is easy to write tests for `eventHandlerInternal` and mock any external client.

## Replacing aws-sdk in tests

In `jest` tests provided earlier code with `DynamoDB.DocumentClient` as parameter could be
replaced by "fake" implementation.

This will reduce tests running time and don't have any side effects on data in shared tests database.

`mocked-dynamodb.ts` provides required function `put`. This "fake" function is capturing
function cll parameters and provide already expected output.

```ts
import { DynamoDB } from "aws-sdk";

interface Props {
  putOutput?: DynamoDB.DocumentClient.PutItemOutput;
  batchWriteOutput?: DynamoDB.DocumentClient.BatchWriteItemOutput;
}

interface MockedDynamoDb {
  docClient: DynamoDB.DocumentClient;
  putParams: DynamoDB.DocumentClient.PutItemInput[];
  batchWriteParams: DynamoDB.DocumentClient.BatchWriteItemInput[];
}

export const mockedDynamoDb = ({
  putOutput,
  batchWriteOutput,
}: Props): MockedDynamoDb => {
  const putParams: DynamoDB.DocumentClient.PutItemInput[] = [];
  const batchWriteParams: DynamoDB.DocumentClient.BatchWriteItemInput[] = [];
  return {
    docClient: ({
      batchWrite: (params: DynamoDB.DocumentClient.BatchWriteItemInput) => {
        batchWriteParams.push(params);
        return {
          promise: () => Promise.resolve(batchWriteOutput),
        };
      },
      put: (params: DynamoDB.DocumentClient.PutItemInput) => {
        putParams.push(params);
        return {
          promise: () => Promise.resolve(putOutput),
        };
      },
    } as unknown) as DynamoDB.DocumentClient,
    putParams,
    batchWriteParams,
  };
};
```

Same can be done with `SSM`:

`mocked-ssm.ts`:

```ts
import { SSM } from "aws-sdk";
import { GetParameterRequest, GetParameterResult } from "aws-sdk/clients/ssm";

interface Props {
  getParameter?: GetParameterResult;
}
interface MockedSSM {
  ssm: SSM;
  getParameterParams: GetParameterRequest[];
}

export const mockedSsm = ({ getParameter }: Props): MockedSSM => {
  const getParameterParams: GetParameterRequest[] = [];
  return {
    ssm: ({
      getParameter: (p: GetParameterRequest) => {
        getParameterParams.push(p);
        return {
          promise: () => Promise.resolve(getParameter),
        };
      },
    } as unknown) as SSM,
    getParameterParams,
  };
};
```

In tests later for `eventHandlerInternal`:

```ts
export const eventHandlerInternal = (
  docClient: DynamoDB.DocumentClient,
  ssm: SSM,
  config: EnvConfig,
  // validator: Validator
): DynamoDBStreamHandler => async (
  event: DynamoDBStreamEvent
): Promise<void>

describe("Lambda Test", () => {
  it("success flow", async () => {
    // mock database
    const { docClient, putParams } = mockedDynamoDb({});
    // mock parameter result
    const { ssm, getParameterParams } = mockedSsm({
      getParameter: {
        Parameter: {
          Value: "test",
        },
      },
    });
    await eventHandlerInternal(docClient, ssm, {
      ssmConfigKey: "ssm-key",
    })({
      /* some database event*/
    });
    // called only once
    expect(putParams).toHaveLength(1);
    // what parameters?
    expect(putParams).toEqual({
      TableName: "test",
      Item: {
        /** database event data shape */
      },
    });
    // called once
    expect(getParameterParams).toHaveLength(1);
    // what parameters?
    expect(getParameterParams).toEqual({
      Name: "ssm-key",
    });
  });
});
```
