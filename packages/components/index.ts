export * from "./src/index";
import * as components from "./src/index";
import { App } from "vue";

export default {
	install: (app: App) => {
		for (const c in components) {
			app.use(components[c as keyof typeof components]);
		}
	}
};
