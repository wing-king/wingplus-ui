import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { outFun, dtsFun } from "../../scripts/build-packages";
import { resolve } from "path";
const module = process.env.CROSS_ENV;
const dir = !module ? resolve(__dirname, "../../lib") : "";
const lib = !module
	? {
			entry: "./index.ts",
			name: "wingplusUI",
			fileName: "wingplusUI",
			formats: ["es", "umd", "cjs"]
	  }
	: "";
const output = !module
	? {
			globals: {
				vue: "Vue"
			},
			assetFileNames: "theme-chalk/index.[ext]",
			//让打包目录和我们目录对应
			preserveModules: false,
			exports: "named",
			dir
	  }
	: outFun(module);
export default defineConfig({
	build: {
		// cssCodeSplit: true,
		//压缩
		minify: true,
		rollupOptions: {
			//忽略打包vue文件
			external: ["vue"],
			input: ["index.ts"],
			output
		},
		lib
	},
	plugins: [
		vue(),
		vueJsx(),
		!module
			? dts({
					exports: "named",
					outputDir: resolve(__dirname, "../../lib")
			  })
			: dts(dtsFun(module))
	]
});
