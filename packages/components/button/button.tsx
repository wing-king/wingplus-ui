import { defineComponent, CSSProperties } from "vue";
import { createNamespace, makeStringProp } from "../utils";
import "./button.less";
import { ButtonType, ButtonSize, ButtonIconPosition } from "./types";
import { Icon } from "../compoents";
const [name, bem] = createNamespace("button");
const buttonProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>("button"),
	text: String,
	icon: String,
	block: Boolean,
	disabled: Boolean,
	type: makeStringProp<ButtonType>("default"),
	size: makeStringProp<ButtonSize>("normal"),
	plain: Boolean,
	round: Boolean,
	color: String,
	iconPosition: makeStringProp<ButtonIconPosition>("left")
};
export default defineComponent({
	name,
	props: buttonProps,
	emits: ["click"],
	setup(props, { slots, emit }) {
		const { tag, text, type, icon, iconPosition, size, plain, round, color, disabled, block } = props;
		const className = bem([size, type, { disabled, block, round }]);
		const renderText = () => <span class={bem("text")}>{text ? text : slots?.default?.()}</span>;
		const getStyle = () => {
			if (color) {
				const style: CSSProperties = {
					color: plain ? color : "white"
				};
				if (!plain) {
					style.background = color;
				}

				if (color.includes("gradient")) {
					style.border = 0;
				} else {
					style.borderColor = color;
				}
				return style;
			}
		};
		const onClick = (event: MouseEvent) => emit("click", event);
		const renderIcon = () => {
			if (slots.icon) {
				return <div class={bem("icon")}>{slots.icon()}</div>;
			}

			if (icon) {
				return <Icon style={getStyle()} name={icon} class={bem("icon")} />;
			}
		};
		return () => (
			<tag disabled style={getStyle()} onClick={onClick} class={className}>
				{iconPosition === "left" && renderIcon()}
				{renderText()}
			</tag>
		);
	}
});
