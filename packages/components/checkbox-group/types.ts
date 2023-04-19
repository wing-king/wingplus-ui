import type { ComponentPublicInstance, ExtractPropTypes, PropType } from "vue";
import type { CheckerParent, CheckerDirection } from "../checker/types";
import { makeArrayProp, numericProp } from "../utils";

export type CheckboxGroupDirection = CheckerDirection;

export type CheckboxGroupToggleAllOptions =
	| boolean
	| {
			checked?: boolean;
			skipDisabled?: boolean;
	  };

export type CheckboxGroupExpose = {
	toggleAll: (options?: CheckboxGroupToggleAllOptions) => void;
};
export const checkboxGroupProps = {
	max: numericProp,
	disabled: Boolean,
	iconSize: numericProp,
	direction: String as PropType<CheckerDirection>,
	modelValue: makeArrayProp<unknown>(),
	checkedColor: String
};

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;

export type CheckboxGroupInstance = ComponentPublicInstance<CheckboxGroupProps, CheckboxGroupExpose>;

export type CheckboxGroupProvide = CheckerParent & {
	props: CheckboxGroupProps;
	updateValue: (value: unknown[]) => void;
};
