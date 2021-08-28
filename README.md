[![NPM Version](https://badge.fury.io/js/time-value.svg)](https://badge.fury.io/js/time-value)
[![CI](https://github.com/justinlettau/time-value/workflows/CI/badge.svg)](https://github.com/justinlettau/time-value/actions)
[![codecov](https://codecov.io/gh/justinlettau/time-value/branch/master/graph/badge.svg)](https://codecov.io/gh/justinlettau/time-value)
[![Dev Dependency Status](https://david-dm.org/justinlettau/time-value/dev-status.svg)](https://david-dm.org/justinlettau/time-value?type=dev)

# Time Value

An immutable library for parsing and manipulating an amount of time.

`Time` represents an amount of time (2hrs), not a time of day (2pm). Thus, `Time` can be negative
(`-02:30:00`) and greater than 24 hours (`52:30:00`). It pairs nicely with
[MySQL's time](https://dev.mysql.com/doc/refman/8.0/en/time.html) data type.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

# Features

- 🎉 **Immutable** API.
- 💪 Written in **TypeScript**.
- 🚀 **Zero** dependencies.

# Installation

```bash
npm install time-value --save
```

# Usage

Create an instance of `Time` with hours, minutes, and seconds.

```ts
import Time from 'time-value';

new Time(5, 8, 30);
// => 5 hrs, 8 mins, and 30 secs

new Time({ hours: 11, minutes: 23, seconds: 9 });
// => 11 hrs, 23 mins, and 9 secs
```

Parse a string (`hh:mm:ss`) into an instance of `Time`.

```ts
import { parse } from 'time-value';

parse('02:30:08');
// => 2 hrs, 30 mins, and 08 secs
```

Immutable and pure functions for common operations.

```ts
import Time, { average, max, min, sum } from 'time-value';

const time1 = new Time(8, 3, 10);
const time2 = new Time(1, 0, 45);
const time3 = new Time(5, 51, 6);

average([time1, time2, time3]);
// => 4 hrs, 58 mins, and 20 secs

max([time1, time2, time3]);
// => 8 hrs, 3 mins, and 10 secs

min([time1, time2, time3]);
// => 1 hrs, 0 mins, and 45 secs

sum([time1, time2, time3]);
// => 14 hrs, 55 mins, and 1 secs
```

# Development

```
npm ci
npm run build
```
