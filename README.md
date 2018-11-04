# options-config

Validate and replace your default configuration options with ease.

The validation scripts for configuration objects are harder to write than it seems. Luckily for you, options-config was released. This tiny library allows you to add a configuration object, of up to 2 levels, into your JavaScript library. This way, without you worrying about the validation mechanisms, your user will be able to replace any configuration option with any valid value.


[![Build status](https://travis-ci.com/nil/options-config.svg?branch=master)](https://travis-ci.com/nil/options-config)
[![Dependencies status](https://img.shields.io/david/dev/nil/options-config.svg)](https://david-dm.org/nil/options-config)
[![Version](https://img.shields.io/npm/v/options-config.svg)](https://www.npmjs.com/package/options-config)
[![License](https://img.shields.io/npm/l/options-config.svg)](https://github.com/nil/options-config/blob/master/LICENSE)


## Installation

Open Terminal and install the package with this command:

```sh
npm install options-config --save
```

Then import options-config into nay file you are planning to use it:

```js
import OptionsConfig from 'options-config';
```

Finally, do the one time setup:

```js
const options = new OptionsConfig([defaultsObject]);
```

## Defaults’ object

The defaults’ object is an object containing the default values and restrictions for every configuration option.

| Key       | Type                  | Description                                                 |
|:---------:|:---------------------:|-------------------------------------------------------------|
| `default` | string, object        | The result when there isn’t any valid value given.          |
| `type`    | string, array         | Only the values of this type will be valid.                 |
| `valid`   | string, array, object | The only values that will be valid.                         |
| `match`   | regexp                | A RegExp expression that has to match with the given value. |
| `range`   | object                | The `min`, `max` and `step` parameters for numbers.         |

Practical examples:

```js
const defaultsObject = {
  x: {
    default: 10,
    type: ['number', 'boolean']
  },
  y: {
    default: 'foo',
    type: 'string',
    valid: ['foo', 'bar', 'hello', 'world']
  }
};
```

```js
const defaultsObject = {
  x: true,
  y: {
    default: {
      y1: 'foo',
      y2: 'bar'
    },
    type: 'string',
    match: /[A-z]{3}/
  }
};
```

```js
const defaultsObject = {
  x: {
    x1: {
      default: 15,
      type: 'number',
      range: {
        min: 0,
        max: 100,
        step: 5
      }
    },
    x2: {
      default: false,
      type: 'boolean'
    }
  },
  y: {
    default: 200,
    valid: {
      number: 'all',
      string: ['e', 'π', 'pi']
    }
  }
};
```

## Validate

`options.validate(object, [defaultsObject])`

Returns an object with all the configuration options, whether they are the default value or the one given by the user.

| Parameter        | Required | Description                                                                                            |
|:----------------:|:--------:|--------------------------------------------------------------------------------------------------------|
| `object`         | true     | The configuration object given by the user. It can contain none, some or all of the available options. |
| `defaultsObject` | false    | The default values and restrictions. It’s not required if it has already been declared in the setup.   |

Practical examples:

```js
const userOptions = options.validate({
  x: false,
  y: 'hello'
});
```

```js
const userOptions = options.validate({
  x: 15
}, {
  x: {
    default: 60,
    type: 'number'
  }
});
```

## About

### Contributing

If you have any trouble while installing or using options-config, or you want to suggest a change, I encourage you to [open an issue](https://github.com/nil/options-config/issues/new) or [make a pull request](https://github.com/nil/options-config/pulls). A short explanation is enough, and it will improve this project for you and other developers.

### Tests

To run the tests, first install the dev dependencies and then run the test command:

```sh
npm install -d && npm test
```

### License

© 2018, [Nil Vila](https://twitter.com/nilvilam). Released under the [MIT License](https://github.com/nil/options-config/blob/master/LICENSE).
