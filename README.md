# eslint-plugin-ahaha-miniprogram

eslint plugin for [wx miniprogram](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add eslint --dev
```

Next, install `eslint-plugin-ahaha-miniprogram`:

```
$ yarn add eslint-plugin-ahaha-miniprogram --dev
```

## Usage

Add `ahaha-miniprogram` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["ahaha-miniprogram"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "ahaha-miniprogram/rule-name": ["error", { "config": "foo" }]
  }
}
```

## Supported Rules

- [lines-between-object-properties](./docs/rules/lines-between-object-properties.md)
- [no-native-api](./docs/rules/no-native-api.md)
