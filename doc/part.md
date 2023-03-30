## Monorepo 的使用

> pnpm init 初始化项目

设置 name 名称@wingplus-ui/a 等

```json
{
	"name": "@wingplus-ui/a",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"type": "module",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},

	"keywords": [],
	"author": "",
	"license": "ISC"
}
```

根目录 创建 pnpm-workspace.yaml 文件

```js
packages: -'packages/**';
```

关联设置用：

在 b 文件夹下运行指令

> pnpm add @wingplus-ui/a
