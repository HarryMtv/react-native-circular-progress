# Repository Guidelines

## Project Structure & Module Organization
- Library entry in `index.js` with typings in `index.d.ts`; keep exports stable for consumers.
- Core components live in `src/CircularProgress.js` and `src/AnimatedCircularProgress.js`; extract shared math or SVG helpers there rather than duplicating.
- `example-app/` hosts the Expo demo for manual QA; `screenshot.gif` in the root mirrors expected visuals.

## Build, Test, and Development Commands
- `cd example-app && yarn` installs demo dependencies; `yarn start` runs the Expo packager for local validation.
- `npm pack` from the repo root checks the published bundle and entry points.
- `npm link && npm link react-native-circular-progress` inside a consumer app helps test changes end to end.

## Coding Style & Naming Conventions
- Use ES6+ React (class or function) with PropTypes; keep public surface mirrored in `index.d.ts` when adding props.
- 2-space indentation, single quotes, trailing semicolons; order imports external before internal paths.
- Components/files use PascalCase; props and functions use camelCase; favor small pure helpers for geometry and SVG paths.

## Testing Guidelines
- No automated suite exists yet; new features and fixes should add Jest + React Native Testing Library cases in a nearby `__tests__/` folder.
- For visual or animation changes, exercise scenarios in `example-app` and capture screenshots or GIFs.
- Aim for coverage on new logic branches, prop defaults, and regressions.

## Commit & Pull Request Guidelines
- Commit messages stay concise, present tense, and scoped (see recent history for examples).
- PRs should outline motivation, approach, and user impact; link issues when available.
- Include testing notes (`yarn start` demo, added tests), media for UI-visible updates, and README/typing changes when APIs shift.

## Security & Configuration Tips
- Keep secrets out of VCS; avoid committing Expo or React Native environment files.
- When upgrading React Native or `react-native-svg`, confirm peer dependency ranges and update documentation accordingly.
