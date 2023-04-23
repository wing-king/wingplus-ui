import { truthProp } from "../utils";
import { ExtractPropTypes } from "vue";

export const cellGroupProps = {
	title: String,
	inset: Boolean,
	border: truthProp
};

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;
