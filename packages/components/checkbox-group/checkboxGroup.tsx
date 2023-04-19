import { watch, defineComponent, type InjectionKey } from "vue";

// Utils
import { createNamespace } from "../utils";

// Composables
import { useChildren, useCustomFieldValue } from "@wingplus-ui/use";
import { useExpose } from "../composables/use-expose";

import { CheckboxGroupExpose, CheckboxGroupProvide, CheckboxGroupToggleAllOptions, checkboxGroupProps } from "./types";

const [name, bem] = createNamespace("checkbox-group");

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupProvide> = Symbol(name);

export default defineComponent({
	name,

	props: checkboxGroupProps,

	emits: ["change", "update:modelValue"],

	setup(props, { emit, slots }) {
		const { children, linkChildren } = useChildren(CHECKBOX_GROUP_KEY);

		const updateValue = (value: unknown[]) => emit("update:modelValue", value);

		const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
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

		useExpose<CheckboxGroupExpose>({ toggleAll });
		useCustomFieldValue(() => props.modelValue);
		linkChildren({
			props,
			updateValue
		});

		return () => <div class={bem([props.direction])}>{slots.default?.()}</div>;
	}
});
