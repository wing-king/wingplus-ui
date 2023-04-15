import { ref, watch, WatchSource } from "vue";
export function useLazyRender(show: WatchSource<boolean | undefined>) {
	const initValue = ref(false);
	watch(
		show,
		(value) => {
			if (value) initValue.value = value;
		},
		{ immediate: true }
	);
	return (render: () => JSX.Element) => () => initValue.value ? render() : null;
}
