import { withInstall } from "../utils";
import _CheckerGroup from "./checkboxGroup";
export const CheckerGroup = withInstall(_CheckerGroup);
export default CheckerGroup;
export type {
	checkboxGroupProps,
	CheckboxGroupDirection,
	CheckboxGroupToggleAllOptions,
	CheckboxGroupInstance
} from "./types";
