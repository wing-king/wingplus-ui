import { defineComponent } from "vue";
import { createNamespace } from "../utils";
import "../../public/fonts/iconfont.js";
import "./styles/index.less";
import { iconProps } from "./types";
const [name] = createNamespace("icon");
export default defineComponent({
	name,
	props: iconProps,
	setup(props) {
		const iconName = `#${name}-${props.name}`;
		return () => (
			<svg class="icon" aria-hidden="true">
				<use xlinkHref={iconName}></use>
			</svg>
		);
	}
});
