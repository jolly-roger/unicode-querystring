## unicode-querystring

Simple library for parsing and generation unicode query string

### Motivation
There are standart methods for dealing with query string both in browsers and nodejs, but there is fenomena (for example in nodejs),
when browser sends to the server url parameters (query string) it uses `encodeURI`, but nodejs uses `decodeURIComponet` for decoding parameters values.
That is why, when you have for example as a value of some parameter `%D1%84+%D1%8B` in a browser, you will receive `ф ы` as value of that parameter on nodejs side
(notice that plus sign was escaped) in case of using nodejs build-in module `querystring`. There are can be found a lot of use cases when such a behavior isn't suitable,
and it is a reason why thi library was written.

### Installation
Using `npm`
```sh
$ npm install unicode-querystring --save-dev 
```
or `yarn`
```sh
$ yarn add unicode-querystring
```

### Usage
In nodejs
```js
const uqs = require('unicode-querystring');

const params = uqs.parse('var0=%D1%84+%D1%8B&var1=another+value');

const qs = uqs.stringify({
    var0: 'ф+ы',
    var1: 'another+value'
});
```

In browser
```js
import {parse, stringify} = from 'unicode-querystring';

const params = parse('var0=%D1%84+%D1%8B&var1=another+value');

const qs = stringify({
    var0: 'ф+ы',
    var1: 'another+value'
});
```

## license

MIT
