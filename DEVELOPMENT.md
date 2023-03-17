# Development

## Build

```sh
npm run build
```

## Lint

```sh
npm run lint
```

## Visual Studio Code

Modify `.vscode/settings.json` to include the following settings so that Visual Studio Code can:

- Detect and apply different ESLint configuration files in different directories.
- Lint the source code in the editor automatically according to ESLint flat config.
```json
{
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.experimental.useFlatConfig": true
}
```
