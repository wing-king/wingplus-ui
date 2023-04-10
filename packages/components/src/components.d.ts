import * as components from "./index";
declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		WpButton: typeof components.Button;
		WpIcon: typeof components.Icon;
	}
}
export {};
