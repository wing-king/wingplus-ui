import { ExtractPropTypes } from "vue";
import { numericProp, makeStringProp } from "../utils";
export type LoadingType = "circular" | "spinner";

export const loadingProps = {
	size: numericProp,
	type: makeStringProp<LoadingType>("circular"),
	color: String,
	vertical: Boolean,
	textSize: numericProp,
	textColor: String
};

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
