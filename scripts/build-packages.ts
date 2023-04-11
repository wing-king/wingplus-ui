import { resolve } from "path";
const uiName = "wingplusUI";

const suffixlist: any = {
	es: "mjs",
	cjs: "js",
	umd: "umd.js"
};

const outputItemFun = (module: string) => {
	return {
		format: module,
		//打包后文件名
		entryFileNames: `[name].${suffixlist[module]}`,
		assetFileNames: "theme-chalk/[name].[ext]",
		//让打包目录和我们目录对应
		preserveModules: false,
		exports: "named",
		//配置打包根目录
		dir: resolve(__dirname, `../${uiName}/${module}/lib`)
	};
};
export const dtsFun = (module?: string) => {
	return {
		entryRoot: "./",
		outputDir: module
			? resolve(__dirname, `../${uiName}/${module}/lib`)
			: Object.keys(suffixlist).map((item) => resolve(__dirname, `../${uiName}/${item}/lib`)),
		//指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
		tsConfigFilePath: resolve(__dirname, "../tsconfig.json")
	};
};

export const outFun = (module?: string) => {
	if (module) {
		return [outputItemFun(module)];
	} else {
		return Object.keys(suffixlist).map((item) => outputItemFun(item));
	}
};
