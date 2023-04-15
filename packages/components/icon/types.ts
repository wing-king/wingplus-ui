import { ExtractPropTypes, type CSSProperties, PropType } from "vue";

import { makeStringProp } from "../utils";

export type IconSize = "large" | "normal" | "small" | "mini";

export const IconProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>("span"),
	name: String,
	badge: String,
	dot: Boolean,
	size: makeStringProp<IconSize>("normal"),
	color: String,
	style: Object
};
export type IconProps = ExtractPropTypes<typeof IconProps>;
