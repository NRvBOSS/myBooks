<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-3xl w-[90%] max-w-md">
      <h2 class="text-xl font-bold mb-4 text-center">Edit Book</h2>

      <div class="mb-4">
        <label class="block mb-1">Title</label>
        <input v-model="form.title" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Author</label>
        <input v-model="form.author" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Genre</label>
        <input v-model="form.genre" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Pages</label>
        <input
          type="number"
          v-model="form.pages"
          class="w-full border px-3 py-2 rounded"
        />
      </div>

      <div class="mb-6">
        <label class="block mb-1">Status</label>
        <select v-model="form.status" class="w-full border px-3 py-2 rounded">
          <option>Not started</option>
          <option>Reading</option>
          <option>Completed</option>
        </select>
      </div>

      <div class="flex justify-end gap-4">
        <button
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="saveChanges"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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

  emit("updated", updatedBook);
  closeModal();
}
</script>
