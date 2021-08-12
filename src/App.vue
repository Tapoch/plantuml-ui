<template>
  <div class="flex h-screen">
    <div class="w-[25rem] bg-gray-100 flex flex-col">
      <div class="flex text-2xl mx-1 my-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>Plantuml UI</span>
      </div>
      <div
        class="
          flex
          border
          shadow-sm
          m-2
          p-2
          bg-white
          justify-between
          items-center
        "
      >
        <input
          v-model.trim="currentName"
          type="text"
          class="
            w-full
            mr-2
            pr-2
            outline-none
            border-b-2 border-transparent
            focus:border-gray-200
            box-content
          "
          placeholder="Name"
        />
        <button
          @click.prevent="onSaveClick"
          class="bg-green-200 p-1 active:bg-green-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
        </button>
      </div>
      <div
        v-for="item in items"
        :key="item.name"
        class="
          flex
          border
          shadow-sm
          m-2
          p-2
          bg-white
          justify-between
          items-center
        "
      >
        <p v-html="item.name"></p>
        <div>
          <button class="bg-yellow-200 p-1 active:bg-yellow-400 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </button>
          <button class="bg-red-200 p-1 active:bg-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-1 flex">
      <textarea v-model.lazy="uml" class="border p-2 m-2 w-full"></textarea>
    </div>
    <div class="flex-1 flex items-center justify-center bg-gray-100">
      <img :src="url" class="" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import plantuml from "plantuml-encoder";

const KEY = "plantuml-ui_saves";

const uml = ref("@startuml\nBob -> Alice : hello\n@enduml");
const currentName = ref("Default");
const items = ref([]);

const encoded = computed(() => plantuml.encode(uml.value));
const url = computed(
  () => `http://localhost:8199/plantuml/png/${encoded.value}`
);

const loadItems = () => {
  if (localStorage.getItem(KEY)) {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    items.value = parsed;
  }
};

onMounted(() => {
  loadItems();
});

const onSaveClick = () => {
  if (localStorage.getItem(KEY)) {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    localStorage.setItem(
      KEY,
      JSON.stringify([
        ...parsed,
        { name: currentName.value, save: encoded.value, date: Date.now() },
      ])
    );
  } else {
    localStorage.setItem(
      KEY,
      JSON.stringify([
        { name: currentName.value, save: encoded.value, date: Date.now() },
      ])
    );
  }
  loadItems();
};
</script>
