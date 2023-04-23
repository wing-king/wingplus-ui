export type CellSize = "normal" | "large";

export type CellArrowDirection = "up" | "down" | "left" | "right";

export const cellSharedProps = {
	tag: makeStringProp<keyof HTMLElementTagNameMap>("div"),
	icon: String,
	size: String as PropType<CellSize>,
	title: numericProp,
	value: numericProp,
	label: numericProp,
	center: Boolean,
	isLink: Boolean,
	border: truthProp,
	required: Boolean,
	iconPrefix: String,
	valueClass: unknownProp,
	labelClass: unknownProp,
	titleClass: unknownProp,
	titleStyle: null as unknown as PropType<string | CSSProperties>,
	arrowDirection: String as PropType<CellArrowDirection>,
	clickable: {
		type: Boolean as PropType<boolean | null>,
		default: null
	}
};

export const cellProps = extend({}, cellSharedProps, routeProps);

export type CellProps = ExtractPropTypes<typeof cellProps>;
