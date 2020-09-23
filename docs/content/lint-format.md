# Lint

> lint, or a linter, is a static code analysis tool used to flag programming errors, bugs, stylistic errors, and suspicious constructs.

In typescript world most popular is [`eslint`](https://eslint.org/).

> `tslint` is deprecated and should not be used !

[`Rome`](https://github.com/romefrontend/rome) is making some progress recently and could became popular tool in future

As usually available as NPM package

```sh
npm install eslint --save-dev
yarn add eslint -D
```

Generate local configuration: `eslint --init`. It will generate `.eslintrc` file.

Also configuration can be given in `package.json`

```json
{
  "eslintConfig": {
    "env": {
      "node": true
    }
  }
}
```

Few most commonly used config sections:

- `plugins` to define external additional plugins performing additional code checks
- `extends` to provide multiple already pre-defined configurations
- `rules` to tune any check in any plugin to make it enabled, disabled or just print warning.
  Allows to specify additional config per rule
- `env` to specify what runtime will be used when performing checks, `browser, node`

`eslint` is intended to be used with `javascript` but with additional plugins it will adapt to `typescript`.

Plugin is [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

Few configurations should be provided to be able to use `typescript`:

```txt
parser: '@typescript-eslint/parser',
plugins: [
  '@typescript-eslint',
],
extends: [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
],
```

_check more setup [instructions](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)_

After you could check js/ts code for configured issues:

```sh
yarn eslint . --ext .js,.ts
```

`eslint` could also apply fixes `--fix` for most issues where it is possible and rules have instructions how to
do that fixes

```sh
eslint --ext=ts --fix .
```

Tweaking rules to disallow use of `console.log`:

```json
{
  "rules": {
    // disable console.log
    "no-console": "on"
  }
}
```

For each rule there will be page explaining it [rules/no-console](https://eslint.org/docs/rules/no-console)

## Prettier

<https://prettier.io/>

- An opinionated code formatter
- Supports many languages
- Integrates with most editors
- Has few options

This is most of options which could be configured:

```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

Configuration file is picked up automatically when named with `.prettierrc` or some other alternatives.

Prettier supports formatting for multiple formats:
`JavaScript, JSX, TypeScript, CSS, Less, SCSS, HTML ,JSON, GraphQL, Markdown, YAML`

# Lint and Format in typescript project

`eslint` and `prettier` could both format codebase so they should be linked together to not override each other.

Together with `typescript` setup it brings some wiring complexity.

Some dependencies should be installed

```sh
yarn add -D @typescript-eslint/eslint-plugin
yarn add -D @typescript-eslint/parser
yarn add -D eslint
yarn add -D eslint-config-prettier
yarn add -D eslint-plugin-import
yarn add -D eslint-plugin-prettier
yarn add -D prettier
```

`eslint` config should have plugins and extends configured:

```js
{
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier']
}
```

After this some scripts could be added into `package.json` to execute common commands:

```json
{
  "lint": "eslint --ext=ts .", // check for lint issues
  "lint:fix": "yarn lint --fix", // fix lint issues
  "format": "prettier --list-different .", // check for formatting issues
  "format:fix": "prettier --write .", // fix formatting issues
  "fix": "yarn lint:fix && yarn format:fix" // fix everything possible to fix
}
```
