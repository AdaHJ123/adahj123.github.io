<script setup>
import Navbar from "./components/Navbar.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const transitionName = ref("page-slide");
const route = useRoute();

watch(
  () => route.fullPath,
  (to, from) => {
    transitionName.value = from === "/" ? "page-slide-start" : "page-slide";
  }
);
</script>

<template>
  <Navbar />
  <!-- <router-view /> 是 vue-router 渲染“当前路由对应组件”的占位符。
  简单说：路由匹配到哪个页面组件，就把那个组件放在 <router-view /> 位置显示。Navbar 外层固定不变，
  内部的 <router-view /> 会随路由切换显示 Home、ProjectDetail、Contact 等页面。 -->
  <RouterView v-slot="{ Component, route: slotRoute }">
    <transition :name="transitionName" mode="out-in">
      <component
        :is="Component"
        :key="slotRoute.fullPath"
        :style="{ '--scroll-y': '0px' }"
      />
    </transition>
  </RouterView>
</template>
