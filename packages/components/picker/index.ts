import { withInstall } from "../utils";
import _Picker from "./picker";

export const Picker = withInstall(_Picker);
export default Picker;
export type {
	PickerColumn,
	PickerOption,
	PickerInstance,
	PickerFieldNames,
	PickerToolbarPosition,
	PickerCancelEventParams,
	PickerChangeEventParams,
	PickerConfirmEventParams
} from "./types";
