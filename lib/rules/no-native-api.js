/**
 * Adapter from https://github.com/eslint/eslint/blob/550de1e611a1e9af873bcb18d74cf2056e8d2e1b/lib/rules/lines-between-class-members.js
 *
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow Use of some native api: wx.xxx',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        minProperties: 1,
        additionalProperties: {
          oneOf: [
            { type: 'string', minLength: 1 },
            { type: 'boolean', enum: [true] },
          ],
        },
      },
    ],
    messages: { forbid: 'disallow use of native api: wx.{{api}}' },
  },

  create(context) {
    const forbiddenApis = context.options[0] || {};
    if (!Object.keys(forbiddenApis).length) {
      return {};
    }

    return {
      MemberExpression(node) {
        if (node.object.name !== 'wx') {
          return;
        }

        const message = forbiddenApis[node.property.name];
        if (!message) {
          return;
        }

        context.report({
          node,
          message: message === true ? undefined : message,
          messageId: message === true ? 'forbid' : undefined,
          data: {
            api: node.property.name,
          },
        });
      },
    };
  },
};
