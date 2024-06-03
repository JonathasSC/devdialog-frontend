<template>
  <div>
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th>uid</th>
          <th>title</th>
          <th>description</th>
          <th>user_uid</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in paginatedUsers" :key="post.id">
          <td>{{ post.id }}</td>
          <td class="truncate">{{ post.data.title }}</td>
          <td class="truncate">{{ post.data.description }}</td>
          <td>{{ post.data.user_uid }}</td>
          <td>
            <button class="action-btn" @click="deleteUser(post.id)">
              <v-icon>mdi-delete</v-icon>
            </button>
            <button class="action-btn" @click="editUser(post)">
              <v-icon>mdi-pencil</v-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VIcon } from "vuetify/lib";
import axios from "axios";

interface PostData {
  title: string;
  user_uid: string;
  description: string;
}

interface Post {
  id: string;
  data: PostData;
}

export default defineComponent({
  data() {
    return {
      posts: [] as Post[],
      currentPage: 1,
      itemsPerPage: 5,
      totalPosts: 0,
    };
  },
  components: {
    VIcon,
  },
  computed: {
    paginatedUsers(): Post[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.posts.slice(start, end);
    },
    totalPages(): number {
      return Math.ceil(this.totalPosts / this.itemsPerPage);
    },
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      axios({
        method: "get",
        url: "http://127.0.0.1:5001/devdialog-da654/us-central1/api/posts",
      })
        .then((response) => {
          this.posts = response.data;
          this.totalPosts = this.posts.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    deleteUser(postId: string) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:5001/devdialog-da654/us-central1/api/posts/${postId}`,
      })
        .then(() => {
          this.posts = this.posts.filter((post) => post.id !== postId);
          this.totalPosts = this.posts.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser(post: Post) {
      const newText = prompt("Enter new title:", post.data.title);
      const newUserId = prompt("Enter new user ID:", post.data.user_uid);
      const newPostDesc = prompt(
        "Enter new description:",
        post.data.description
      );
      if (newText && newUserId && newPostDesc) {
        axios({
          method: "put",
          url: `http://127.0.0.1:5001/devdialog-da654/us-central1/api/posts/${post.id}`,
          data: {
            title: newText,
            user_uid: newUserId,
            description: newPostDesc,
          },
        })
          .then(() => {
            post.data.title = newText;
            post.data.description = newPostDesc;
            post.data.user_uid = newUserId;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});
</script>

<style scoped>
.v-icon {
  color: var(--color-slate-50) !important;
}

.action-btn {
  width: 50%;
  padding: 0.5rem;
  border-radius: 1rem;
}

.action-btn:hover {
  background-color: var(--color-slate-800);
}

table {
  min-width: 64rem;
  border: 0.25rem solid var(--color-slate-900);
  border-radius: 1rem;
}

th {
  padding: 1rem 2rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: var(--color-slate-50);
  background-color: var(--color-slate-900);
  font-weight: bold;
  text-align: start;
}

tr:nth-child(odd) {
  background-color: var(--color-slate-950);
}

td {
  font-size: 1.6rem;
  text-align: start;
  padding: 1rem;
  padding-inline: 2rem;
  color: var(--color-indigo-50);
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

td.truncate {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: var(--color-indigo-800);
  color: var(--color-slate-50);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: var(--color-slate-600);
  cursor: not-allowed;
}
</style>
