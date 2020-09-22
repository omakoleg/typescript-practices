# Typescript project

## nvm

[Node Version Manager](https://github.com/nvm-sh/nvm) makes easier to install and use multiple `nodejs` versions on same computer.

List versions and install:

```sh
$ nvm ls-remote
```

# Project directory

Usual project structure:

```txt
..
index.js
index.ts
node_modules // locally  installed dependencies
package.json // project
yarn.lock // dependencies exact url and version (when using yarn)
package-lock.json // dependencies exact url and version (when using npm)
```

Only one of `yarn.lock` or `package-lock.json` should present.

# npm

Node package manager.

It is dependency installer and more for javascript based projects

TODO yarn

TODO package.json structure

TODO dependencies, devDependencies, peer

TODO DefinitelyTyped types
