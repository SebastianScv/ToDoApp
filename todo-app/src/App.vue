<template>
  <div
    class="flex flex-col bg-primary dark:bg-primaryDark h-[100svh] text-darken dark:text-lighten"
  >
    <the-header
      :sidebar-toggled="sidebar.sidebarToggled"
      @toggleMenu="toggleMenu"
    ></the-header>
    <div class="flex flex-row w-full h-full sm:w-[400px]">
      <Sidebar
        :toggled="sidebar.sidebarToggled"
        @toggleSidebar="onToggleSidebar"
        class="absolute sm:z-50"
      />
      <div
        :class="{
          block: !sidebar.sidebarToggled,
          'hidden sm:block': sidebar.sidebarToggled,
        }"
        class="w-full absolute"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/layout/Sidebar";
import TheHeader from "./components/layout/TheHeader.vue";
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();

onMounted(() => {
  store.dispatch("CategoriesModule/getCategories");
});

const sidebar = reactive({
  sidebarToggled: false,
});

const toggleMenu = () => {
  sidebar.sidebarToggled = !sidebar.sidebarToggled;
};

const onToggleSidebar = (toggled) => {
  sidebar.sidebarToggled = toggled;
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
