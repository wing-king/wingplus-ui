import { ExtractPropTypes, type PropType } from "vue";

import { makeStringProp, numericProp, truthProp } from "../utils";
export type CheckerShape = "square" | "round";
export type CheckerLabelPosition = "left" | "right";

export type Numeric = number | string;
export const BadgeProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>("span"),
	badge: String,
	dot: Boolean,
	color: String,
	content: numericProp,
	max: numericProp,
	showZero: truthProp,
	position: makeStringProp<BadgePosition>("top-right"),
	offset: Array as unknown as PropType<[Numeric, Numeric]>
};
export type BadgeProps = ExtractPropTypes<typeof BadgeProps>;
