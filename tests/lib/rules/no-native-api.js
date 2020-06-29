const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-native-api');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-native-api', rule, {
  valid: [
    {
      code: `wx.getStorageSync()`,
      options: [],
    },
    {
      code: `wx.getStorageSync()`,
      options: [{ navigateBack: true }],
    },
    {
      code: `wxp.getStorageSync()`,
      options: [{ getStorageSync: true }],
    },
  ],
  invalid: [
    {
      code: `wx.getStorageSync()`,
      options: [{ getStorageSync: true }],
      errors: [{ messageId: 'forbid' }],
    },
    {
      code: `wx.getStorageSync()`,
      options: [{ getStorageSync: 'disallow use of native api: wx.getStorageSync' }],
      errors: [{ message: 'disallow use of native api: wx.getStorageSync' }],
    },
    {
      code: `wx.getStorageSync()`,
      options: [
        {
          getStorageSync: 'disallow use of native api: wx.getStorageSync',
          navigateBack: 'disallow use of native api: wx.navigateBack',
        },
      ],
      errors: [{ message: 'disallow use of native api: wx.getStorageSync' }],
    },
    {
      code: `wx.getStorageSync()`,
      options: [
        {
          getStorageSync:
            'disallow use of native api: wx.getStorageSync, use wxp.getStorageSync instead',
        },
      ],
      errors: [
        {
          message: 'disallow use of native api: wx.getStorageSync, use wxp.getStorageSync instead',
        },
      ],
    },
  ],
});
