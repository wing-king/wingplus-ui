/* eslint-disable no-use-before-define */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from "vue";
import { Numeric, extend, makeArrayProp, makeNumericProp, makeStringProp, truthProp } from "../utils";
import { pickerToolbarProps } from "./PickerToolbar";

export const pickerSharedProps = extend(
	{
		loading: Boolean,
		readonly: Boolean,
		allowHtml: Boolean,
		optionHeight: makeNumericProp(44),
		showToolbar: truthProp,
		swipeDuration: makeNumericProp(1000),
		visibleOptionNum: makeNumericProp(6)
	},
	pickerToolbarProps
);

export const pickerProps = extend({}, pickerSharedProps, {
	columns: makeArrayProp<PickerOption | PickerColumn>(),
	modelValue: makeArrayProp<Numeric>(),
	toolbarPosition: makeStringProp<PickerToolbarPosition>("top"),
	columnsFieldNames: Object as PropType<PickerFieldNames>
});

export type PickerProps = ExtractPropTypes<typeof pickerProps>;

export type PickerToolbarPosition = "top" | "bottom";

export type PickerFieldNames = {
	text?: string;
	value?: string;
	children?: string;
};

export type PickerOption = {
	text?: Numeric;
	value?: Numeric;
	disabled?: boolean;
	children?: PickerColumn;
	className?: unknown;
	// for custom field names
	[key: PropertyKey]: any;
};

export type PickerColumn = PickerOption[];

export type PickerExpose = {
	confirm: () => void;
	getSelectedOptions: () => Array<PickerOption | undefined>;
};

export type PickerColumnProvide = {
	state: {
		index: number;
		offset: number;
		duration: number;
		options: PickerOption[];
	};
	setIndex: (index: number, emitChange?: boolean | undefined) => void;
	getValue: () => PickerOption;
	setValue: (value: string) => void;
	setOptions: (options: PickerOption[]) => void;
	stopMomentum: () => void;
};

export type PickerInstance = ComponentPublicInstance<PickerProps, PickerExpose>;

export type PickerConfirmEventParams = {
	selectedValues: Numeric[];
	selectedOptions: Array<PickerOption | undefined>;
	selectedIndexes: number[];
};

export type PickerCancelEventParams = PickerConfirmEventParams;

export type PickerChangeEventParams = PickerConfirmEventParams & {
	columnIndex: number;
};
