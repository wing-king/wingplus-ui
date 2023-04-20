import { ComputedRef, ExtractPropTypes, type PropType } from "vue";

import { extend, makeStringProp, numericProp, truthProp, unknownProp } from "../utils";
export type RadioShape = "square" | "round";
export type RadioDirection = "horizontal" | "vertical";
export type RadioLabelPosition = "left" | "right";
export type RadioExpose = {
	toggle: (newValue?: boolean) => void;
	/** @private */
	props: RadioProps;
	/** @private */
	checked: ComputedRef<boolean>;
};
export type RadioParent = {
	props: {
		disabled?: boolean;
		iconSize?: Numeric;
		direction?: RadioDirection;
		checkedColor?: string;
	};
};

export type Numeric = number | string;

export const radioProps = extend({
	name: unknownProp,
	shape: makeStringProp<RadioShape>("round"),
	disabled: Boolean,
	iconSize: numericProp,
	modelValue: unknownProp,
	checkedColor: String,
	labelPosition: String as PropType<RadioLabelPosition>,
	labelDisabled: Boolean
});
export const CheckboxProps = extend({}, radioProps, {
	bindGroup: truthProp
});
export type RadioProps = ExtractPropTypes<typeof radioProps>;
