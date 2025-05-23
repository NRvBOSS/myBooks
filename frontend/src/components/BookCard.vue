<template>
  <div v-if="books.length > 0" class="space-y-4">
    <div
      v-for="book in books"
      :key="book._id"
      class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ book.title }}</h3>
          <p class="text-gray-600">{{ book.author }}</p>
          <div class="flex items-center mt-2 text-sm text-gray-500">
            <span class="bg-gray-100 px-2 py-1 rounded mr-2">{{
              book.genre
            }}</span>
            <span>{{ book.pages }} pages</span>
          </div>
        </div>

        <div class="flex space-x-2 h-8">
          <button
            @click="$emit('edit-book', book)"
            class="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </button>
          <button
            @click="$emit('delete-book', book._id)"
            class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center"
      >
        <span
          class="text-xs font-medium px-2.5 py-0.5 rounded capitalize"
          :class="{
            'bg-red-100 text-red-800':
              book.status.toLowerCase() === 'not started',
            'bg-yellow-100 text-yellow-800':
              book.status.toLowerCase() === 'reading',
            'bg-green-100 text-green-800':
              book.status.toLowerCase() === 'completed',
          }"
        >
          {{ book.status }}
        </span>
        <span class="text-xs text-gray-500"
          >Added {{ formatDate(book.createdAt) }}</span
        >
      </div>
    </div>
  </div>
  <div v-else class="text-center py-8 text-gray-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-12 w-12 mx-auto text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
    <p class="mt-2">No books in this category</p>
  </div>
</template>

<script setup>
import { format } from "date-fns";

defineProps({
  books: {
    type: Array,
    required: true,
  },
});

const formatDate = (dateString) => {
  return format(new Date(dateString), "MMM d, yyyy");
};
</script>
