<template>
  <div class="nav">
    <div class="content">
      <div class="name" @click="$router.push('/')">余华的个人博客</div>
      <div class="nav-content">
        <div class="item">首页</div>
        <div class="item">分类</div>
        <div class="item">关于我</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutNav",
};
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .content {
    width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: var(--text-black);
      font-weight: bold;
      font-size: 35px;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      line-height: 1.45;
      letter-spacing: 0.5px;
    }
    .nav-content {
      display: flex;
      .item {
        padding: 20px 10px 20px;
        font-family: "Montserrat", sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0.5px;
        color: var(--text-black);
        cursor: pointer;
      }
    }
  }
}
</style>