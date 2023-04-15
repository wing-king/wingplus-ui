import { defineComponent, CSSProperties } from "vue";
import { createNamespace } from "../utils";
import "./button.less";
import { ButtonProps } from "./types";
import { Icon } from "../compoents";

const [name, bem] = createNamespace("button");

export default defineComponent({
	name,
	props: ButtonProps,
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
				return <Icon style={getStyle()} name={props.icon} size={props.iconSize} class={bem("icon")} />;
			}
		};
		return () => {
			const { tag, text, type, icon, iconPosition, size, plain, round, disabled, block } = props;
			const className = bem([size, type, { disabled, block, round, text, icon, plain }]);
			return (
				<tag type={props.nativeType} style={getStyle()} onClick={onClick} class={className}>
					{iconPosition === "left" && renderIcon()}
					{renderText()}
					{iconPosition === "right" && renderIcon()}
				</tag>
			);
		};
	}
});
