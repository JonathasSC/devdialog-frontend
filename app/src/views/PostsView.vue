<template>
  <main>
    <HeaderPage></HeaderPage>
    <div class="content">
      <PostsList></PostsList>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderPage from "../components/HeaderPage.vue";
import PostsList from "../components/PostsList.vue";

export default defineComponent({
  components: {
    HeaderPage,
    PostsList,
  },
});
</script>

<style scoped>
.content {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
}
</style>
