<template>
    <UCard class="border dark:border-gray-50 rounded-lg">
      <template #header>
        <img :src="item.image" :alt="item.name" class="w-full h-48"/>
      </template>
      <h2 class="text-xl font-semibold mb-2">{{ item.name }}</h2>
      <template #footer>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">${{ item.price.toFixed(2) }}</span>
          <UButton
            @click="$emit('select', item)"
            color="primary"
            size="lg"
          >
            Select
          </UButton>
        </div>
      </template>
    </UCard>
  </template>
  
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  defineEmits(['select']);
  </script>