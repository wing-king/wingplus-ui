import { watch, computed, defineComponent } from "vue";
import "./radio.less";
// Utils
import { createNamespace, pick } from "../utils";
export type CheckboxGroupProvide = RadioParent & {
	props: any;
	updateValue: (value: unknown[]) => void;
};
import Checker from "../checker";
// Types
import { RadioExpose, CheckboxProps, RadioParent } from "./types";
import { useExpose } from "../composables";
import { useCustomFieldValue, useParent } from "@wingplus-ui/use";
import { RADIO_GROUP_KEY } from "../radios-group/radioGroup";

const [name, bem] = createNamespace("radio");

export default defineComponent({
	name,

	props: CheckboxProps,

	emits: ["change", "update:modelValue"],

	setup(props, { emit, slots }) {
		const { parent } = useParent(RADIO_GROUP_KEY);
		const checked = computed(() => {
			const value = parent ? parent.props.modelValue : props.modelValue;
			return value === props.name;
		});
		const toggle = () => {
			if (parent) {
				parent.updateValue(props.name);
			} else {
				emit("update:modelValue", props.name);
			}
		};

		watch(
			() => {
				return parent ? [parent.props.modelValue, props.modelValue] : [props.modelValue, null];
			},
			([value]) => {
				emit("change", value);
			}
		);

		useExpose<RadioExpose>({ toggle, props, checked });
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
