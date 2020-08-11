# react-use-hotjar

> Adds [Hotjar](https://www.hotjar.com/) capabilities as custom hooks to your project

[![NPM](https://img.shields.io/npm/v/react-use-hotjar.svg)](https://www.npmjs.com/package/react-use-hotjar)

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

- Initializing Hotjar (use it at your very `index.jsx`)

```tsx
import * as React from 'react';

import { useHotjar } from 'react-use-hotjar';

const myCustomLogger = console.info;

const HotjarReadyApp = () => {
  const { initHotjar } = useHotjar();

  React.useEffect(() => {
    initHotjar(hotjarId, hotjarVersion, myCustomLogger);
  });

  return <App />;
};
```

- Identifying Users (use it wherever you get access to user's information)

```tsx
const MyCustomComponent = () => {
  const { initHotjar } = useHotjar();

  const handleUserInfo = (userInfo) => {
    const { id, ...restUserInfo } = userInfo;

    identifyHotjar(
      id,
      JSON.stringify({
        restUserInfo,
      })
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
2. `userInfo`: Stringfied user info of key-value pairs (note this must not be so long and deep according to [docs](https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference))
3. `logCallback`: Optional callback for logging wether Hotjar identified user or not

```tsx
identifyHotjar: (userId: string, userInfo: string, logCallback?: () => void) =>
  boolean;
```

---

## License

react-use-hotjar is [MIT licensed](./LICENSE).

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
