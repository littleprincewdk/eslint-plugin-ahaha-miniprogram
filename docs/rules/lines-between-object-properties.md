# Require empty lines between object properties

Configurable rule to enforce consistent empty lines between object properties.

## Configuration

```json
{
  "rules": {
    "ahaha-miniprogram/lines-between-object-properties": [
      "error",
      {
        "funcs": ["foo"], // apply to foo`s object parameter
        "props": ["p"] // apply to p`s properties, p is a property
      }
    ]
  }
}
```

## Rule details

With `["error", { "funcs": ["foo"] }]`, the following codes are valid:

```js
foo({
  p1: 1,

  p2: 2,
});
```

the following codes are invalid:

```js
foo({
  p1: 1,
  p2: 2,
});
```

With `["error", { "props": ["p"] }]`, the following codes are valid:

```js
foo({
  p: {
    p1: 1,

    f1() {},
  },
});
```

the following codes are invalid:

```js
foo({
  p: {
    p1: 1,
    f1() {},
  },
});
```

more example see [`tests/lib/rules/lines-between-object-properties`](../../tests/lib/rules/lines-between-object-properties.js)
