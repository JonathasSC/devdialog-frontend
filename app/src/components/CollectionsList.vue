<template>
  <div>
    <table cellspacing="0" cellpadding="0">
      <thead>
        <th>Collections</th>
      </thead>
      <tbody>
        <tr>
          <td>
            <router-link class="link-to-list" to="/users">Users</router-link>
          </td>
          <td>
            <button class="add-btn" v-on:click="toggleForm('showUserForm')">
              +
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <router-link class="link-to-list" to="/posts">Posts</router-link>
          </td>
          <td>
            <button class="add-btn" v-on:click="toggleForm('showPostForm')">
              +
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <router-link class="link-to-list" to="/comments"
              >Comments</router-link
            >
          </td>
          <td>
            <button class="add-btn" v-on:click="toggleForm('showCommentForm')">
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <transition name="fade">
      <div class="form-container" v-if="showUserForm">
        <form class="form">
          <h1 class="form__title">New user</h1>
          <input class="input" type="text" placeholder="name" />
          <input class="input" type="email" placeholder="email" />
          <input class="input" type="text" placeholder="password" />
          <button class="submit-btn">Create new user</button>
          <button
            type="button"
            class="cancel-btn"
            v-on:click="toggleForm('showUserForm')"
          >
            Cancel
          </button>
        </form>
      </div>
    </transition>

    <transition name="fade">
      <div class="form-container" v-if="showPostForm">
        <form class="form">
          <h1 class="form__title">New post</h1>
          <input class="input" type="text" placeholder="description" />
          <input class="input" type="text" placeholder="title" />
          <input class="input" type="text" placeholder="user_id" />
          <button class="submit-btn">Create new post</button>
          <button
            type="button"
            class="cancel-btn"
            v-on:click="toggleForm('showPostForm')"
          >
            Cancel
          </button>
        </form>
      </div>
    </transition>

    <transition name="fade">
      <div class="form-container" v-if="showCommentForm">
        <form class="form">
          <h1 class="form__title">New comment</h1>
          <input class="input" type="text" placeholder="text" />
          <input class="input" type="text" placeholder="user_id" />
          <input class="input" type="text" placeholder="post_id" />
          <button class="submit-btn">Create new comment</button>
          <button
            type="button"
            class="cancel-btn"
            v-on:click="toggleForm('showCommentForm')"
          >
            Cancel
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type FormState = "showUserForm" | "showPostForm" | "showCommentForm";

export default defineComponent({
  name: "CollectionsList",
  data() {
    return {
      showUserForm: false,
      showPostForm: false,
      showCommentForm: false,
    };
  },
  methods: {
    toggleForm(formName: FormState) {
      this[formName] = !this[formName];
    },
  },
});
</script>

<style scoped>
thead th {
  padding-bottom: 1rem;
}

th {
  font-size: 2.4rem;
  text-align: start;
  color: var(--color-slate-50);
  font-weight: bold;
}

tr:nth-child(odd) {
  background-color: var(--color-slate-950);
}

td {
  font-size: 1.8rem;
  text-align: start;
  color: var(--color-indigo-500);
  padding: 1rem;
  padding-inline: 2rem;
}

td:first-child {
  width: 64rem;
}

.link-to-list {
  color: var(--color-indigo-500);
  text-decoration: none;
}

.link-to-list:hover {
  color: var(--color-indigo-400);
}

.add-btn:hover {
  color: var(--color-indigo-400);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}

.form {
  background-color: var(--color-slate-800);
  padding: 3rem;
  width: 32rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  min-width: 100%;
  padding: 1rem;
  border-radius: 0.25rem;
  color: var (--color-slate-50);
  border: 0.1rem solid var(--color-slate-700);
}

.input::placeholder {
  color: var(--color-slate-600);
}

.submit-btn,
.cancel-btn {
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--color-slate-50);
  cursor: pointer;
}

.submit-btn {
  background-color: var(--color-indigo-800);
}

.cancel-btn {
  background-color: var(--color-red-600);
}

.form__title {
  color: var(--color-slate-50);
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 2.4rem;
}
</style>
