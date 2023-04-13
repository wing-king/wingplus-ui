import { defineComponent, CSSProperties, ExtractPropTypes } from "vue";
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
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export default defineComponent({
	name,
	props: buttonProps,
	emits: ["click"],
	setup(props, { slots, emit }) {
		const renderText = () => <span class={bem("text")}>{props.text ? props.text : slots?.default?.()}</span>;
		const getStyle = () => {
			if (props.color) {
				const style: CSSProperties = {
					color: props.plain ? props.color : "white"
				};
				if (!props.plain) {
					style.background = props.color;
				}
				if (props.color.includes("gradient")) {
					style.border = 0;
				} else {
					style.borderColor = props.color;
				}
				return style;
			}
		};
		const onClick = (event: MouseEvent) => {
			emit("click", event);
		};
		const renderIcon = () => {
			if (slots.icon) {
				return <div class={bem("icon")}>{slots.icon()}</div>;
			}
			if (props.icon) {
				return <Icon style={getStyle()} name={props.icon} class={bem("icon")} />;
			}
		};
		return () => {
			const { tag, text, type, icon, iconPosition, size, plain, round, disabled, block } = props;
			const className = bem([size, type, { disabled, block, round, text, icon, plain }]);
			return (
				<tag style={getStyle()} onClick={onClick} class={className}>
					{iconPosition === "left" && renderIcon()}
					{renderText()}
					{iconPosition === "right" && renderIcon()}
				</tag>
			);
		};
	}
});
