<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { addproduct } from '@/services/itemService';

const router = useRouter();

const state = reactive({
  data: {
    name: '',
    price: 0,
    discountPer: 0,
  },
  img: null,
});

//파일 선택
const handleFileSelected = (e) => {
  const file = e.target.files[0];
  console.log('file: ', file);
  state.img = file;
};

const submit = async () => {
  const formData = new FormData();
  formData.append('img', state.img), { type: 'application/json' };
  formData.append(
    'data',
    new Blob([JSON.stringify(state.data)], { type: 'application/json' })
  );

  const res = await addproduct(formData);
  console.log('res', res);

  router.push('/');
};
</script>

<template>
  <form class="order-form" @submit.prevent="submit">
    <div class="container">
      <div class="py-5 text-center">
        <div class="h4">
          <b>상품 등록</b>
        </div>
      </div>

      <div>
        <div class="row g-3">
          <div class="col-12">
            <label for="name" class="form-label">상품명</label>
            <input
              type="text"
              class="form-control p-3"
              id="name"
              v-model="state.data.name"
            />
          </div>
          <div class="col-12 pt-1">
            <label for="price" class="form-label">가격</label>
            <input
              type="number"
              id="price"
              class="form-control p-3"
              v-model="state.data.price"
            />
          </div>
          <div class="col-12 pt-1">
            <label for="discount" class="form-label">할인율</label>
            <input
              type="number"
              id="discount"
              class="form-control p-3"
              v-model="state.data.discountPer"
            />
          </div>

          <div class="col-12 pt-1">
            <label for="address" class="form-label">이미지</label>
            <input
              type="file"
              id="img"
              class="form-control p-3"
              accept="image/*"
              @change="handleFileSelected"
            />
            <div>
              <label for="img"> 파일 선택 </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="w-100 btn btn-primary py-4 mt-4">등록</button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
