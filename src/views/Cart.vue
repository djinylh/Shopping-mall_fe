<script setup>
import { reactive, onMounted } from 'vue';
import { getItems } from '@/services/CartService';
import { remove } from '@/services/CartService';

const state = reactive({
  items: [],
});

const load = async () => {
  const res = await getItems();

  console.log(res.data); // 넘어오는지 확인용

  if (res.status === 200) {
    state.items = res.data;
  }
};

const removed = async (itemId) => {
  if (confirm('상품을 삭제하시겠습니까?')) {
    const params = { itemId };
    const res = await remove(params);
    console.log('삭제 요청 itemId:', params);
    console.log(res);
    if (res.status === 200) {
      window.alert('선택하신 장바구니의 상품을 삭제했습니다');
      load();
    } else {
      return;
    }
  }
};

onMounted(() => {
  load();
});
</script>

<template>
  <div class="cart">
    <div class="container">
      <template v-if="state.items.length">
        <ul class="items">
          <li v-for="item in state.items">
            <img
              :alt="`상품 사진(${item.name})`"
              :src="`/pic/item/${item.imgPath}`"
            />
            <b class="name">{{ item.name }}</b>
            <span class="price">
              {{
                (
                  item.price -
                  (item.price * item.discountPer) / 100
                ).toLocaleString()
              }}원
            </span>
            <span
              class="remove float-end"
              @click="removed(item.itemId)"
              title="삭제"
              >&times;</span
            >
          </li>
        </ul>
        <div class="act">
          <RouterLink to="/order" class="btn">주문하기</RouterLink>
        </div>
      </template>
      <template v-else>
        <div class="text-center py-5">장바구니가 비었습니다</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  li {
    border: 1px solid #eee;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  img {
    width: 150px;
    height: 150px;
  }
  .items {
    list-style: none;
    margin: 0;
    padding: 0;
    .name {
      margin-left: 25px;
    }
    .price {
      margin-left: 50px;
    }
    .remove {
      cursor: pointer;
      font-size: 30px;
      padding: 5px 15px;
    }
  }
  .act .btn {
    width: 300px;
    display: block;
    margin: 0 auto;
    padding: 30px 50px;
    font-size: 20px;
  }
}
</style>
