<script setup>
import { getItems } from '@/services/itemService';
import { reactive, onMounted } from 'vue';
import Card from '@/components/Card.vue';

const state = reactive({
  items: [],
});

onMounted(async () => {
  const res = await getItems();
  if (res.status !== 200) {
    return;
  }
  console.log(res.data);
  state.items = res.data;
});
</script>

<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
          <div class="col" v-for="item in state.items">
            <Card :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
