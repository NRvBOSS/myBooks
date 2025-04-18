<template>
  <div v-if="books.length > 0">
    <div
      v-for="book in books"
      :key="book.id"
      class="bg-gray-200 w-full p-4 rounded-lg mb-4 flex justify-between items-center"
    >
      <div>
        <p>{{ book.title }}</p>
        <p>{{ book.author }}</p>
        <p>{{ book.genre }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <span
          class="cursor-pointer hover:bg-gray-300 px-3 py-1 rounded-lg duration-150"
        >
          Edit
        </span>
        <span
          class="cursor-pointer hover:bg-gray-300 px-3 py-1 rounded-lg duration-150" @click="$emit('deleteBook', book.id)"
        >
          Delete
        </span>
      </div>
    </div>
  </div>
  <div v-else class="text-gray-400">No books yet</div>
</template>

<script setup>
import{ ref} from "vue";
defineProps({
  books: {
    type: Array,
    required: true,
  },
});

const deleteBook = defineEmits(["deleteBook"]);



</script>