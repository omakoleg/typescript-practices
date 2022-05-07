# typescript-practices

Typescript training materials

Include practices for building common applications

## Development

Shell scripts:

- `yarn clean` - clean all `*.js`

- `docker-compose up` - see local preview of GithubPages running locally <http://localhost:4000>

- `yarn markdown` - generate `./src` typescript code into `./docs/pages` `md` documentation.
  Includes generation of generated pages index into `docs/pages/index.md`.

  Code in `src/` prefixed with `// @playground-link` will have link to typescript playground
  containing code where this comment was mentioned
