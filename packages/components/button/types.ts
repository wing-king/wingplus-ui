import { ButtonHTMLAttributes, ExtractPropTypes } from "vue";

import { makeStringProp } from "../utils";

export type ButtonType = "default" | "primary" | "success" | "warning" | "danger";

export type ButtonSize = "large" | "normal" | "small" | "mini";

export type ButtonIconPosition = "left" | "right";
export type ButtonNativeType = NonNullable<ButtonHTMLAttributes["type"]>;
export const ButtonProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>("button"),
	text: String,
	icon: String,
	iconPosition: makeStringProp<ButtonIconPosition>("left"),
	iconSize: makeStringProp<ButtonSize>("normal"),
	block: Boolean,
	disabled: Boolean,
	type: makeStringProp<ButtonType>("default"),
	size: makeStringProp<ButtonSize>("normal"),
	plain: Boolean,
	round: Boolean,
	color: String,
	nativeType: makeStringProp<ButtonNativeType>("button")
};

export type ButtonProps = ExtractPropTypes<typeof ButtonProps>;
