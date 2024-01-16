<img align="right" alt="traffic" src="https://pv-badge.herokuapp.com/total.svg?repo_id=olavoparno-react-use-hotjar"/>

# react-use-hotjar

> Adds [Hotjar](https://www.hotjar.com/) capabilities as custom hooks to your project

[![NPM](https://img.shields.io/npm/v/react-use-hotjar.svg)](https://www.npmjs.com/package/react-use-hotjar)

---

| Statements                                                                    | Branches                                                                  | Functions                                                                  | Lines                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [License](#license)

---

## Install

```bash
npm install --save react-use-hotjar
```

---

## Usage

- Initializing Hotjar (use it at the very top of your application)

```tsx
import * as React from 'react';
import useHotjar from 'react-use-hotjar';

const myCustomLogger = console.info;

const HotjarReadyApp = () => {
  const { initHotjar } = useHotjar();

  React.useEffect(() => {
    initHotjar(1234567, 6, false, myCustomLogger);
  }, [initHotjar]);

  return <App />;
};
```

- Identifying Users (Use it wherever user's information is available. Send and object respecting [Identify API's rules](https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference#user-attribute-values))

```tsx
import * as React from 'react';
import useHotjar from 'react-use-hotjar';

const myCustomLogger = console.log;

const MyCustomComponent = () => {
  const { identifyHotjar } = useHotjar();

  const handleUserInfo = (userInfo) => {
    const { id, ...restUserInfo } = userInfo;

    identifyHotjar(id, restUserInfo, myCustomLogger);
  };
};
```

---

## Examples

- You may find a running [example](./example) in this project which are served at [Github Pages](https://olavoparno.github.io/react-use-hotjar).
- Also, a running codesandbox [codesandbox](https://codesandbox.io/s/react-use-hotjar-dkcjp)

---

## Documentation

`useHotjar()` returns:

- An object with the following keys:

| key            | description                | arguments                                                                   | example                                                                                         |
| -------------- | -------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| readyState     | States if Hotjar is ready  | N/A                                                                         | N/A                                                                                             |
| initHotjar     | Initialize method          | (hotjarId: number, hotjarVersion: number, hotjarDebug?: boolean, loggerCallback?: console[method]) | (1933331, 6, false, console.info)                                                                      |
| identifyHotjar | User identify API method   | (userId: string, userInfo: object, loggerCallback?: console[method])        | ('abcde-12345-12345', {name:"Olli",surname:"Parno",address:"Streets of Tomorrow"}, console.log) |
| stateChange    | Relative path state change | (relativePath: string, loggerCallback?: console[method])                    | ('route/logged-route/user?registered=true')                                                     |
| tagRecording   | Tag a recording            | (tags: string[], loggerCallback?: console[method])                          | (['tag1', 'tag2'])                                                                              |

- initHotjar()

1. `hotjarId`: Your Hotjar application ID ex.: 1933331
2. `hotjarVersion`: Hotjar's current version ex.: 6
3. `hotjarDebug`: Optional Debug Mode to see hotjar logs in console ex.: true
4. `logCallback`: Optional callback for logging whether Hotjar is ready or not

```tsx
initHotjar: (
  hotjarId: string,
  hotjarVersion: string,
  hotjarDebug?: boolean,
  logCallback?: () => void
) => boolean;
```

- identifyHotjar()

1. `userId`: Unique user's identification as string
2. `userInfo`: User info of key-value pairs (note this must not be so long and deep according to [docs](https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference)) (Please note: **The Identify API is only available to Business plan customers.**)
3. `logCallback`: Optional callback for logging whether Hotjar identified user or not

```tsx
identifyHotjar: (userId: string, userInfo: object, logCallback?: () => void) =>
  boolean;
```

- stateChange()

1. `relativePath`: A change in a route specially for SPAs usage. [stateChange docs](https://help.hotjar.com/hc/en-us/articles/360034378534)
2. `logCallback`: Optional callback for logging whether Hotjar stateChange was called or not

```tsx
stateChange: (relativePath: string, logCallback?: () => void) => boolean;
```

- tagRecording()

1. `tags`: List of strings to associate with a recording that can be used for filtering
2. `logCallback`: Optional callback for logging whether Hotjar tagRecording was called or not

```tsx
tagRecording: (tags: string[], logCallback?: () => void) => boolean;
```

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://olavoparno.github.io"><img src="https://avatars1.githubusercontent.com/u/7513162?v=4?s=70" width="70px;" alt="Olavo Parno"/><br /><sub><b>Olavo Parno</b></sub></a><br /><a href="#ideas-olavoparno" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/react-use-hotjar/commits?author=olavoparno" title="Code">💻</a> <a href="https://github.com/the-bugging/react-use-hotjar/commits?author=olavoparno" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gianpietro1"><img src="https://avatars.githubusercontent.com/u/10046142?v=4?s=70" width="70px;" alt="Gianpietro Lavado"/><br /><sub><b>Gianpietro Lavado</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/commits?author=gianpietro1" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://paqmind.com"><img src="https://avatars.githubusercontent.com/u/2128182?v=4?s=70" width="70px;" alt="Ivan Kleshnin"/><br /><sub><b>Ivan Kleshnin</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/commits?author=ivan-kleshnin" title="Code">💻</a> <a href="#ideas-ivan-kleshnin" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ajayvarghese.netlify.app/"><img src="https://avatars.githubusercontent.com/u/12490903?v=4?s=70" width="70px;" alt="Ajay Varghese"/><br /><sub><b>Ajay Varghese</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/commits?author=ajayvarghese" title="Code">💻</a> <a href="#ideas-ajayvarghese" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/honicole"><img src="https://avatars.githubusercontent.com/u/11463889?v=4?s=70" width="70px;" alt="honicole"/><br /><sub><b>honicole</b></sub></a><br /><a href="#tool-honicole" title="Tools">🔧</a> <a href="https://github.com/the-bugging/react-use-hotjar/commits?author=honicole" title="Code">💻</a> <a href="#ideas-honicole" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/react-use-hotjar/commits?author=honicole" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/georgibakken"><img src="https://avatars.githubusercontent.com/u/16558100?v=4?s=70" width="70px;" alt="Georg Bakken Idland"/><br /><sub><b>Georg Bakken Idland</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/commits?author=georgibakken" title="Documentation">📖</a> <a href="#ideas-georgibakken" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vith"><img src="https://avatars.githubusercontent.com/u/3265539?v=4?s=70" width="70px;" alt="Jason Papakostas"/><br /><sub><b>Jason Papakostas</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/issues?q=author%3Avith" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://luighiviton.com"><img src="https://avatars.githubusercontent.com/u/6945270?v=4?s=70" width="70px;" alt="Luighi Viton-Zorrilla"/><br /><sub><b>Luighi Viton-Zorrilla</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/issues?q=author%3ALuighiV" title="Bug reports">🐛</a> <a href="#maintenance-LuighiV" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/quentin-luc-15161994/"><img src="https://avatars.githubusercontent.com/u/5237095?v=4?s=70" width="70px;" alt="Quentin Luc"/><br /><sub><b>Quentin Luc</b></sub></a><br /><a href="https://github.com/the-bugging/react-use-hotjar/commits?author=QuentinLuc" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

## License

react-use-hotjar is [MIT licensed](./LICENSE).

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
