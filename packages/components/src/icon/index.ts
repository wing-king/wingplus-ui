import { withInstall } from "../utils";
import _Icon from "./icon";
export const Icon = withInstall(_Icon);
export default Icon;
export type { IconProps } from "./types";
declare module "vue" {
	export interface GlobalComponents {
		WpIcon: typeof Icon;
	}
}
