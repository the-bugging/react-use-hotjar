<img align="right" alt="traffic" src="https://pv-badge.herokuapp.com/total.svg?repo_id=olavoparno-react-use-hotjar"/>

# react-use-hotjar

> Adds [Hotjar](https://www.hotjar.com/) capabilities as custom hooks to your project

[![NPM](https://img.shields.io/npm/v/react-use-hotjar.svg)](https://www.npmjs.com/package/react-use-hotjar)

[Preview-me](https://codesandbox.io/s/react-use-hotjar-dkcjp)

---

| Statements                                                                    | Branches                                                                  | Functions                                                                  | Lines                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/Coverage-96.77%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-96.55%25-brightgreen.svg) |

## Table of Contents

- [Install](#install)
- [Usage](#usage)
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
    initHotjar(1234567, 6, myCustomLogger);
  }, [initHotjar]);

  return <App />;
};
```

- Identifying Users (Use it wherever user's information is available. Send **stringified** preferably so that error handling is at this level.)

```tsx
import * as React from 'react';
import useHotjar from 'react-use-hotjar';

const myCustomLogger = console.log;

const MyCustomComponent = () => {
  const { identifyHotjar } = useHotjar();

  const handleUserInfo = (userInfo) => {
    const { id, ...restUserInfo } = userInfo;
    const informationStringified = JSON.stringify(restUserInfo);

    identifyHotjar(id, informationStringified);
  };
};
```

---

## Documentation

`useHotjar()` returns:

- An object with the following keys:

| key            | description              | arguments                                                                   | example                                                                                                         |
| -------------- | ------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| initHotjar     | Initialize method        | (hotjarId: number, hotjarVersion: number, loggerCallback?: console[method]) | (1933331, 6, console.info)                                                                                      |
| identifyHotjar | User identify API method | (userId: string, userInfo: json object, loggerCallback?: console[method])   | ('abcde-12345-12345', JSON.stringify({name:"Olli",surname:"Parno",address:"Streets of Tomorrow"}), console.log) |

- initHotjar()

1. `hotjarId`: Your Hotjar application ID ex.: 1933331
2. `hotjarVersion`: Hotjar's current version ex.: 6
3. `logCallback`: Optional callback for logging wether Hotjar is ready or not

```tsx
initHotjar: (
  hotjarId: string,
  hotjarVersion: string,
  logCallback?: () => void
) => boolean;
```

- identifyHotjar()

1. `userId`: Unique user's identification as string
2. `userInfo`: Stringfied user info of key-value pairs (note this must not be so long and deep according to [docs](https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference)) (Please note: **The Identify API is only available to Business plan customers.**)
3. `logCallback`: Optional callback for logging wether Hotjar identified user or not

```tsx
identifyHotjar: (userId: string, userInfo: string, logCallback?: () => void) =>
  boolean;
```

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://olavoparno.github.io"><img src="https://avatars1.githubusercontent.com/u/7513162?v=4?s=70" width="70px;" alt=""/><br /><sub><b>Olavo Parno</b></sub></a><br /><a href="#ideas-olavoparno" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/olavoparno/react-use-hotjar/commits?author=olavoparno" title="Code">💻</a> <a href="https://github.com/olavoparno/react-use-hotjar/commits?author=olavoparno" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/gianpietro1"><img src="https://avatars.githubusercontent.com/u/10046142?v=4?s=70" width="70px;" alt=""/><br /><sub><b>Gianpietro Lavado</b></sub></a><br /><a href="https://github.com/olavoparno/react-use-hotjar/commits?author=gianpietro1" title="Documentation">📖</a></td>
  </tr>
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
