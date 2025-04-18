<template>
  <div v-if="books.length > 0">
    <div
      v-for="book in books"
      :key="book.id || book.title"
      class="bg-gray-200 w-full p-4 rounded-lg mb-4 flex justify-between items-center"
    >
      <div>
        <p class="font-bold">{{ book.title }}</p>
        <p>{{ book.author }}</p>
        <p>{{ book.genre }}</p>
        <p class="text-sm text-gray-500">{{ book.pages }} pages</p>
      </div>

      <div class="flex flex-col gap-2 text-right">
        <span
          class="cursor-pointer hover:bg-gray-300 px-3 py-1 rounded-lg duration-150"
          >Edit</span
        >
        <span
          class="cursor-pointer hover:bg-gray-300 px-3 py-1 rounded-lg duration-150"
          >Delete</span
        >
      </div>
    </div>
  </div>
  <div v-else class="text-gray-400">No books yet</div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  books: {
    type: Array,
    required: true,
  },
});
</script>
