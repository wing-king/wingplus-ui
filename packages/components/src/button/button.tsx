import { defineComponent } from "vue";
export default defineComponent({
  name: "button",
  setup(props, ctx) {
    return () => <div>这是一个button</div>;
  },
});
