# eslint-plugin-miniprogram

miniprogram

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add eslint --dev
```

Next, install `eslint-plugin-miniprogram`:

```
$ yarn add eslint-plugin-miniprogram --dev
```

## Usage

Add `miniprogram` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["miniprogram"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "miniprogram/rule-name": 2
  }
}
```

## Supported Rules

- [lines-between-object-properties](./docs/rules/lines-between-object-properties.md)
