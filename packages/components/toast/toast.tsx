import { watch, onMounted, onUnmounted, defineComponent } from "vue";
import "./toast.less";
// Utils
import { pick, isDef, createNamespace } from "../utils";
import { lockClick } from "./lock-click";

// Components
import { Icon } from "../icon";
import { Popup } from "../popup";
import { Loading } from "../loading";

// Types
import { toastProps } from "./types";

const [name, bem] = createNamespace("toast");

const popupInheritProps = [
	"show",
	"overlay",
	"teleport",
	"transition",
	"overlayClass",
	"overlayStyle",
	"closeOnClickOverlay"
] as const;

const CircularIcon = (
	<svg class={bem("circular")} viewBox="25 25 50 50">
		<circle cx="50" cy="50" r="20" fill="none" />
	</svg>
);
export default defineComponent({
	name,

	props: toastProps,

	emits: ["update:show"],

	setup(props, { emit, slots }) {
		let timer: ReturnType<typeof setTimeout>;
		let clickable = false;

		const updateShow = (show: boolean) => emit("update:show", show);

		const onClick = () => {
			if (props.closeOnClick) {
				updateShow(false);
			}
		};

		const clearTimer = () => clearTimeout(timer);

		const renderIcon = () => {
			const { icon, type, iconSize = "large", loadingType } = props;
			const hasIcon = icon || type === "success" || type === "warning";

			if (hasIcon) {
				return <Icon name={icon || type} size={iconSize} class={bem("icon", ["large"])} />;
			}

			if (type === "loading") {
				return <Loading class={bem("loading")} size={iconSize} type={loadingType} />;
			}
		};

		const renderMessage = () => {
			const { type, message } = props;

			if (slots.message) {
				return <div class={bem("text")}>{slots.message()}</div>;
			}

			if (isDef(message) && message !== "") {
				return type === "html" ? (
					<div key={0} class={bem("text")} innerHTML={String(message)} />
				) : (
					<div class={bem("text")}>{message}</div>
				);
			}
		};
		const toggleClickable = () => {
			const newValue = props.show && props.forbidClick;
			if (clickable !== newValue) {
				clickable = newValue;
				lockClick(clickable);
			}
		};
		watch(() => [props.show, props.forbidClick], toggleClickable);

		watch(
			() => [props.show, props.type, props.message, props.duration],
			() => {
				clearTimer();
				if (props.show && props.duration > 0) {
					timer = setTimeout(() => {
						updateShow(false);
					}, props.duration);
				}
			},
			{ immediate: true }
		);

		onMounted(toggleClickable);
		onUnmounted(toggleClickable);

		return () => (
			<Popup
				class={[
					bem([
						props.position,
						props.wordBreak === "normal" ? "break-normal" : props.wordBreak,
						{ [props.type]: !props.icon }
					]),
					props.className
				]}
				lockScroll={false}
				onClick={onClick}
				onClosed={clearTimer}
				onUpdate:show={updateShow}
				{...pick(props, popupInheritProps)}
			>
				{renderIcon()}
				{renderMessage()}
			</Popup>
		);
	}
});
