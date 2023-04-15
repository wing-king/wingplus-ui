import { CSSProperties, ExtractPropTypes, PropType } from "vue";

import { makeStringProp } from "../utils";

export type IconSize = "large" | "normal" | "small" | "mini";

export const IconProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>("span"),
	name: String,
	badge: String,
	dot: Boolean,
	size: makeStringProp<IconSize>("normal"),
	color: String,
	customStyle: Object as PropType<CSSProperties>
};
export type IconProps = ExtractPropTypes<typeof IconProps>;
