import { CSSProperties, computed, defineComponent, ref, Transition } from "vue";
import { createNamespace, extend, getZIndexStyle, isDef, preventDefault } from "../utils";
import "./overlay.less";
import { OverlayProps } from "./types";
import { useLazyRender } from "../composables";
import { useEventListener } from "@wingplus-ui/use";

const [name, bem] = createNamespace("overlay");
export default defineComponent({
	name,
	props: OverlayProps,
	// inheritAttrs: false,
	setup(props, { slots }) {
		const root = ref<HTMLElement>();
		const lazyRender = useLazyRender(() => props.show || !props.lazyRender);
		const onTouchMove = (event: TouchEvent) => {
			if (props.lockScroll) {
				preventDefault(event, true);
			}
		};
		const renderOverlay = lazyRender(() => {
			const className = bem();
			const style = computed<CSSProperties>(() => extend(getZIndexStyle(props.zIndex), props.customStyle));
			if (isDef(props.duration)) {
				style.value.animationDuration = `${props.duration}s`;
			}
			return (
				<div v-show={props.show} class={[className, props.className]} ref={root} style={style.value}>
					{slots.default?.()}
				</div>
			);
		});
		// useEventListener will set passive to `false` to eliminate the warning of Chrome
		useEventListener("touchmove", onTouchMove, {
			target: root
		});
		return () => <Transition v-slots={{ default: renderOverlay }} name="wp-fade" appear></Transition>;
	}
});
