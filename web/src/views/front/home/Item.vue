<template>
  <div class="item-back">
    <div class="image-back" @click="jumpBlog($event, options.id, options.path)">
      <el-image class="image" :src="options.image" fit="cover" lazy></el-image>
    </div>
    <div class="time">{{ options.time }}</div>
    <div class="type-back">
      <a href="#" @click="jumpType($event, { id: options.typeId })">{{
        options.typeName
      }}</a>
    </div>
    <h1 class="title">
      <a href="#" @click="jumpBlog($event, options.id, options.path)">{{
        options.title
      }}</a>
    </h1>
    <div class="preview-back">
      <p class="preview">{{ options.preview }}</p>
    </div>
  </div>
</template>

.<script>
export default {
  props: ["options"],
  name: "HomeItem",
  methods: {
    jumpType(event, type) {
      event.preventDefault();
      this.$bus.$emit("changeToType", type);
    },
    jumpBlog(event, id, path) {
      event.preventDefault();
      if (path.length > 0) {
        this.$router.push({
          path: path,
          query: {
            id,
          },
        });
        return;
      }
      this.$router.push({
        path: "./content",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-back {
  height: 400px;
  background: #fff;
  border-radius: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.05),
    0 22px 27px -20px rgba(7, 10, 25, 0.05);
  box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.05),
    0 22px 27px -20px rgba(7, 10, 25, 0.05);
  position: relative;
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
  .time {
    height: 34px;
    width: 100%;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    text-transform: capitalize;
    color: #333;
  }
  .type-back {
    width: 100%;
    height: 35px;
    position: absolute;
    top: -15px;
    left: 0;
    display: flex;
    a {
      margin: auto;
      height: 100%;
      text-align: center;
      line-height: 35px;
      background-color: var(--bg-green);
      color: white;
      font-size: 15px;
      display: inline-block;
      padding-inline: 30px;
      border-radius: 17.5px;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-decoration: none;
      outline: 0;
      transition: all 300ms ease;
    }
    a:hover {
      transform: translateY(-2px);
    }
  }
  .title {
    font-size: 22px;
    line-height: 1.35;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    letter-spacing: 0.6px;
    color: #222;
    text-align: center;
    word-wrap: break-word;
    padding-inline: 20px;
    margin: 0;
    a {
      background-image: linear-gradient(to right, #6ae792 0%, #6ae792 100%);
      background-size: 0px 4px;
      background-repeat: no-repeat;
      background-position: left 87%;
      padding-bottom: 5px;
      color: #333;
      transition: all 300ms ease;
      text-decoration: none;
      outline: 0;
    }
    a:hover {
      color: #222;
      background-size: 100% 4px;
    }
  }
  .preview-back {
    flex-grow: 1;
    padding-inline: 20px;
    display: flex;
    margin-bottom: 5px;
    .preview {
      margin: auto;
      text-align: center;
      color: #333;
      letter-spacing: 0.3px;
      word-wrap: break-word;
    }
  }
}
</style>