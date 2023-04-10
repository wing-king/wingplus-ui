import { defineComponent } from "vue";
import { createNamespace } from "../utils";
import "./styles/index.less";
const [name] = createNamespace("button");
export default defineComponent({
	name,
	setup(props, { slots }) {
		return <div class="button">{slots.default?.()}</div>;
	}
});
