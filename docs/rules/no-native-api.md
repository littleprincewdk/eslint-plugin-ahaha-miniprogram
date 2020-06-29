# Disallow Use of some native api: wx.xxx

Configurable rule to Disallow Use of some native api. Sometimes you need to use the encapsulated API uniformly, such as using [miniprogram-api-promise](https://github.com/wechat-miniprogram/miniprogram-api-promise)。

## Configuration

```json
{
  "rules": {
    "ahaha-miniprogram/no-native-api": [
      "error",
      {
        "getStorageSync": true, // equal 'disallow use of native api: wx.getStorageSync'
        "navigateTo": "disallow use of native api: wx.navigateTo, use wxp.navigateTo instead" // custom message
      }
    ]
  }
}
```

## Rule details

With `["error", { "getStorageSync": true }]`, the following codes are invalid:

```js
wx.getStorageSync('bar');
```

more example see [`tests/lib/rules/no-native-api`](../../tests/lib/rules/no-native-api.js)
