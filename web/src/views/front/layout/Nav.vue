<template>
  <div class="nav">
    <div class="content">
      <div class="name" @click="changeToMain">余华的个人博客</div>
      <div class="nav-content" @click="changeCurrent">
        <div class="item" :class="current === 0 ? 'current' : ''">首页</div>
        <div style="width: 20px"></div>
        <div class="item more" :class="current === 1 ? 'current' : ''">
          分类
          <ul class="sub-menu">
            <li v-for="(item, index) in types" :key="item + index">
              <div>{{ item.title }}</div>
            </li>
          </ul>
        </div>
        <div style="width: 20px"></div>
        <div class="item" :class="current === 2 ? 'current' : ''">关于我</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/request/request";

export default {
  name: "LayoutNav",
  data() {
    return {
      current: 0,
      types: [],
    };
  },
  mounted() {
    get("/type/list", {}, false, false, (data) => {
      this.types = data;
    });
  },
  methods: {
    changeToMain() {
      if (this.$route.path !== "/home") {
        this.current = 0;
        this.$router.push("/home");
      }
    },
    changeCurrent(event) {
      const name = event.target.innerText;
      if (name === "首页") {
        this.changeToMain();
      } else if (name === "关于我") {
        if (this.$route.path !== "/me") {
          this.current = 2;
          this.$router.push("/me");
        }
      }
    },
  },
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
        padding: 20px 10px;
        font-family: "Montserrat", sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0.5px;
        color: var(--text-black);
        cursor: pointer;
        transition: all 300ms ease;
        background-size: 0 4px;
        background-position: bottom 10px left 0;
        background-image: linear-gradient(
          to right,
          var(--bg-green) 0%,
          var(--bg-green) 100%
        );
        background-repeat: no-repeat;
        position: relative;
      }
      .current {
        background-size: 100% 4px;
      }
      .item:hover {
        background-size: 100% 4px;
      }
      .more {
        .sub-menu {
          position: absolute;
          right: -20px;
          top: 100%;
          z-index: 100;
          padding: 15px 0;
          background: #fff;
          border-radius: 7px;
          min-width: 250px;
          text-align: left;
          opacity: 0;
          visibility: hidden;
          -webkit-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
          box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
          -webkit-transform: translateY(-15px);
          -ms-transform: translateY(-15px);
          transform: translateY(-15px);
          -webkit-transition: all 500ms ease;
          -o-transition: all 500ms ease;
          transition: all 500ms ease;
          li {
            -webkit-transition: all 300ms ease;
            -o-transition: all 300ms ease;
            transition: all 300ms ease;
            cursor: pointer;
            div {
              padding: 10px 25px;
              display: block;
              font-family: "Poppins", "Nunito Sans", "Montserrat", sans-serif;
              font-size: 14px;
              font-weight: 500;
              color: #333;
            }
          }
          li:hover {
            color: #333;
            background: #f6f6f6;
          }
        }
      }
      .more:hover {
        .sub-menu {
          opacity: 1;
          visibility: visible;
          -webkit-transform: scale(1) translateY(0px);
          -ms-transform: scale(1) translateY(0px);
          transform: scale(1) translateY(0px);
        }
      }
      .more::after {
        font-family: "FontAwesome";
        content: "⌄";
        display: block;
        color: black;
        position: absolute;
        font-size: 15px;
        right: -5px;
        top: 18px;
        z-index: 5;
      }
    }
  }
}
</style>