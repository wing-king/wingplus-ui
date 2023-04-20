import { ExtractPropTypes, type PropType } from "vue";
import { extend, makeStringProp, numericProp, truthProp, unknownProp } from "../utils";
export type CheckerShape = "square" | "round";
export type CheckerDirection = "horizontal" | "vertical";
export type CheckerLabelPosition = "left" | "right";
export type CheckerParent = {
	props: {
		disabled?: boolean;
		iconSize?: Numeric;
		direction?: CheckerDirection;
		checkedColor?: string;
	};
};

export type Numeric = number | string;

export const CheckerProps = {
	name: unknownProp,
	shape: makeStringProp<CheckerShape>("round"),
	disabled: Boolean,
	iconSize: numericProp,
	modelValue: unknownProp,
	checkedColor: String,
	labelPosition: String as PropType<CheckerLabelPosition>,
	labelDisabled: Boolean
};

export const checkerProps = CheckerProps;
export type CheckerProps = ExtractPropTypes<typeof CheckerProps>;
