import * as components from "./compoents";
declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		WpButton: typeof components.Button;
		WpIcon: typeof components.Icon;
		wpBadge: typeof components.Badge;
		wpOverlay: typeof components.Overlay;
		wpPopup: typeof components.Popup;
		WpCheckbox: typeof components.Checkbox;
		WpCheckboxGroup: typeof components.CheckboxGroup;
	}
}
export {};
