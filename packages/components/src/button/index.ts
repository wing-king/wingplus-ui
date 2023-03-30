import { withInstall } from '@wingplus-ui/utils';
import Button from './button';
export const WpButton = withInstall(Button);
export default WpButton;
declare module 'vue' {
	export interface GlobalComponents {
		WpButton: typeof WpButton;
	}
}
