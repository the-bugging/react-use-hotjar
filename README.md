<img align="right" alt="traffic" src="https://pv-badge.herokuapp.com/total.svg?repo_id=olavoparno-react-use-hotjar"/>

# react-use-hotjar

> Adds [Hotjar](https://www.hotjar.com/) capabilities as custom hooks to your project

[![NPM](https://img.shields.io/npm/v/react-use-hotjar.svg)](https://www.npmjs.com/package/react-use-hotjar)

[Preview-me](https://codesandbox.io/s/react-use-hotjar-dkcjp)

---

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Documentation](#documentation)
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
  },[]);

  return <App />;
};
```

- Identifying Users (Use it wherever user's information is available. Send __stringified__ preferably so that error handling is at this level.)

```tsx
import * as React from 'react';
import useHotjar from 'react-use-hotjar';

const myCustomLogger = console.log;

const MyCustomComponent = () => {
  const { identifyHotjar } = useHotjar();

  const handleUserInfo = (userInfo) => {
    const { id, ...restUserInfo } = userInfo;
    const informationStringified = JSON.stringify(restUserInfo);

    identifyHotjar(
      id,
      informationStringified
    );
  };
};
```

---

## Documentation

`useHotjar()` returns:

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
2. `userInfo`: Stringfied user info of key-value pairs (note this must not be so long and deep according to [docs](https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference)) (Please note: __The Identify API is only available to Business plan customers.__)
3. `logCallback`: Optional callback for logging wether Hotjar identified user or not

```tsx
identifyHotjar: (
  userId: string,
  userInfo: string,
  logCallback?: () => void
) => boolean;
```

---

## License

react-use-hotjar is [MIT licensed](./LICENSE).

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
