import { defineComponent } from 'vue';
export default defineComponent({
	name: 'app',
	setup(props, ctx) {
		return () => <div>这是一个.tsx支持tsx的写法</div>;
	}
});
