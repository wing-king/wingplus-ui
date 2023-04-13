import { withInstall } from "../utils";
import _Icon from "./icon";
export const Icon = withInstall(_Icon);
export default Icon;
declare module "vue" {
	export interface GlobalComponents {
		WpIcon: typeof Icon;
	}
}
