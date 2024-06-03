<template>
  <div>
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th>uid</th>
          <th>name</th>
          <th>email</th>
          <th>password</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td class="truncate">{{ user.data.name }}</td>
          <td class="truncate">{{ user.data.email }}</td>
          <td class="truncate">{{ user.data.password }}</td>
          <td>
            <button class="action-btn" @click="deleteUser(user.id)">
              <v-icon>mdi-delete</v-icon>
            </button>
            <button class="action-btn" @click="editUser(user)">
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

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  data: UserData;
}

export default defineComponent({
  data() {
    return {
      users: [] as User[],
      currentPage: 1,
      itemsPerPage: 5,
      totalUsers: 0,
    };
  },
  components: {
    VIcon,
  },
  computed: {
    paginatedUsers(): User[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.users.slice(start, end);
    },
    totalPages(): number {
      return Math.ceil(this.totalUsers / this.itemsPerPage);
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios({
        method: "get",
        url: "http://127.0.0.1:5001/devdialog-da654/us-central1/api/users",
      })
        .then((response) => {
          this.users = response.data;
          this.totalUsers = this.users.length;
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
    deleteUser(userId: string) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:5001/devdialog-da654/us-central1/api/users/${userId}`,
      })
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
          this.totalUsers = this.users.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser(user: User) {
      const newName = prompt("Enter new name:", user.data.name);
      const newEmail = prompt("Enter new email:", user.data.email);
      const newPassword = prompt("Enter new password:", user.data.password);
      if (newName && newEmail && newPassword) {
        axios({
          method: "put",
          url: `http://127.0.0.1:5001/devdialog-da654/us-central1/api/users/${user.id}`,
          data: {
            name: newName,
            email: newEmail,
            password: newPassword,
          },
        })
          .then(() => {
            user.data.name = newName;
            user.data.email = newEmail;
            user.data.password = newPassword;
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
  max-width: 200px;
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
