/** @type {import('lint-staged').Configuration} */
export default {
  '*.{ts,js,html}': 'eslint --fix',
  '*.{ts,js,css,md,html,css,scss,json,yml}': 'prettier --write'
};
