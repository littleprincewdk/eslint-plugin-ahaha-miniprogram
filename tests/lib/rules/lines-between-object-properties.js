const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/lines-between-object-properties');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

const errors = [
  {
    message: rule.meta.messages.always,
  },
];

ruleTester.run('lines-between-object-properties', rule, {
  valid: [
    {
      code: `foo({
        p1: 1,

        p2: 2,
      })`,
      options: [{ funcs: ['foo'] }],
    },
    {
      code: `foo({
        f1() {},

        f2() {},
      })`,
      options: [{ funcs: ['foo'] }],
    },
    {
      code: `foo({
        p1: 1,

        f1() {},
      })`,
      options: [{ funcs: ['foo'] }],
    },
    {
      code: `foo({
        p1: {
          pp1: 11,
          pp2: 22,
          ff1() {},
          ff2() {},
        },

        f1() {},
      })`,
      options: [{ funcs: ['foo'] }],
    },
    {
      code: `bar.foo({
        p1: 1,

        p2: 2,

        f1() {},

        f2() {},
      })`,
      options: [{ funcs: ['foo'] }],
    },
    {
      code: `bar.foo({
        p1: 1,

        p2: 2,

        f1() {},

        f2() {},
      })`,
      options: [{ funcs: ['foo'] }],
    },
    {
      code: `foo({
        p: {
          p1: 1,

          f1() {},
        },
      })`,
      options: [{ props: ['p'] }],
    },
  ],
  invalid: [
    {
      code: `foo({
        p1: 1,
        p2: 2,
      })`,
      options: [{ funcs: ['foo'] }],
      errors,
      output: `foo({
        p1: 1,

        p2: 2,
      })`,
    },
    {
      code: `foo({
        f1() {},
        f2() {},
      })`,
      options: [{ funcs: ['foo'] }],
      errors,
      output: `foo({
        f1() {},

        f2() {},
      })`,
    },
    {
      code: `foo({
        p1: 1,
        f1() {},
      })`,
      options: [{ funcs: ['foo'] }],
      errors,
      output: `foo({
        p1: 1,

        f1() {},
      })`,
    },
    {
      code: `bar.foo({
        p1: 1,
        f1() {},
      })`,
      options: [{ funcs: ['foo'] }],
      errors,
      output: `bar.foo({
        p1: 1,

        f1() {},
      })`,
    },
    {
      code: `foo({
        p: {
          p1: 1,
          f1() {},
        },
      })`,
      options: [{ props: ['p'] }],
      errors,
      output: `foo({
        p: {
          p1: 1,

          f1() {},
        },
      })`,
    },
    {
      code: `foo({
        p: {
          p1: 1,
          f1() {},
        },
        p2: 1,
      })`,
      options: [{ funcs: ['foo'], props: ['p'] }],
      errors: [...errors, ...errors],
      output: `foo({
        p: {
          p1: 1,

          f1() {},
        },

        p2: 1,
      })`,
    },
  ],
});
