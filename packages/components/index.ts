export * from "./compoents";
import * as components from "./compoents";
import { App, Component } from "vue";
export default {
	install: (app: App) => {
		const compoentsList: Component = Object.keys(components)
			.filter((item) => typeof (components as any)?.[item] === "object")
			.map((key) => (components as any)?.[key]);
		for (const c in compoentsList) {
			app.use(compoentsList[c as keyof typeof compoentsList]);
		}
	}
};
