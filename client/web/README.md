# Health Barbecue Web client

## Compatibilities

| IE   | Edge | Firefox | Chrome | Safari | Googlebot |
| :------- | :------- | :------- | :------- | :------- | :------- |
| 11    | >= 14 | >= 52 | >= 49 | >= 10 | ✅ |

## Available Scripts

In the project directory, you can run:

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` - launches the test runner in the interactive watch mode.

- `yarn build` - builds the app for production to the `build` folder.

- `yarn lint` - lints project files according to eslint rules, see below. Typical use case: continuous integration environments, Travis, CircleCI, etc.

- `yarn fix` - same as `yarn lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

- `yarn coverage` - launch once the test runner and show the code coverage, a folder coverage is created at the root of web project.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all configuration is done by adding config files where possible. Also no `devDependencies` for now, sorry.

It is possible to display the coverage webpage with the index.html included to folder `coverage/`.

## Redux configuration

The template provides basic Redux configuration with [feature based](https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks) folder structure. You can use [Redux devtools browser extension](http://extension.remotedev.io/). Sample feature included in `src/features` folder, note technology agnostic `features` folder name. Based on Redux maintainers recommendation.

## Testing

Testing is done with [Enzyme](https://airbnb.io/enzyme/).

## [Prettier](https://prettier.io/)

I added `prettier` to force consistent formatting. Don't like trailing semicolons? Feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside `.prettierrc` file to match your code style.

## Eslint configurations

The template extends CRA ESLint rules with a custom set, tailored for the reasonable and clean development process.

Eslint rules are commented for your convenience feel free to tweak or remove them inside `.eslintrc`. No judgment.

## Styles/CSS/Styling

We use [Material-ui](https://material-ui.com/) and we are using Google Icons font.

### List of Styling libraries

| Library | Description | Document |
| :------ | :------- | :------- |
| material-ui | Material design components | [https://material-ui.com/]() |
| typeface-roboto | font fact Roboto | [https://www.npmjs.com/package/typeface-roboto]() |

## External dependencies

| Library | Description | Document |
| :------ | :------- | :------- |
| material-ui | Material design components | [https://material-ui.com/](https://material-ui.com/) |
| redux | application store | [https://redux.js.org/](https://redux.js.org/) |
| redux-saga | it is a library that aims to make application side effects | [https://redux-saga.js.org/](https://redux-saga.js.org/) |