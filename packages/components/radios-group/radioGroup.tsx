import { watch, defineComponent, type InjectionKey } from "vue";
import "./radioGroup.less";
// Utils
import { createNamespace } from "../utils";

// Composables
import { useChildren, useCustomFieldValue } from "@wingplus-ui/use";
import { useExpose } from "../composables/use-expose";

import { RadioGroupExpose, RadioGroupProvide, RadioGroupToggleAllOptions, radioGroupProps } from "./types";

const [name, bem] = createNamespace("radio-group");
export const RADIO_GROUP_KEY: InjectionKey<RadioGroupProvide> = Symbol(name);
export default defineComponent({
	name,

	props: radioGroupProps,

	emits: ["change", "update:modelValue"],

	setup(props, { emit, slots }) {
		const { children, linkChildren } = useChildren(RADIO_GROUP_KEY);

		const updateValue = (value: unknown[]) => emit("update:modelValue", value);

		const toggleAll = (options: RadioGroupToggleAllOptions = {}) => {
			if (typeof options === "boolean") {
				options = { checked: options };
			}

			const { checked, skipDisabled } = options;

			const checkedChildren = children.filter((item: any) => {
				if (!item.props.bindGroup) {
					return false;
				}
				if (item.props.disabled && skipDisabled) {
					return item.checked.value;
				}
				return checked ?? !item.checked.value;
			});

			const names = checkedChildren.map((item: any) => item.name);
			updateValue(names);
		};

		watch(
			() => props.modelValue,
			(value) => emit("change", value)
		);

		useExpose<RadioGroupExpose>({ toggleAll });
		useCustomFieldValue(() => props.modelValue);
		linkChildren({
			props,
			updateValue
		});

		return () => <div class={bem([props.direction])}>{slots.default?.()}</div>;
	}
});
