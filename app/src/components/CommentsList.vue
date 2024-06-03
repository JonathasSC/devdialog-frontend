<template>
  <div>
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th>uid</th>
          <th>text</th>
          <th>post_uid</th>
          <th>user_uid</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in paginatedUsers" :key="comment.id">
          <td>{{ comment.id }}</td>
          <td class="truncate">{{ comment.data.text }}</td>
          <td class="truncate">{{ comment.data.post_uid }}</td>
          <td>{{ comment.data.user_uid }}</td>
          <td>
            <button class="action-btn" @click="deleteUser(comment.id)">
              <v-icon>mdi-delete</v-icon>
            </button>
            <button class="action-btn" @click="editUser(comment)">
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

interface CommentData {
  text: string;
  user_uid: string;
  post_uid: string;
}

interface Comment {
  id: string;
  data: CommentData;
}

export default defineComponent({
  data() {
    return {
      comments: [] as Comment[],
      currentPage: 1,
      itemsPerPage: 5,
      totalComments: 0,
    };
  },
  components: {
    VIcon,
  },
  computed: {
    paginatedUsers(): Comment[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.comments.slice(start, end);
    },
    totalPages(): number {
      return Math.ceil(this.totalComments / this.itemsPerPage);
    },
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      axios({
        method: "get",
        url: "http://127.0.0.1:5001/devdialog-da654/us-central1/api/comments",
      })
        .then((response) => {
          this.comments = response.data;
          this.totalComments = this.comments.length;
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
        url: `http://127.0.0.1:5001/devdialog-da654/us-central1/api/comments/${postId}`,
      })
        .then(() => {
          this.comments = this.comments.filter((post) => post.id !== postId);
          this.totalComments = this.comments.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser(comment: Comment) {
      const newText = prompt("Enter new title:", comment.data.text);
      const newUserId = prompt("Enter new user ID:", comment.data.user_uid);
      const newPostId = prompt("Enter new description:", comment.data.post_uid);
      if (newText && newUserId && newPostId) {
        axios({
          method: "put",
          url: `http://127.0.0.1:5001/devdialog-da654/us-central1/api/posts/${comment.id}`,
          data: {
            title: newText,
            user_uid: newUserId,
            description: newPostId,
          },
        })
          .then(() => {
            comment.data.text = newText;
            comment.data.user_uid = newUserId;
            comment.data.post_uid = newPostId;
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
