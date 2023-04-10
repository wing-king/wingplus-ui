import { withInstall } from "../utils";
import _Button from "./button";
export const Button = withInstall(_Button);
export default Button;
declare module "vue" {
	export interface GlobalComponents {
		WpButton: typeof Button;
	}
}
