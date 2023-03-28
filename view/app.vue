<template>
    <div>支持不同的写法</div>
    <exp2></exp2>
    <exp1></exp1>
    <exp></exp>
</template>
<script lang="ts">
import exp2 from "./components/exp2";
import exp1 from "./components/exp1.vue";
import exp from "./components/exp";
import { defineComponent, ref } from "vue";
export default defineComponent({
    components: { exp2, exp1, exp },
});
</script>