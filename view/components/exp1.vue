<script lang="tsx">
import { defineComponent } from "vue";
export default defineComponent({
    name: "app",
    setup(props, ctx) {
        return () => <div>这是一个.vue支持tsx的写法</div>;
    },
});
</script>
