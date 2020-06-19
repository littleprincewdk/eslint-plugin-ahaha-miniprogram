/**
 * Adapter from https://github.com/eslint/eslint/blob/550de1e611a1e9af873bcb18d74cf2056e8d2e1b/lib/rules/lines-between-class-members.js
 *
 */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description:
        'require an empty line between object properties in specific function params or object properties',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: {
          funcs: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
          },
          props: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      always: 'Expected blank line between object properties.',
    },
  },

  create(context) {
    const options = [];
    const sourceCode = context.getSourceCode();
    options[0] = context.options[0] || { funcs: [], props: [] };

    /**
     * Checks if there is padding between two tokens
     * @param {Token} first The first token
     * @param {Token} second The second token
     * @returns {boolean} True if there is at least a line between the tokens
     */
    function isPaddingBetweenTokens(first, second) {
      const comments = sourceCode.getCommentsBefore(second);
      const len = comments.length;

      // If there is no comments
      if (len === 0) {
        const linesBetweenFstAndSnd = second.loc.start.line - first.loc.end.line - 1;

        return linesBetweenFstAndSnd >= 1;
      }

      // If there are comments
      let sumOfCommentLines = 0; // the numbers of lines of comments
      let prevCommentLineNum = -1; // line number of the end of the previous comment

      for (let i = 0; i < len; i += 1) {
        const commentLinesOfThisComment = comments[i].loc.end.line - comments[i].loc.start.line + 1;

        sumOfCommentLines += commentLinesOfThisComment;

        /*
         * If this comment and the previous comment are in the same line,
         * the count of comment lines is duplicated. So decrement sumOfCommentLines.
         */
        if (prevCommentLineNum === comments[i].loc.start.line) {
          sumOfCommentLines -= 1;
        }

        prevCommentLineNum = comments[i].loc.end.line;
      }

      /*
       * If the first block and the first comment are in the same line,
       * the count of comment lines is duplicated. So decrement sumOfCommentLines.
       */
      if (first.loc.end.line === comments[0].loc.start.line) {
        sumOfCommentLines -= 1;
      }

      /*
       * If the last comment and the second block are in the same line,
       * the count of comment lines is duplicated. So decrement sumOfCommentLines.
       */
      if (comments[len - 1].loc.end.line === second.loc.start.line) {
        sumOfCommentLines -= 1;
      }

      const linesBetweenFstAndSnd = second.loc.start.line - first.loc.end.line - 1;

      return linesBetweenFstAndSnd - sumOfCommentLines >= 1;
    }

    return {
      ObjectExpression(node) {
        const { funcs = [], props = [] } = options[0];

        if (!funcs.length && !props.length) {
          return;
        }

        if (node.parent && node.parent.type === 'CallExpression') {
          const isFuncCall =
            node.parent.callee.type === 'Identifier' && funcs.includes(node.parent.callee.name);
          const isMethodCall =
            node.parent.callee.type === 'MemberExpression' &&
            funcs.includes(node.parent.callee.property.name);
          if (!isFuncCall && !isMethodCall) {
            return;
          }
        } else if (node.parent && node.parent.type === 'Property') {
          if (!props.includes(node.parent.key.name)) {
            return;
          }
        } else {
          return;
        }

        const { properties } = node;

        for (let i = 0; i < properties.length - 1; i += 1) {
          const curLast = sourceCode.getLastToken(properties[i]);
          const nextFirst = sourceCode.getFirstToken(properties[i + 1]);
          const isPadded = isPaddingBetweenTokens(curLast, nextFirst);

          if (!isPadded) {
            context.report({
              node: properties[i + 1],
              messageId: 'always',
              fix(fixer) {
                const tokenAfterLastToken = sourceCode.getTokenAfter(curLast);
                const tokenToLineBreakAfter =
                  tokenAfterLastToken.value === ',' ? tokenAfterLastToken : curLast;

                return isPadded
                  ? fixer.replaceTextRange([curLast.range[1], nextFirst.range[0]], ',\n')
                  : fixer.insertTextAfter(tokenToLineBreakAfter, '\n');
              },
            });
          }
        }
      },
    };
  },
};
