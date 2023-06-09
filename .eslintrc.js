module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		// 开启setup语法糖环境
		"vue/setup-compiler-macros": true
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended",
		// 1. 接入 prettier 的规则
		"prettier",
		"plugin:prettier/recommended"
	],
	globals: {
		defineOptions: true
	},
	overrides: [],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parser: "@typescript-eslint/parser"
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		// 2. 开启 prettier 自动修复的功能
		"prettier/prettier": "error",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-empty-function": "off", // 关闭空函数警告
		"vue/multi-word-component-names": "off"
	}
};
