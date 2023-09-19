module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended',
		'prettier',
	],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
			},
		],
		indent: 'off',
		'max-lines': [
			'error',
			{
				max: 150,
			},
		],
		'max-lines-per-function': [
			'error',
			{
				max: 30,
			},
		],
		noEmptyFunction: 'off',
		noTabs: [
			0,
			{
				allowIndentationTabs: true,
			},
		],
		quotes: [2, 'single'],
		'comma-dangle': [2, 'always-multiline'],
	},
};
