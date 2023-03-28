# wingplus-ui
## 组件库搭建项目
### Monorepo 的使用
pnpm init 初始化项目
设置name 名称@wingplus-ui/a 等
根目录 创建 pnpm-workspace.yaml  文件
`
packages:
- 'packages/**'
`
关联设置用：
在b文件夹下运行指令
pnpm add @wingplus-ui/a 
