export * from "./compoents";
import * as components from "./compoents";
import { App } from "vue";
export default {
	install: (app: App) => {
		for (const c in components) {
			app.use(components[c as keyof typeof components]);
		}
	}
};
