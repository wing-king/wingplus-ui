import { defineComponent } from "vue";
import { createNamespace } from "../utils";
import "./fonts/iconfont.js";
import "./icon.less";
import { iconProps } from "./types";
const [name, bem] = createNamespace("icon");
export default defineComponent({
	name,
	props: iconProps,
	setup(props) {
		const iconName = `#${name}-${props.name}`;
		const className = bem();
		return () => (
			<svg class={className} aria-hidden="true" style="fill: 'currentColor'">
				<use xlinkHref={iconName}></use>
			</svg>
		);
	}
});
