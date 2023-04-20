import { ComputedRef, ExtractPropTypes, type PropType } from "vue";

import { extend, makeStringProp, numericProp, truthProp, unknownProp } from "../utils";
export type CheckerShape = "square" | "round";
export type CheckerDirection = "horizontal" | "vertical";
export type CheckerLabelPosition = "left" | "right";
export type CheckboxExpose = {
	toggle: (newValue?: boolean) => void;
	/** @private */
	props: CheckboxProps;
	/** @private */
	checked: ComputedRef<boolean>;
};
export type CheckerParent = {
	props: {
		disabled?: boolean;
		iconSize?: Numeric;
		direction?: CheckerDirection;
		checkedColor?: string;
	};
};

export type Numeric = number | string;
export const checkerProps = {
	name: unknownProp,
	shape: makeStringProp<CheckerShape>("round"),
	disabled: Boolean,
	iconSize: numericProp,
	modelValue: unknownProp,
	checkedColor: String,
	labelPosition: String as PropType<CheckerLabelPosition>,
	labelDisabled: Boolean
};
export const CheckboxProps = extend({}, checkerProps, {
	bindGroup: truthProp
});
export type CheckerProps = ExtractPropTypes<typeof checkerProps>;
export type CheckboxProps = ExtractPropTypes<typeof CheckboxProps>;
