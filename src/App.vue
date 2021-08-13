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
        <BaseButton @click.prevent="onSaveClick" type="save" />
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
          <BaseButton @click.prevent="onLoadClick(item.name)" type="load" />
          <BaseButton @click.prevent="onDeleteClick(item.name)" type="delete" />
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
import BaseButton from "./components/BaseButton.vue";

const KEY = "plantuml-ui_saves";

const uml = ref("@startuml\nBob -> Alice : hello\n@enduml");
const currentName = ref("Default");
const items = ref([]);

const encoded = computed(() => plantuml.encode(uml.value));
const url = computed(
  () => `http://localhost:8199/plantuml/png/${encoded.value}`
);

onMounted(() => {
  loadItems();
});

const loadItems = () => {
  if (localStorage[KEY]) {
    const parsed = JSON.parse(localStorage[KEY]);
    items.value = parsed;
  }
};

const saveItems = () => {
  localStorage[KEY] = JSON.stringify(items.value);
};

const onSaveClick = () => {
  const newUml = {
    name: currentName.value,
    save: encoded.value,
    date: Date.now(),
  };
  let changed = false;
  let toSave = items.value.map((item) => {
    if (item.name === currentName.value) {
      changed = true;
      return newUml;
    }
    return item;
  });
  if (!changed) {
    toSave.push(newUml);
  }

  items.value = toSave;

  saveItems();
};

const onDeleteClick = (nameToDelete) => {
  items.value = items.value.filter((item) => item.name !== nameToDelete);
  saveItems();
};

const onLoadClick = (nameToLoad) => {
  const { name, save } = items.value.filter(
    (item) => item.name === nameToLoad
  )[0];
  currentName.value = name;
  uml.value = plantuml.decode(save);
};
</script>
