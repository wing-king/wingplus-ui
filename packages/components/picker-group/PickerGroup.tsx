import { ref, defineComponent, type InjectionKey, type ExtractPropTypes } from "vue";

// Utils
import { extend, pick, makeArrayProp, createNamespace } from "../utils";

// Composables
import { useChildren } from "@wingplus-ui/use";

// Components

import Toolbar, { pickerToolbarProps, pickerToolbarSlots } from "../picker/PickerToolbar";

const [name, bem] = createNamespace("picker-group");

export type PickerGroupProvide = Record<string, string>;

export const PICKER_GROUP_KEY: InjectionKey<PickerGroupProvide> = Symbol(name);

export const pickerGroupProps = extend(
	{
		tabs: makeArrayProp<string>(),
		nextStepText: String
	},
	pickerToolbarProps
);

export type PickerGroupProps = ExtractPropTypes<typeof pickerGroupProps>;

export default defineComponent({
	name,

	props: pickerGroupProps,

	emits: ["confirm", "cancel"],

	setup(props, { emit, slots }) {
		const activeTab = ref(0);
		const { children, linkChildren } = useChildren(PICKER_GROUP_KEY);

		linkChildren();

		const showNextButton = () => activeTab.value < props.tabs.length - 1 && props.nextStepText;

		const onConfirm = () => {
			if (showNextButton()) {
				activeTab.value++;
			} else {
				emit(
					"confirm",
					children.map((item) => item.confirm())
				);
			}
		};

		const onCancel = () => emit("cancel");

		return () => {
			const childNodes = slots.default?.();
			const confirmButtonText = showNextButton() ? props.nextStepText : props.confirmButtonText;

			return <div class={bem()}></div>;
		};
	}
});
