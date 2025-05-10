<template>
  <div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New Book</h2>
    <form @submit.prevent="addBook" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label
          >
          <input
            v-model="title"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Book title"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Author</label
          >
          <input
            v-model="author"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Author name"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Genre</label
          >
          <input
            v-model="genre"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Genre"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Pages</label
          >
          <input
            v-model.number="pages"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            placeholder="Total pages"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="not started">Not started</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Add Book
        </button>
      </div>
    </form>
  </div>
</template>

<!-- Script section remains the same -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      author: "",
      genre: "",
      pages: "",
      status: "not started",
    };
  },
  methods: {
    async addBook() {
      const bookData = {
        title: this.title,
        author: this.author,
        genre: this.genre,
        pages: this.pages,
        status: this.status,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/books",
          bookData
        );

        if (response.status === 200) {
          this.$emit("new-book", response.data);
          console.log("Book added successfully", response.data);
        }

        this.title = "";
        this.author = "";
        this.genre = "";
        this.pages = "";
        this.status = "not started";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
