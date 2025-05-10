<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-indigo-700">
        My Reading Journey
        <span class="text-2xl block mt-2 text-gray-600 font-normal"
          >Track your literary adventures</span
        >
      </h1>

      <!-- Book add form -->
      <BookAddForm @new-book="handleNewBook" />

      <!-- Edit Modal -->
      <BookEditModal
        v-model:visible="showEditModal"
        :book="selectedBook"
        @updated="handleBookUpdated"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 items-start">
        <!-- Not Started Column -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <div class="bg-red-500 p-4">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              Not Started
            </h2>
          </div>
          <div class="p-4">
            <BookCard
              @edit-book="handleEditBook"
              @delete-book="handleDelete"
              :books="filteredBooks('Not started')"
            />
          </div>
        </div>

        <!-- Reading Column -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <div class="bg-yellow-400 p-4">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
              Reading
            </h2>
          </div>
          <div class="p-4">
            <BookCard
              @edit-book="handleEditBook"
              @delete-book="handleDelete"
              :books="filteredBooks('Reading')"
            />
          </div>
        </div>

        <!-- Completed Column -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-green-500 p-4">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Completed
            </h2>
          </div>
          <div class="p-4">
            <BookCard
              @edit-book="handleEditBook"
              @delete-book="handleDelete"
              :books="filteredBooks('Completed')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script section remains the same -->

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
