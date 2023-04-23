import { defineComponent } from "vue";

import "./cell.less";
// Utils
import { isDef, createNamespace } from "../utils";

// Composables
import { useRoute } from "../composables/use-route";

// Components
import { Icon } from "../icon";

import { cellProps } from "./types";

const [name, bem] = createNamespace("cell");

export default defineComponent({
	name,

	props: cellProps,

	setup(props, { slots }) {
		const route = useRoute();

		const renderLabel = () => {
			const showLabel = slots.label || isDef(props.label);
			if (showLabel) {
				return <div class={[bem("label"), props.labelClass]}>{slots.label?.() || props.label}</div>;
			}
		};

		const renderTitle = () => {
			const showTitle = slots.title || isDef(props.title);
			const titleSlot = slots.title?.();
			if (Array.isArray(titleSlot) && titleSlot.length === 0) return;
			if (showTitle) {
				return (
					<div class={[bem("title"), props.titleClass]} style={props.titleStyle}>
						{titleSlot || <span>{props.title}</span>}
						{renderLabel()}
					</div>
				);
			}
		};
		const renderLeftIcon = () => {
			if (slots["left-icon"]) {
				return slots["left-icon"]();
			}
			if (slots.icon) {
				return slots.icon();
			}
			if (props.icon || props.leftIcon) {
				return <Icon name={props.icon || props.leftIcon} class={bem("left-icon")} />;
			}
		};
		const renderValue = () => {
			const slot = slots.value || slots.default;
			const hasValue = slot || isDef(props.value);
			console.log("props.value :>> ", props.value);
			if (hasValue) {
				return <div class={[bem("value"), props.valueClass]}>{slot ? slot() : <span>{props.value}</span>}</div>;
			}
		};
		const renderRightIcon = () => {
			if (slots["right-icon"]) {
				return slots["right-icon"]();
			}
			if (props.isLink) {
				const iconName =
					props.arrowDirection && props.arrowDirection !== "right"
						? `arrow-${props.arrowDirection}`
						: "arrow-down";
				return <Icon name={iconName} class={bem("right-icon")} />;
			}
			if (props.rightIcon) {
				return <Icon name={props.rightIcon} class={bem("right-icon")} />;
			}
		};
		return () => {
			const { tag, size, center, border, isLink, required } = props;
			const clickable = props.clickable ?? isLink;

			const className: Record<string, boolean | undefined> = {
				center,
				required,
				clickable,
				borderless: !border
			};
			if (size) {
				className[size] = !!size;
			}
			return (
				<tag
					class={bem(className)}
					role={clickable ? "button" : undefined}
					tabindex={clickable ? 0 : undefined}
					onClick={route}
				>
					{renderLeftIcon()}
					{renderTitle()}
					{renderValue()}
					{renderRightIcon()}
					{slots.extra?.()}
				</tag>
			);
		};
	}
});
