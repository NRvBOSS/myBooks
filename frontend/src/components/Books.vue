<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold underline text-center mt-10 mb-5">Books</h1>

    <!-- Book add form -->
    <BookAddForm @new-book="handleNewBook" />

    <!-- Call Modal -->
    <BookEditModal
      v-model:visible="showEditModal"
      :book="selectedBook"
      @updated="handleBookUpdated"
    />

    <div class="flex justify-between gap-6 mb-10 items-start">
      <!-- Not Started -->
      <div
        class="border-2 rounded-2xl w-1/3 p-4 flex flex-col items-center sm:w-full"
      >
        <h2 class="text-xl bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
          Not Started
        </h2>
        <BookCard
          @edit-book="handleEditBook"
          @delete-book="handleDelete"
          :books="filteredBooks('Not started')"
        />
      </div>

      <!-- Reading -->
      <div
        class="border-2 rounded-2xl w-1/3 p-4 flex flex-col items-center sm:w-full"
      >
        <h2 class="text-xl bg-yellow-400 text-white px-4 py-2 rounded-lg mb-4">
          Reading
        </h2>
        <BookCard
          @edit-book="handleEditBook"
          @delete-book="handleDelete"
          :books="filteredBooks('Reading')"
        />
      </div>

      <!-- Completed -->
      <div
        class="border-2 rounded-2xl w-1/3 p-4 flex flex-col items-center sm:w-full"
      >
        <h2 class="text-xl bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
          Completed
        </h2>
        <BookCard
          @edit-book="handleEditBook"
          @delete-book="handleDelete"
          :books="filteredBooks('Completed')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookCard from "../components/BookCard.vue";
import BookAddForm from "../components/BookAddForm.vue";
import BookEditModal from "./EditBookModal.vue";
import axios from "axios";

const books = ref([]);
const selectedBook = ref(null);
const showEditModal = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
});

const handleNewBook = (newBook) => {
  books.value.push(newBook);
};

const filteredBooks = (status) => {
  return books.value.filter(
    (book) => book.status.toLowerCase() === status.toLowerCase()
  );
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/api/books/${id}`);
    books.value = books.value.filter((book) => book._id !== id);
    console.log("Book deleted successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

const handleEditBook = (book) => {
  selectedBook.value = book;
  showEditModal.value = true;
};

const handleBookUpdated = (updatedBook) => {
  const index = books.value.findIndex((b) => b._id === updatedBook._id);
  if (index !== -1) {
    books.value[index] = updatedBook;
  }
};
</script>
