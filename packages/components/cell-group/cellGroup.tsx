import { defineComponent } from "vue";
import "./cellGroup.less";
import { createNamespace } from "../utils";
import { cellGroupProps } from "./types";

const [name, bem] = createNamespace("cell-group");
const BORDER = "wp-hairline";
const BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
export default defineComponent({
	name,

	inheritAttrs: false,

	props: cellGroupProps,

	setup(props, { slots, attrs }) {
		const renderGroup = () => (
			<div
				class={[bem({ inset: props.inset }), { [BORDER_TOP_BOTTOM]: props.border && !props.inset }]}
				{...attrs}
			>
				{slots.default?.()}
			</div>
		);

		const renderTitle = () => (
			<div class={bem("title", { inset: props.inset })}>{slots.title ? slots.title() : props.title}</div>
		);

		return () => {
			if (props.title || slots.title) {
				return (
					<>
						{renderTitle()}
						{renderGroup()}
					</>
				);
			}

			return renderGroup();
		};
	}
});
