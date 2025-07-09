<script setup>
import router from '@/router';
import { logout } from '@/services/accountSerivce';
import { useAccountStore } from '@/stores/account';
//로그아웃
const account = useAccountStore();

const logoutAccount = async () => {
  if (!confirm('로그아웃 하시겠습니까?')) {
    return;
  }
  const res = await logout();
  if (res === undefined || res.status !== 200) {
    return;
  }
  account.setLoggedIn(false);
  router.push('/');
  return;
};
</script>

<template>
  <header>
    <div class="navbar navbar-dark text-white shadow-sm">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">
          <strong>Mollang Shop</strong>
        </RouterLink>
        <div class="menus d-flex gap-3">
          <template v-if="account.state.loggedIn">
            <a @click="logoutAccount">로그아웃</a>
            <RouterLink to="/orders">주문내역</RouterLink>
            <RouterLink to="/cart">장바구니</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/login">로그인</RouterLink>
            <RouterLink to="/join"> 회원가입</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
header {
  .menus {
    a {
      cursor: pointer;
      color: #fff;
      text-decoration: none;
    }
  }
  .navbar {
    background-color: lightpink;
  }
}
</style>
