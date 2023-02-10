<template>
  <div class="back">
    <div class="c-bg">
      <div class="center">
        <i class="el-icon-warning"></i>
        <div>404</div>
        <div>没有该页面！</div>
      </div>
      <el-button class="back-button" type="primary" @click="$router.go(-1)"
        >返回上一页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style lang="scss" scoped>
.back {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .c-bg {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .center {
      width: 900px;
      height: 360px;
      background-color: var(--bg-gray-color);
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      i {
        margin: auto;
        color: var(--bg-color);
        font-size: 200px;
      }
      div {
        margin: auto;
        color: var(--bg-color);
      }
      div:nth-child(2) {
        font-size: 40px;
        font-weight: bold;
      }
      div:nth-child(3) {
        font-size: 20px;
      }
    }
    .back-button {
      margin: 40px;
      height: 40px;
      width: 200px;
      border-radius: 20px;
    }
  }
}
</style>