<template>
  <div class="item-back">
    <div class="image-back">
      <el-image class="image" :src="options.image" fit="cover"></el-image>
    </div>
    <div class="time">{{ options.time }}</div>
    <div class="title">{{ options.title }}</div>
    <div class="preview">{{ options.preview }}</div>
    <div class="type">{{ options.type }}</div>
  </div>
</template>

.<script>
export default {
  props: ["options"],
  name: "HomeItem",
};
</script>

<style lang="scss" scoped>
.item-back {
  height: 400px;
  background: #fff;
  border-radius: 15px;
  position: relative;
  -webkit-box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.05),
    0 22px 27px -20px rgba(7, 10, 25, 0.05);
  box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.05),
    0 22px 27px -20px rgba(7, 10, 25, 0.05);
  .image-back {
    background-color: black;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    height: 200px;
    width: 100%;
    .image {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      height: 100%;
      width: 100%;
      opacity: 1;
      cursor: pointer;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transition: all 600ms ease;
      -o-transition: all 600ms ease;
      transition: all 600ms ease;
    }
    .image:hover {
      opacity: 0.8;
    }
  }
}
</style>