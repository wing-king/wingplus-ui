import { watch, computed, defineComponent } from "vue";
import "./checkbox.less";
// Utils
import { createNamespace, pick } from "../utils";
export type CheckboxGroupProvide = CheckerParent & {
	props: any;
	updateValue: (value: unknown[]) => void;
};
import Checker from "../checker";
// Types
import { CheckboxExpose, CheckboxProps, CheckerParent } from "./types";
import { useExpose } from "../composables";
import { useCustomFieldValue, useParent } from "@wingplus-ui/use";
import { CHECKBOX_GROUP_KEY } from "../checkbox-group/checkboxGroup";

const [name, bem] = createNamespace("checkbox");

export default defineComponent({
	name,

	props: CheckboxProps,

	emits: ["change", "update:modelValue"],

	setup(props, { emit, slots }) {
		const { parent } = useParent(CHECKBOX_GROUP_KEY);

		const setParentValue = (checked: boolean) => {
			const { name } = props;
			const { max, modelValue } = parent!.props;
			const value = modelValue.slice();

			if (checked) {
				const overlimit = max && value.length >= +max;

				if (!overlimit && !value.includes(name)) {
					value.push(name);

					if (props.bindGroup) {
						parent!.updateValue(value);
					}
				}
			} else {
				const index = value.indexOf(name);

				if (index !== -1) {
					value.splice(index, 1);

					if (props.bindGroup) {
						parent!.updateValue(value);
					}
				}
			}
		};

		const checked = computed(() => {
			if (parent && props.bindGroup) {
				return parent.props.modelValue.indexOf(props.name) !== -1;
			}
			return !!props.modelValue;
		});

		const toggle = (newValue = !checked.value) => {
			if (parent && props.bindGroup) {
				setParentValue(newValue);
			} else {
				emit("update:modelValue", newValue);
			}
		};

		watch(
			() => props.modelValue,
			(value) => emit("change", value)
		);

		useExpose<CheckboxExpose>({ toggle, props, checked });
		useCustomFieldValue(() => props.modelValue);

		return () => (
			<Checker
				v-slots={pick(slots, ["default", "icon"])}
				bem={bem}
				role="checkbox"
				parent={parent}
				checked={checked.value}
				onToggle={toggle}
				{...props}
			/>
		);
	}
});
