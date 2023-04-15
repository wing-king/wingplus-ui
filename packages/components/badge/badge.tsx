import { CSSProperties, computed, defineComponent } from "vue";
import { createNamespace, isDef, isNumeric, addUnit } from "../utils";
import "./badge.less";
import { BadgeProps } from "./types";

const [name, bem] = createNamespace("badge");
export default defineComponent({
	name,
	props: BadgeProps,
	setup(props, { slots }) {
		const hasContent = () => {
			if (slots.content) {
				return true;
			}
			return (
				isDef(props.content) &&
				props.content !== "" &&
				(props.showZero || (props.content !== 0 && props.content !== "0"))
			);
		};
		const renderContent = () => {
			const { dot, max, content } = props;

			if (!dot && hasContent()) {
				if (slots.content) {
					return slots.content();
				}

				if (isDef(max) && isNumeric(content!) && +content > +max) {
					return `${max}+`;
				}

				return content;
			}
		};
		const getOffsetWithMinusString = (val: string) => (val.startsWith("-") ? val.replace("-", "") : `-${val}`);

		const style = computed(() => {
			const style: CSSProperties = {
				background: props.color
			};

			if (props.offset) {
				const [x, y] = props.offset;
				const { position } = props;
				const [offsetY, offsetX] = position.split("-") as ["top" | "bottom", "left" | "right"];

				if (slots.default) {
					if (typeof y === "number") {
						style[offsetY] = addUnit(offsetY === "top" ? y : -y);
					} else {
						style[offsetY] = offsetY === "top" ? addUnit(y) : getOffsetWithMinusString(y);
					}

					if (typeof x === "number") {
						style[offsetX] = addUnit(offsetX === "left" ? x : -x);
					} else {
						style[offsetX] = offsetX === "left" ? addUnit(x) : getOffsetWithMinusString(x);
					}
				} else {
					style.marginTop = addUnit(y);
					style.marginLeft = addUnit(x);
				}
			}
			return style;
		});
		const renderBadge = () => {
			const className = bem([props.position, { dot: props.dot, fixed: !!slots.default }]);
			if (hasContent() || props.dot) {
				return (
					<div class={className} style={style.value}>
						{renderContent()}
					</div>
				);
			}
		};
		return () => {
			if (slots.default) {
				const { tag } = props;
				const className = bem("wrapper");
				return (
					<tag class={className}>
						{slots.default()}
						{renderBadge()}
					</tag>
				);
			}

			return renderBadge();
		};
	}
});
