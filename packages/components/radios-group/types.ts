import type { ComponentPublicInstance, ExtractPropTypes, PropType } from "vue";
import type { CheckerParent, CheckerDirection } from "../checker/types";
import { makeArrayProp, numericProp, unknownProp } from "../utils";

export type RadioGroupDirection = CheckerDirection;

export type RadioGroupToggleAllOptions =
	| boolean
	| {
			checked?: boolean;
			skipDisabled?: boolean;
	  };

export type RadioGroupExpose = {
	toggleAll: (options?: RadioGroupToggleAllOptions) => void;
};
export const radioGroupProps = {
	max: numericProp,
	disabled: Boolean,
	iconSize: numericProp,
	direction: String as PropType<CheckerDirection>,
	modelValue: unknownProp,
	checkedColor: String
};

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

export type RadioGroupInstance = ComponentPublicInstance<RadioGroupProps, RadioGroupExpose>;

export type RadioGroupProvide = CheckerParent & {
	props: RadioGroupProps;
	updateValue: (value: unknown[]) => void;
};
