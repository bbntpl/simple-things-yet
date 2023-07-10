module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	rules: {
		indent: 'off',
		'prettier/prettier': [
			'error',
			{ singleQuote: true, semi: true, useTabs: true, tabWdth: 2 },
		],
	},
};
