import { defineComponent } from "vue";
import { createNamespace } from "../utils";
import "./fonts/iconfont.js";
import "./icon.less";
import { IconProps } from "./types";
import Badge from "../badge";
const [name, bem] = createNamespace("icon");
export default defineComponent({
	name,
	props: IconProps,
	setup(props) {
		const getIconName = () => `#${name}-${props.name}`;
		const getStyle = () => {
			if (props.style) {
				return props.style;
			}
			if (props.color) {
				return {
					color: props.color
				};
			}
		};
		return () => {
			const { size, tag } = props;
			const className = bem([size]);

			return (
				<Badge dot={props.dot} content={props.badge} tag={tag}>
					<svg class={className} aria-hidden="true" style={getStyle()}>
						<use xlinkHref={getIconName()}></use>
					</svg>
				</Badge>
			);
		};
	}
});
