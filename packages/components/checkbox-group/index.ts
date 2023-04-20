import { withInstall } from "../utils";
import _CheckboxGroup from "./checkboxGroup";
export const CheckboxGroup = withInstall(_CheckboxGroup);
export default CheckboxGroup;
export type {
	checkboxGroupProps,
	CheckboxGroupDirection,
	CheckboxGroupToggleAllOptions,
	CheckboxGroupInstance
} from "./types";
