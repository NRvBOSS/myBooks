<template>
  <div class="container mx-auto px-6">
    <h1 class="text-3xl font-bold underline text-center mt-10 mb-5">Books</h1>

    <!-- Book add form -->
    <BookAddForm @new-book="handleNewBook" />

    <div class="flex justify-between gap-6 mb-10 items-start">
      <!-- Not Started -->
      <div class="border-2 rounded-2xl w-1/3 p-4 flex flex-col items-center">
        <h2 class="text-xl bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
          Not Started
        </h2>
        <BookCard :books="filteredBooks('Not started')" />
      </div>

      <!-- Reading -->
      <div class="border-2 rounded-2xl w-1/3 p-4 flex flex-col items-center">
        <h2 class="text-xl bg-yellow-400 text-white px-4 py-2 rounded-lg mb-4">
          Reading
        </h2>
        <BookCard :books="filteredBooks('Reading')" />
      </div>

      <!-- Completed -->
      <div class="border-2 rounded-2xl w-1/3 p-4 flex flex-col items-center">
        <h2 class="text-xl bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
          Completed
        </h2>
        <BookCard :books="filteredBooks('Completed')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookCard from "../components/BookCard.vue";
import BookAddForm from "../components/BookAddForm.vue";
import axios from "axios";

const books = ref([]);
onMounted(async () => {
  axios
    .get("http://localhost:4000/api/books")
    .then((response) => {
      books.value = response.data;
      console.log(books.value);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
});

const handleNewBook = (newBook) => {
  books.value.push(newBook);
};

const filteredBooks = (status) => {
  return books.value.filter(
    (book) => book.status.toLowerCase() === status.toLowerCase()
  );
};
</script>
