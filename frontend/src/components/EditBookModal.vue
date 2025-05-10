<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">Edit Book</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              v-model="form.title" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              v-model="form.author" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <input 
              v-model="form.genre" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pages</label>
            <input 
              type="number"
              v-model="form.pages" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              v-model="form.status" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Not started</option>
              <option>Reading</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Script section remains the same -->

<script setup>
import axios from "axios";
import { watch, reactive } from "vue";
const emit = defineEmits(["update:visible", "updated"]);
const props = defineProps({
  visible: Boolean,
  book: Object,
});

const form = reactive({
  title: "",
  author: "",
  genre: "",
  pages: 0,
  status: ``,
});

// Kitab dəyişəndə form sahələri yenilənsin
watch(
  () => props.book,
  (newBook) => {
    if (newBook) {
      form.title = newBook.title;
      form.author = newBook.author;
      form.genre = newBook.genre;
      form.pages = newBook.pages;
      form.status = newBook.status;
    }
  },
  { immediate: true }
);

function closeModal() {
  emit("update:visible", false);
}

function saveChanges() {
  const updatedBook = {
    ...props.book,
    title: form.title,
    author: form.author,
    genre: form.genre,
    pages: form.pages,
    status: form.status,
  };

  axios
    .patch(`http://localhost:4000/api/books/${props.book._id}`, updatedBook)
    .then(() => {
      console.log("Book updated successfully");
    })
    .catch((error) => {
      console.error("Error updating book:", error);
    });

  emit("updated", updatedBook);
  closeModal();
}
</script>
