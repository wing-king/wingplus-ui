import { ExtractPropTypes, TeleportProps, type PropType, CSSProperties } from "vue";

import { Interceptor, makeStringProp, numericProp, truthProp, unknownProp, extend } from "../utils";
export type PopupPosition = "top" | "left" | "bottom" | "right" | "center" | "";

export type PopupCloseIconPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export const popupSharedProps = {
	show: Boolean,
	zIndex: numericProp,
	overlay: truthProp,
	duration: numericProp,
	// 指定挂载的元素
	teleport: [String, Object] as PropType<TeleportProps["to"]>,
	// 阻止body滚动
	lockScroll: truthProp,
	// 显示时加载
	lazyRender: truthProp,
	// 关闭前的回调
	beforeClose: Function as PropType<Interceptor>,
	// 遮罩组件样式
	overlayStyle: Object as PropType<CSSProperties>,
	// 遮罩组件class
	overlayClass: unknownProp,
	// 是否在初始渲染时启用过渡动画
	transitionAppear: Boolean,
	// 点击遮罩层关闭组件
	closeOnClickOverlay: truthProp
};

export type PopupSharedPropKeys = Array<keyof typeof popupSharedProps>;

export const popupSharedPropKeys = Object.keys(popupSharedProps) as PopupSharedPropKeys;

export const PopupProps = extend({}, popupSharedProps, {
	round: Boolean,
	position: makeStringProp<PopupPosition>("center"),
	closeIcon: makeStringProp("close"),
	closeable: Boolean,
	transition: String,
	closeOnPopstate: Boolean,
	closeIconPosition: makeStringProp<PopupCloseIconPosition>("top-right"),
	safeAreaInsetTop: Boolean,
	safeAreaInsetBottom: Boolean
});
export type PopupProps = ExtractPropTypes<typeof PopupProps>;
