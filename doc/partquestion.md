## 问题收集

1. 解决 pnpm 安装报 missing peer

```ts
hint: If you want peer dependencies to be automatically installed, add "auto-install-peers=true" to an .npmrc file at the root of your project.
hint: If you don't want pnpm to fail on peer dependency issues, add "strict-peer-dependencies=false" to an .npmrc file at the root of your project.

在vue项目根目录下新建一个.npmrc文件，填入下方内容即可

auto-install-peers=true

strict-peer-dependencies=false
```
