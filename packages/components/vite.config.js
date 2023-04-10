import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { outFun, dtsFun } from "../../scripts/build-packages";
const module = process.env.CROSS_ENV;
export default defineConfig({
	build: {
		//打包文件目录
		outDir: "package",
		//压缩
		//minify: false,
		rollupOptions: {
			//忽略打包vue文件
			external: ["vue"],
			input: ["index.ts"],
			output: outFun(module)
		},
		lib: {
			entry: "./index.ts"
		}
	},
	plugins: [vue(), vueJsx(), dts(dtsFun(module))]
});
