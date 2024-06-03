<template>
  <main>
    <HeaderPage></HeaderPage>
    <div class="content">
      <UsersList></UsersList>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderPage from "../components/HeaderPage.vue";
import UsersList from "../components/UsersList.vue";

export default defineComponent({
  components: {
    HeaderPage,
    UsersList,
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
