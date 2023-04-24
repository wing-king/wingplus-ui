import { addUnit, createNamespace, extend, getSizeStyle } from "../utils";
import { computed, defineComponent } from "vue";
import { loadingProps } from "./types";
import "./loading.less";

const [name, bem] = createNamespace("loading");

const SpinIcon: JSX.Element[] = Array(12)
	.fill(null)
	.map((_, index) => <i class={bem("line", String(index + 1))} />);

const CircularIcon = (
	<svg class={bem("circular")} viewBox="25 25 50 50">
		<circle cx="50" cy="50" r="20" fill="none" />
	</svg>
);

export default defineComponent({
	name,

	props: loadingProps,
	setup(props, { slots }) {
		const spinnerStyle = computed(() => extend({ color: props.color }, getSizeStyle(props.size)));

		const renderIcon = () => {
			const DefaultIcon = props.type === "spinner" ? SpinIcon : CircularIcon;
			return (
				<span class={bem("spinner", props.type)} style={spinnerStyle.value}>
					{slots.icon ? slots.icon() : DefaultIcon}
				</span>
			);
		};

		const renderText = () => {
			if (slots.default) {
				return (
					<span
						class={bem("text")}
						style={{
							fontSize: addUnit(props.textSize),
							color: props.textColor ?? props.color
						}}
					>
						{slots.default()}
					</span>
				);
			}
		};

		return () => {
			const { type, vertical } = props;
			return (
				<div class={bem([type, { vertical }])} aria-live="polite" aria-busy={true}>
					{renderIcon()}
					{renderText()}
				</div>
			);
		};
	}
});
