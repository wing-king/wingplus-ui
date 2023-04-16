import {
	defineExpose,
	CSSProperties,
	Teleport,
	Transition,
	computed,
	defineComponent,
	nextTick,
	onMounted,
	onDeactivated,
	ref,
	watch,
	onActivated
} from "vue";
import { callInterceptor, createNamespace, isDef } from "../utils";
import "./popup.less";
import { PopupProps } from "./types";
import Overlay from "../overlay";
import Icon from "../icon";
import { useGlobalZIndex, useLazyRender } from "../composables";
import { useEventListener } from "@wingplus-ui/use";
const [name, bem] = createNamespace("popup");
export default defineComponent({
	name,
	props: PopupProps,
	inheritAttrs: false,
	setup(props, { slots, emit, attrs }) {
		const zIndex = ref<number>();
		const popupRef = ref<HTMLElement>();
		let opened: boolean;
		let shouldReopen: boolean;
		const style = computed(() => {
			const style: CSSProperties = {
				zIndex: zIndex.value
			};
			if (isDef(props.duration)) {
				const key = props.position === "center" ? "animationDuration" : "transitionDuration";
				style[key] = `${props.duration}s`;
			}

			return style;
		});

		watch(
			() => props.show,
			(show) => {
				if (show && !opened) {
					open();

					if (attrs.tabindex === 0) {
						nextTick(() => {
							popupRef.value?.focus();
						});
					}
				}
				if (!show && opened) {
					opened = false;
					emit("close");
				}
			}
		);

		const lazyRender = useLazyRender(() => props.show || !props.lazyRender);
		const open = () => {
			if (!opened) {
				opened = true;
				zIndex.value = props.zIndex !== undefined ? +props.zIndex : useGlobalZIndex();

				emit("open");
			}
		};
		const close = () => {
			if (opened) {
				callInterceptor(props.beforeClose, {
					done() {
						opened = false;
						emit("close");
						emit("update:show", false);
					}
				});
			}
		};
		const renderOverlay = () => {
			if (props.overlay) {
				return (
					<Overlay
						v-slots={{ default: slots["overlay-content"] }}
						show={props.show}
						class={props.overlayClass}
						zIndex={zIndex.value}
						duration={props.duration}
						customStyle={props.overlayStyle}
						//   role={props.closeOnClickOverlay ? 'button' : undefined}
						//   tabindex={props.closeOnClickOverlay ? 0 : undefined}
						onClick={onClickOverlay}
					/>
				);
			}
		};
		const onClickOverlay = (event: MouseEvent) => {
			emit("clickOverlay", event);

			if (props.closeOnClickOverlay) {
				close();
			}
		};

		const onOpened = () => emit("opened");
		const onClosed = () => emit("closed");
		const onKeydown = (event: KeyboardEvent) => emit("keydown", event);

		// 关闭图标
		const onClickCloseIcon = (event: MouseEvent) => {
			emit("clickCloseIcon", event);
			close();
		};
		// 图标组件
		const renderCloseIcon = () => {
			const className = bem(["close-icon"]);
			if (props.closeable) {
				return (
					<Icon
						class={`${className} ${className}--${props.closeIconPosition}`}
						name={props.closeIcon}
						onClick={onClickCloseIcon}
					/>
				);
			}
		};

		const renderPopup = lazyRender(() => {
			const { round, position, safeAreaInsetTop, safeAreaInsetBottom } = props;
			const className = [
				bem({
					round,
					[position]: position
				}),
				{
					"wp-safe-area-top": safeAreaInsetTop,
					"wp-safe-area-bottom": safeAreaInsetBottom
				}
			];
			return (
				<div
					v-show={props.show}
					ref={popupRef}
					style={style.value}
					role="dialog"
					tabindex={0}
					class={className}
					// onKeydown={onKeydown}
					{...attrs}
				>
					{slots.default?.()}
					{renderCloseIcon()}
				</div>
			);
		});
		const renderTransition = () => {
			const { position, transition, transitionAppear } = props;
			const name = position === "center" ? "wp-fade" : `wp-popup-slide-${position}`;

			return (
				<Transition
					v-slots={{ default: renderPopup }}
					name={transition || name}
					appear={transitionAppear}
					onAfterEnter={onOpened}
					onAfterLeave={onClosed}
				/>
			);
		};
		// 初始化显示
		onMounted(() => {
			if (props.show) {
				open();
			}
		});
		// 当页面被激活
		onActivated(() => {
			shouldReopen = false;
		});
		// 关闭页面卸载组件
		onDeactivated(() => {
			if (props.show && props.teleport) {
				close();
				shouldReopen = true;
			}
		});
		// 浏览器路由变化监听
		useEventListener("popstate", () => {
			if (props.closeOnPopstate) {
				close();
				shouldReopen = false;
			}
		});
		// 抛出组件挂载
		defineExpose({
			popupRef
		});
		return () => {
			if (props.teleport) {
				return (
					<Teleport to={props.teleport}>
						{renderOverlay()}
						{renderTransition()}
					</Teleport>
				);
			}
			return (
				<>
					{renderOverlay()}
					{renderTransition()}
				</>
			);
		};
	}
});
