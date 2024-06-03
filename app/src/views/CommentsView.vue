<template>
  <main>
    <HeaderPage></HeaderPage>
    <div class="content">
      <CommentsList></CommentsList>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderPage from "../components/HeaderPage.vue";
import CommentsList from "../components/CommentsList.vue";

export default defineComponent({
  components: {
    HeaderPage,
    CommentsList,
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
