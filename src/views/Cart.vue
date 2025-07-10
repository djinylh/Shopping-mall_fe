<script setup>
import { reactive, onMounted } from 'vue';
import { getItems, removeItem, removeAll } from '@/services/CartService';

const state = reactive({
  items: [],
});

const load = async () => {
  const res = await getItems();

  console.log(res.data); // 넘어오는지 확인용
  if (res.status === 200) {
    state.items = res.data;
  }
  return;
};
const removed = async (cartId) => {
  const res = await removeItem(cartId);
  if (res === undefined || res.status !== 200) {
    return;
  }
  load();
  //다시 리로딩
  //or
  //방금 삭제한 객체만 state.items에서 삭제한다.
};

onMounted(() => {
  load();
});

const clear = async () => {
  const res = await removeAll();
  if (res === undefined || res.status !== 200) {
    return;
  }
  state.items = [];
};
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
              @click="removed(item.id)"
              title="삭제"
              >&times;</span
            >
          </li>
        </ul>
        <div class="act d-flex justify-content-center">
          <button @click="clear" class="btn">장바구니 비우기</button>
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
      margin-left: 20px;
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
    background-color: mistyrose;
    color: #fff;
    font-weight: 600;
    transition-duration: 0.2s;

    &:hover {
      opacity: 60%;
      color: brown;
    }
  }
}
</style>
