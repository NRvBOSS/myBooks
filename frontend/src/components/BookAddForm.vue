<template>
  <form
    method="post"
    @submit.prevent="addBook"
    class="flex justify-between m-6 border-2 p-3 rounded-lg text-center font-bold"
  >
    <div class="text-center">
      <label class="mr-2" for="">Title</label>
      <input
        v-model="title"
        class="border-1 rounded-lg p-2 hover:shadow-2xl"
        type="text"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Author</label>
      <input
        v-model="author"
        class="border-1 rounded-lg p-2 hover:shadow-2xl"
        type="text"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Genre</label>
      <input
        v-model="genre"
        class="border-1 rounded-lg p-2 hover:shadow-2xl"
        type="text"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Pages</label>
      <input
        v-model.number="pages"
        class="border-1 rounded-lg p-2 hover:shadow-2xl"
        type="number"
      />
    </div>
    <div class="text-center">
      <label class="mr-2" for="">Status</label>
      <select
        class="border-1 rounded-lg p-2 hover:shadow-2xl"
        name=""
        id=""
        v-model="status"
      >
        <option class="text-green-500" value="completed">Completed</option>
        <option class="text-yellow-400" value="reading">Reading</option>
        <option class="text-red-500" value="not started">Not started</option>
      </select>
    </div>
    <span
      type="submit"
      @click="addBook"
      class="items-center rounded-2xl p-2 flex cursor-pointer bg-gray-300 hover:bg-gray-400 duration-150 justify-center"
      >Add Book</span
    >
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
      status: "",
    };
  },
  methods: {
    async addBook() {
      // Get data to send backend
      const bookData = {
        title: this.title,
        author: this.author,
        genre: this.genre,
        pages: this.pages,
        status: this.status,
      };

      try {
        // POST request to backend
        const response = await axios.post(
          "http://localhost:4000/api/books",
          bookData
        );

        // Check if the response is successfully
        if (response.status === 200) {
          // Emit the new book data to parent component
          this.$emit("newBook", bookData);

          // Handle success
          console.log("Book added successfully", response.data);
        }

        // Clear data
        this.title = "";
        this.author = "";
        this.genre = "";
        this.pages = "";
        this.status = "";
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
  },
};
</script>
