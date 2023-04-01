## 编程规范工具集成 ESlint+Prettier+commitlint+husky+lint-staged

### Eslint

代码检测以及一致性

首先安装 ESLint

```js
pnpm add eslint -D -w
```

初始化 ESLint

```
pnpm create @eslint/config
```

此时会出现一些选项让我们选择,如下 根据自己的需求选择即可
会生成对应的.eslintrc.cjs

```ts
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-essential", "plugin:@typescript-eslint/recommended"],
	globals: {
		defineOptions: true
	},
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parser: "@typescript-eslint/parser"
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/ban-ts-comment": "off",
		"vue/multi-word-component-names": "off"
	}
};
```

同时我们新建.eslintignore 来忽略一些文件的校验

```
**.d.ts
/packages/easyest
dist
node_modules

```

然后我们在 package.json 的 script 中添加命令 lint:script

```json
"scripts": {
    "lint:script": "eslint --ext .js,.jsx,.vue,.ts,.tsx --fix --quiet ./"
  },
```

运行 npm run lint:script 既可以检查出代码中有问题的地方

### Prettier

统一的代码格式化

安装 Prettier

```
pnpm add prettier -D -w
```

新建文件.prettierrc.cjs

```cjs
module.exports = {
	printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
	tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
	useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
	singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
	semi: true, // 行尾是否使用分号，默认为true
	trailingComma: "none", // 是否使用尾逗号
	bracketSpacing: true // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
};
```

可以根据自己的需求修改配置

安装 eslint-config-prettier(覆盖 eslint 本身规则)和 eslint-plugin-prettier(Prettier 来接管 eslint --fix 即修复代码的能力)

```
pnpm add eslint-config-prettier eslint-plugin-prettier -D -w
```

配置.eslintrc.cjs,新增的部分加了注释

```ts
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
		"vue/multi-word-component-names": "off"
	}
};
```

最后执行 pnpm run lint:script 即可完成 ESLint 规则校验检查以及 Prettier 的自动修复

### husky+lint-staged

husky 是一个用来管理 git hook 的工具，git hook 即在我们使用 git 提交代码的过程中会触发的钩子。
lint-staged 本地暂存代码检查工具(即在 commit 阶段进行代码检测)
安装依赖

```ts
pnpm add lint-staged husky -D -w
npm set-script prepare "husky install" // 在package.json中添加脚本
npm run prepare // 初始化husky,将 git hooks 钩子交由,husky执行
```

初始化 husky, 会在根目录创建 .husky 文件夹

```
npx husky add .husky/pre-commit "npx lint-staged"
```

pre-commit 执行 npx lint-staged 指令
packages.json 添加配置

```json
 "lint-staged": {
        "*.{js,vue,ts,jsx,tsx}": [
            "prettier --write",
            "eslint --fix"
        ],
        "*.{html,css,less,scss,md}": [
            "prettier --write"
        ]
    },
```

当我们执行 git commit 的时候就会执行我们的 lint-staged 里面的配置
对代码进行检测和格式化

### commitlint+commitizen

commitlint 是一个 commit 信息校验工具
commitizen 辅助 commit 信息 ,就像这样,通过选择输入,规范提交信息
安装依赖

```
pmpn add commitlint @commitlint/config-conventional -D -w
```

执行 pnpm husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'  
生成对应的 commit-msg 文件
