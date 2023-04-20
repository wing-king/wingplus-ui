import { ref, computed, defineComponent, PropType } from "vue";
import { Icon } from "../icon";

import { CheckerParent, CheckerProps } from "./types";
import { addUnit, createNamespace, extend, truthProp } from "../utils";
const [name] = createNamespace("checker");
export default defineComponent({
	name,
	props: extend(CheckerProps, {
		bem: Function,
		role: String,
		parent: Object as PropType<CheckerParent | null>,
		checked: Boolean,
		bindGroup: truthProp
	}),

	emits: ["click", "toggle"],

	setup(props, { emit, slots }) {
		const iconRef = ref<HTMLElement>();

		const getParentProp = <T extends keyof CheckerParent["props"]>(name: T) => {
			if (props.parent && props.bindGroup) {
				return props.parent.props[name];
			}
		};

		const disabled = computed(() => getParentProp("disabled") || props.disabled);

		const direction = computed(() => getParentProp("direction"));

		const iconStyle = computed(() => {
			let style = {};
			const checkedColor = props.checkedColor || getParentProp("checkedColor");

			if (checkedColor && props.checked && !disabled.value) {
				style = {
					borderColor: checkedColor,
					backgroundColor: checkedColor
				};
			}
			return style;
		});

		const onClick = (event: MouseEvent) => {
			const { target } = event;
			const icon = iconRef.value;
			const iconClicked = icon === target || icon?.contains(target as Node);

			if (!disabled.value && (iconClicked || !props.labelDisabled)) {
				emit("toggle");
			}
			emit("click", event);
		};
		const renderIcon = () => {
			const { bem, shape, checked } = props;
			const iconSize = props.iconSize || getParentProp("iconSize");
			return (
				<div
					ref={iconRef}
					class={bem?.("icon", [shape, { disabled: disabled.value, checked }])}
					style={{ fontSize: addUnit(iconSize) }}
				>
					{slots.icon ? (
						slots.icon({ checked, disabled: disabled.value })
					) : (
						<Icon name="select" style={iconStyle.value} />
					)}
				</div>
			);
		};

		const renderLabel = () => {
			if (slots.default) {
				return (
					<span class={props.bem?.("label", [props.labelPosition, { disabled: disabled.value }])}>
						{slots.default()}
					</span>
				);
			}
		};

		return () => {
			const nodes: (JSX.Element | undefined)[] =
				props.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];

			return (
				<div
					role={props.role}
					class={props.bem?.([
						{
							disabled: disabled.value,
							"label-disabled": props.labelDisabled
						},
						direction.value
					])}
					tabindex={disabled.value ? undefined : 0}
					aria-checked={props.checked}
					onClick={onClick}
				>
					{nodes}
				</div>
			);
		};
	}
});
