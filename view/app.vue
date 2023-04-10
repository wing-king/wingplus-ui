<template>
	<div>支持不同的写法</div>
	<exp2></exp2>
	<exp1></exp1>
	<exp></exp>
	<wp-button>图啊</wp-button>
	<wp-icon name="import" />
</template>
<script lang="ts">
import exp2 from "./components/exp2";
import exp1 from "./components/exp1.vue";
import exp from "./components/exp";
import { defineComponent } from "vue";

export default defineComponent({
	name: "app",
	components: { exp2, exp1, exp }
});
</script>
