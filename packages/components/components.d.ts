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
		WpRadio: typeof components.Radio;
		WpRadioGroup: typeof components.RadioGroup;
		WpCell: typeof components.Cell;
		WpCellGroup: typeof components.CellGroup;
		WpLoading: typeof components.Loading;
		WpToast: typeof components.Toast;
		WpPicker: typeof components.Picker;
	}
}
export {};
