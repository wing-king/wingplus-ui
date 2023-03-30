## 搭建一个组件以及对外输出

### 项目结构

在 packages 文件下新建两个文件夹 components / utils 文件夹
初始化 npmp init 并修改名称

components 修改 packages.json

```json
{
	"name": "@wingplus-ui/components",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```

utils 修改 packages.json

```json
{
	"name": "@wingplus-ui/utils",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```

<font color="red">参考截图 imgs/1.webp</font>

### 开始编写组件

在 button.vue 中写入

```
<template>
  <button>按钮</button>
</template>
```

或者 button.tsx

```ts
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'button',
	setup(props, ctx) {
		return () => <div>button</div>;
	}
});
```

二者任选其一都可以

在 button/index.ts 将其导出

```
import Button from "./button.vue";
export { Button };
export default Button;
```

<font color="red">注意后缀的问题,tsx 文件不需要加入后缀</font>

因为我们后面会有很多组件的,所以我们需要在 components/src/index.ts 集中导出所有组件

```
export * from "./button";
```

最后在 components/index.ts 导出所有组件提供给外部使用

```
export * from "./src/index";
```

接下来在原有的 view 添加对应的引用依赖

```
npm add @wingplus-ui/components -w
```

然后再 app.vue 中引用 Button

```
<template>
  <div>
    <Button />
  </div>
</template>
<script lang="ts" setup>
import { Button } from "@easyest/components";
</script>
```

npm run dev 启动即可看到效果

### 添加全局引用以及单个组件引用

全局挂载/以及组件单个的全局挂载
基于 vue 自带的 vue.use 方法，需要有一个 install 函数
把对应的公共方法添加对 utils
新建一个 with-install.ts 文件 ，可以直接引用也可参考现有的项目结构，放在对应的一个 index.ts 文件输出  
内容参考如下

```ts
import type { App, Component } from 'vue';
import { uiName } from './config';
type EventShim = {
	new (...args: any[]): {
		$props: {
			onClick?: (...args: any[]) => void;
		};
	};
};

export type WithInstall<T> = T & {
	install(app: App): void;
} & EventShim;

export function withInstall<T extends Component>(options: T) {
	(options as Record<string, unknown>).install = (app: App) => {
		const { name } = options;
		if (name) {
			app.component(`${uiName}-${name}`, options);
			app.component(`${uiName}-${name}`, options);
		}
	};

	return options as WithInstall<T>;
}
```

对应的 button/index.ts 引用对应的方法，进行包装输出

```ts
import { withInstall } from '@wingplus-ui/utils';
import Button from './button';
export const WpButton = withInstall(Button);
export default WpButton;
declare module 'vue' {
	export interface GlobalComponents {
		WpButton: typeof WpButton;
	}
}
```

引用方式

> 全局引用组件库
> view/main.ts

```ts
import { createApp } from 'vue';
import App from './app.vue';
import wingplusUI from '@wingplus-ui/components';
const app = createApp(App);
app.use(wingplusUI);
app.mount('#app');
```

> 全局引用单个组件
> view/main.ts

```ts
import { createApp } from 'vue';
import App from './app.vue';
import { WpButton } from '@wingplus-ui/components';
const app = createApp(App);
app.use(WpButton);

app.mount('#app');
```

> 文件内部单独引用单个组件
> view/main.ts

```tsx
<template>
    <wp-button></wp-button>
</template>
<script lang="ts" >
import { WpButton } from "@wingplus-ui/components";
import { defineComponent } from "vue";

export default defineComponent({
    components: { WpButton },
});
</script>

```
