<template>
  <form
    method="post"
    @submit.prevent="addBook"
    class="flex justify-between m-6 border-2 p-3 rounded-lg text-left font-bold sm:flex-col sm:items-center sm:gap-4"
  >
    <div class="text-center">
      <label class="mr-2" for="">Title</label>
      <input
        v-model="title"
        class="border-1 rounded-lg p-2 hover:shadow-2xl w-full sm:w-72"
        type="text"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Author</label>
      <input
        v-model="author"
        class="border-1 rounded-lg p-2 hover:shadow-2xl mr-5 w-full sm:w-72"
        type="text"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Genre</label>
      <input
        v-model="genre"
        class="border-1 rounded-lg p-2 hover:shadow-2xl mr-3 w-full sm:w-72"
        type="text"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Pages</label>
      <input
        v-model.number="pages"
        class="border-1 rounded-lg p-2 hover:shadow-2xl mr-3 w-full sm:w-72"
        type="number"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Status</label>
      <select
        class="border-1 rounded-lg p-2 hover:shadow-2xl mr-3 w-full sm:w-72"
        v-model="status"
      >
        <option value="completed">Completed</option>
        <option value="reading">Reading</option>
        <option value="not started">Not started</option>
      </select>
    </div>
    <div class="w-full flex justify-center">
      <button
        type="submit"
        class="items-center rounded-2xl p-2 flex cursor-pointer bg-gray-300 hover:bg-gray-400 duration-150 justify-center w-36"
      >
        Add Book
      </button>
    </div>
  </form>
</template>

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
