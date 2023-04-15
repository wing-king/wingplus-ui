import { CSSProperties, ExtractPropTypes, PropType } from "vue";

import { numericProp, truthProp, unknownProp } from "../utils";

export const OverlayProps = {
	show: Boolean,
	zIndex: numericProp,
	duration: numericProp,
	className: unknownProp,
	lockScroll: truthProp,
	lazyRender: truthProp,
	customStyle: Object as PropType<CSSProperties>
};
export type OverlayProps = ExtractPropTypes<typeof OverlayProps>;
