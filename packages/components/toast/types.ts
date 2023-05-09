import type { CSSProperties, ComponentPublicInstance, ExtractPropTypes, PropType, TeleportProps } from "vue";
import { Numeric, makeNumberProp, makeStringProp, numericProp, unknownProp } from "../utils";
import { IconSize } from "../icon";
export type LoadingType = "circular" | "spinner";
export type ToastType = "text" | "loading" | "success" | "warning" | "html";
export type ToastPosition = "top" | "middle" | "bottom";
export type ToastWordBreak = "break-all" | "break-word" | "normal";

export type ToastOptions = {
	icon?: string;
	type?: ToastType;
	mask?: boolean;
	message?: Numeric;
	onClose?: () => void;
	onOpened?: () => void;
	overlay?: boolean;
	duration?: number;
	teleport?: TeleportProps["to"];
	iconSize?: Numeric;
	position?: ToastPosition;
	className?: unknown;
	transition?: string;
	iconPrefix?: string;
	wordBreak?: ToastWordBreak;
	loadingType?: LoadingType;
	forbidClick?: boolean;
	closeOnClick?: boolean;
	overlayClass?: unknown;
	overlayStyle?: Record<string, any>;
	closeOnClickOverlay?: boolean;
};

export type ToastWrapperInstance = ComponentPublicInstance<
	{ message: Numeric },
	{
		close: () => void;
		/**
		 * @private
		 */
		open: (props: Record<string, any>) => void;
	}
>;

export const toastProps = {
	icon: String,
	show: Boolean,
	type: makeStringProp<ToastType>("text"),
	overlay: Boolean,
	message: numericProp,
	iconSize: makeStringProp<IconSize>("normal"),
	duration: makeNumberProp(2000),
	position: makeStringProp<ToastPosition>("middle"),
	teleport: [String, Object] as PropType<TeleportProps["to"]>,
	wordBreak: String as PropType<ToastWordBreak>,
	className: unknownProp,
	transition: makeStringProp("wp-fade"),
	loadingType: String as PropType<LoadingType>,
	forbidClick: Boolean,
	overlayClass: unknownProp,
	overlayStyle: Object as PropType<CSSProperties>,
	closeOnClick: Boolean,
	closeOnClickOverlay: Boolean
};

export type ToastProps = ExtractPropTypes<typeof toastProps>;
