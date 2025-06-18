# DENTALPRO

## Frontend

To start the frontend server, use:

```bash
yarn fe:start
```

## Libraries

- **ui**: Centralizes reusable UI components (e.g., buttons, tables) for consistent design across the app.
- **feat**: Contains feature-specific components like FeatureButton for business logic encapsulation.
- **utils**: Stores utility functions (e.g., data formatting,calculations...) for improved maintainability.
- **hooks**: Holds reusable React hooks for managing state, API calls, and other common logic.
- **i18n**: Holds everthing related internationalization.

## NX

To see all available targets to run for a project, run:

```sh
npx nx show project DentalPro-fe
```

To launch the project graph visualization for our workspace run:

```sh
npx nx graph
```

## Our Stack

- [NextJS](https://nextjs.org/) - Using app router
- [TypeScript](https://www.typescriptlang.org/)
- [Nx](https://nx.dev/)
- [eslint](https://eslint.org/)
- [mantine](https://mantine.dev/) - So far, we have installed only two Mantine packages: @mantine/core and @mantine/hooks
