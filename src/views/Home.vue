<script setup>
import { getItems } from '@/services/itemService';
import { reactive, onMounted } from 'vue';

const state = reactive({
  item: {
    name: '',
    imgPath: '',
    price: '',
    discountPer: '',
  },
});

onMounted(async () => {
  const res = await getItems();
  console.log(res.data);
});

const findAll = async () => {
  const data = await getItems();
};
</script>

<template>
  <div class="container">
    <h1 class="mt-5">Hello,Home</h1>
  </div>
</template>

<style scoped></style>
