## 组件库环境的配置

### 相关依赖的安装

-   安装依赖
-   初始化 TS
-   安装 vite
-   支持 jsx/tsx 文件

#### 安装依赖

依赖包括 vue+ts+less

```
pnpm add vue@next typescript less -D -w
```

#### ts 初始化

```
npx tsc --init
```

配置可以参考这个

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"jsx": "preserve",
		"strict": true,
		"target": "ES2015",
		"module": "ESNext",
		"skipLibCheck": true,
		"esModuleInterop": true,
		"moduleResolution": "Node",
		"lib": ["esnext", "dom"]
	}
}
```

#### 安装 vite 工具

在项目根目录下新建 view 用于组件的显示
初始化项目 pnpm init

安装依赖 vite

```
pnpm add vite @vitejs/plugin-vue -D
```

配置 vite.config.ts

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()]
});
```

---

在当前 view 目录下新建相关文件

-   index.html
-   app.vue
-   main.ts

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>组件库预览</title>
	</head>

	<body>
		<div id="app"></div>
		<script src="main.ts" type="module"></script>
	</body>
</html>
```

<font color="#fc5531">因为 vite 是基于 esmodule 的,所以 script 标签中需要添加 type="module"</font>

**app.vue**

```vue
<template>
	<div>测试文件</div>
</template>
```

**main.ts**

```ts
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);

app.mount('#app');
```

---

关联组件库

修改 pnpm-workspace.yaml 文件的配置  
添加 view 文件关联 s

```
packages:
- "packages/**"
- "view"
```

<font color="#fc5531">解决.vue 文件爆红问题</font>  
添加 vue-shim.d.ts 文件

```
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
  }
```

### 支持 jsx/tsx 文件

安装依赖

```
pnpm add @vitejs/plugin-vue-jsx -D
```

配置 vie-config.ts 文件, 添加 jsx/tsx 的配置

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
	plugins: [vue(), vueJsx()]
});
```

-   .vue+lang="tsx"
-   .tsx
-   .tsx+函数式编程

**.vue+lang="tsx"**  
exp.vue 文件

```
<script lang="tsx">
import { defineComponent } from "vue";
export default defineComponent({
    name: "app",
    setup(props, ctx) {
        return () => <div>这是一个.vue支持tsx的写法</div>;
    },
});
</script>

```

**.tsxs**  
exp1.tsxs

```tsx
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'app',
	setup(props, ctx) {
		return () => <div>这是一个.tsx支持tsx的写法</div>;
	}
});
```

**.tsx+函数式编程**  
exp2.tsx

```tsx
export default () => <div>这是一个.tsx支持函数编程的写法</div>;
```

<font color="#fc5531">.tsx 文件引用不需要后缀名</font>
