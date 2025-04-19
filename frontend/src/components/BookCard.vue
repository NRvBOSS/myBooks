<template>
  <div v-if="books.length > 0">
    <div
      v-for="book in books"
      :key="book._id"
      class="bg-gray-200 w-full p-4 rounded-lg mb-4 flex justify-between items-center sm:flex-col sm:items-start gap-4"
    >
      <div>
        <p class="font-bold">{{ book.title }}</p>
        <p>{{ book.author }}</p>
        <p>{{ book.genre }}</p>
        <p class="text-sm text-gray-500">{{ book.pages }} pages</p>
      </div>

      <div class="flex flex-col gap-2 text-right">
        <span
        @click="$emit('edit-book', book)"
          class="cursor-pointer hover:bg-gray-300 px-3 py-1 rounded-lg duration-150"
        >
          Edit
        </span>
        <span
          @click="$emit('delete-book', book._id)"
          class="cursor-pointer hover:bg-red-300 px-3 py-1 rounded-lg duration-150 text-red-600"
        >
          Delete
        </span>
      </div>
    </div>
  </div>
  <div v-else class="text-gray-400">No books yet</div>
</template>

<script setup>

defineProps({
  books: {
    type: Array,
    required: true,
  },
});
</script>
