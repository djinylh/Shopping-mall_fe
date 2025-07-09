<script setup>
import { computed } from 'vue';
import { addItem } from '@/services/CartService';
import { useAccountStore } from '@/stores/account';

const account = useAccountStore();

const props = defineProps({
  item: {
    id: Number,
    imgPath: String,
    name: String,
    price: Number,
    discountPer: Number,
  },
});
const computedItemDiscountPrice = computed(() => {
  return (
    (
      props.item.price -
      (props.item.price * props.item.discountPer) / 100
    ).toLocaleString() + '원'
  );
});
const put = async () => {
  if (account.state.loggedIn === false) {
    alert('로그인이 필요합니다');
  } else {
    const res = await addItem(props.item.id);
    if (res === undefined || res.status !== 200) {
      return;
    }
    console.log('카트 담기 성공');
  }
};

// const love = ref(true);
// const toggle = () => {
//   love != love;
// };
</script>
<template>
  <div class="card shadow-sm">
    <!-- 상품 사진 -->
    <span
      class="img"
      :style="{
        backgroundImage: `url('/pic/item/${props.item.imgPath}')`,
      }"
      :aria-label="`상품 사진(${props.item.name})`"
    ></span>
    <div class="card-body">
      <p class="card-text">
        <!-- 상품 이름 -->
        <span class="me-2">{{ props.item.name }}</span>
        <!-- 상품 할인율 -->
        <span class="discount badge bg-danger"
          >{{ props.item.discountPer }}% 할인</span
        >
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-sm" @click="put()">
          <img
            class="car"
            src="/src/imgs/pngtree-cart-icon-for-your-project-png-image_1904818.png"
          />
        </button>
        <!-- <div class="rrr" @click="toggle" v-if="love">
          <img class="lovef" src="/src/imgs/free-icon-hearts-138406.png" />
        </div>
        <div v-else>
          <img class="lovet" src="/src/imgs/free-icon-hearts-138533.png" />
        </div> -->
        <small class="price">{{ props.item.price.toLocaleString() }}원</small>
        <small class="real text-danget">{{ computedItemDiscountPrice }}</small>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  .img {
    display: inline-block;
    width: 100%;
    height: 250px;
    background-size: cover;
    background-position: center;
  }
  .card-body .price {
    text-decoration: line-through;
    font-size: 13px;
    margin-left: auto;
    color: darkgray;
  }
  .real {
    font-size: 20px;
    font-weight: 700;
  }
}
.btn {
  margin-left: -10px;
}
.car {
  width: 50px;
  height: 50px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 40%;
  }
}
.discount {
  background-color: lightpink !important;
}
.card-text {
  font-size: 17px;
}


</style>
