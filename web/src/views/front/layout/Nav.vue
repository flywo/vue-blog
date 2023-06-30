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
            <li
              v-for="(item, index) in types"
              :key="item + index"
              @click="changeToType(item)"
            >
              <div
                :class="
                  current === 1 && typeIndex === index ? 'current-type' : ''
                "
              >
                {{ item.title }}
              </div>
              <div
                :class="
                  current === 1 && typeIndex === index ? 'current-type' : ''
                "
              >
                {{ item.total }}篇
              </div>
            </li>
          </ul>
        </div>
        <div style="width: 20px"></div>
        <div class="item more" :class="current === 4 ? 'current' : ''">
          小玩具
          <ul class="sub-menu">
            <li
              v-for="(item, index) in more"
              :key="item + index"
              @click="changeMoreType(item)"
            >
              <div
                :class="
                  current === 4 &&
                  ((index === 0 && $route.path === '/soup') ||
                    (index === 3 && $route.path === '/emoticons'))
                    ? 'current-type'
                    : ''
                "
              >
                {{ item }}
              </div>
            </li>
          </ul>
        </div>
        <div style="width: 20px"></div>
        <div class="item" :class="current === 2 ? 'current' : ''">关于我</div>
        <div style="width: 20px"></div>
        <div class="item" :class="current === 3 ? 'current' : ''">关于博客</div>
      </div>
      <i class="nav-icon el-icon-s-fold" @click="showDrawer = true"></i>
    </div>
    <el-drawer
      title="余华的个人博客"
      :visible.sync="showDrawer"
      direction="rtl"
      :destroy-on-close="true"
      size="40%"
    >
      <el-menu
        :default-active="
          current === 1
            ? '1-' + typeIndex
            : current === 4
            ? '4-' + typeIndex
            : current.toString()
        "
        :default-openeds="current === 1 ? ['1'] : current === 4 ? ['4'] : []"
        @select="selectMenu"
      >
        <el-menu-item index="0">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <span slot="title">分类</span>
          <el-menu-item
            v-for="(item, index) in types"
            :key="'drawer-type-' + index"
            :index="'1-' + index"
            ><div class="type-item">
              <div>{{ item.title }}</div>
              <div style="flex-grow: 1"></div>
              <div>{{ item.total }}篇</div>
            </div></el-menu-item
          >
        </el-submenu>
        <el-submenu index="4">
          <span slot="title">小玩具</span>
          <el-menu-item
            v-for="(item, index) in more"
            :key="'drawer-type-more-' + index"
            :index="'4-' + index"
            ><div class="type-item">
              <div>{{ item }}</div>
            </div></el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2">
          <span slot="title">关于我</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">关于博客</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
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
      showDrawer: false,
      typeIndex: 0,
      more: ["毒鸡汤", "听雨轩", "方块城市", "表情包", "九大行星", "国王大厅"],
    };
  },
  watch: {
    types(value) {
      if (this.$route.query.typeId) {
        this.tidyTypeIndex(value, this.$route.query.typeId);
      }
    },
  },
  mounted() {
    get("/type/list", {}, false, false, (data) => {
      this.types = data;
    });
    this.$bus.$on("changeToType", (type) => {
      this.changeToType(type);
    });
    if (this.$route.query.typeId) {
      this.current = 1;
    }
    if (this.$route.path === "/me") {
      this.current = 2;
    } else if (this.$route.path === "/blog") {
      this.current = 3;
    } else if (this.$route.path === "/soup") {
      this.typeIndex = 0;
      this.current = 4;
    } else if (this.$route.path === "/emoticons") {
      this.typeIndex = 3;
      this.current = 4;
    }
  },
  beforeDestroy() {
    this.$bus.$off("changeToType");
  },
  methods: {
    // 切换nav，小屏时用
    selectMenu(index) {
      if (index.indexOf("-") !== -1) {
        const arr = index.split("-");
        if (arr[0] === "1") {
          this.changeToType(this.types[parseInt(arr[1])]);
        } else if (arr[0] === "4") {
          let more;
          if (arr[1] === "0") {
            more = "毒鸡汤";
          } else if (arr[1] === "1") {
            more = "听雨轩";
          } else if (arr[1] === "2") {
            more = "方块城市";
          } else if (arr[1] === "3") {
            more = "表情包";
          } else if (arr[1] === "4") {
            more = "九大行星";
          } else if (arr[1] === "5") {
            more = "国王大厅";
          }
          this.changeMoreType(more);
        }
      } else {
        if (index === "0") {
          this.changeToMain();
        } else if (index === "2") {
          this.current = 2;
          this.$router.push("/me");
        } else if (index === "3") {
          this.current = 3;
          this.$router.push("/blog");
        }
      }
    },
    // 改变当前分类
    tidyTypeIndex(types, typeId) {
      types.forEach((item, index) => {
        if (item.id === typeId) {
          this.typeIndex = index;
        }
      });
    },
    // 改变分类
    changeToType(type) {
      this.tidyTypeIndex(this.types, type.id);
      this.current = 1;
      this.$router.push({
        path: "/home",
        query: {
          typeId: type.id,
        },
      });
    },
    // 跳到首页
    changeToMain() {
      this.current = 0;
      this.$router.push("/home");
    },
    // 跳到更多
    changeMoreType(type) {
      if (type === "毒鸡汤") {
        this.typeIndex = 0;
        this.current = 4;
        this.$router.push("/soup");
      } else if (type === "听雨轩") {
        window.open("/rainy");
      } else if (type === "方块城市") {
        window.open("/dark-city");
      } else if (type === "九大行星") {
        window.open("/solar");
      } else if (type === "国王大厅") {
        window.open("/king");
      } else if (type === "表情包") {
        this.typeIndex = 3;
        this.current = 4;
        this.$router.push("/emoticons");
      }
    },
    // 更改当前nav，大屏时用
    changeCurrent(event) {
      const name = event.target.innerText;
      if (name === "首页") {
        this.changeToMain();
      } else if (name === "关于我") {
        this.current = 2;
        this.$router.push("/me");
      } else if (name === "关于博客") {
        this.current = 3;
        this.$router.push("/blog");
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
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    transition: all 0.3s ease-out;
    .name {
      color: white;
      font-weight: bold;
      font-size: 35px;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      line-height: 1.45;
      letter-spacing: 0.5px;
    }
    .nav-content {
      display: flex;
      transition: all 0.3s ease-out;
      .item {
        padding: 20px 10px;
        font-family: "Montserrat", sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0.5px;
        color: white;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              padding: 10px 25px;
              display: block;
              font-family: "Poppins", "Nunito Sans", "Montserrat", sans-serif;
              font-size: 14px;
              font-weight: 500;
              color: #333;
            }
            .current-type {
              color: var(--bg-green);
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
    .nav-icon {
      color: white;
      position: absolute;
      top: 45px;
      right: 10px;
      font-size: 30px;
      transition: all 0.3s ease-out;
    }
  }
  .type-item {
    display: flex;
  }
}
@media only screen and (min-width: 1020px) {
  .nav {
    .content {
      width: var(--big-screen-min-width);
    }
  }
}

@media only screen and (max-width: 1020px) {
  .nav {
    .content {
      width: 100%;
      padding-inline: 20px;
    }
  }
}

@media only screen and (min-width: 720px) {
  .nav {
    .content {
      .nav-icon {
        visibility: hidden;
      }
    }
  }
}

@media only screen and (max-width: 720px) {
  .nav {
    .content {
      .nav-content {
        display: none;
      }
      .nav-icon {
        visibility: visible;
      }
    }
  }
}
</style>