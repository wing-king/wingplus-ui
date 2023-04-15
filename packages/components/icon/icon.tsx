import { CSSProperties, computed, defineComponent } from "vue";
import { createNamespace, extend } from "../utils";
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
		const style = computed(() => {
			const style: CSSProperties = {};
			if (props.customStyle) {
				extend({}, props.customStyle);
			}
			if (props.color) {
				style.color = props.color;
			}
			return style;
		});
		return () => {
			const { size, tag } = props;
			const className = bem([size]);

			return (
				<Badge dot={props.dot} content={props.badge} tag={tag}>
					<svg class={className} aria-hidden="true" style={style.value}>
						<use xlinkHref={getIconName()}></use>
					</svg>
				</Badge>
			);
		};
	}
});
