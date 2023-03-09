<template>
  <div class="me-back">
    <div class="content">
      <div class="title">
        <strong>余华</strong>
        <p>前端开发 | iOS开发 | Flutter开发 | Node.js开发</p>
      </div>
      <div class="detail">
        <strong class="d-title">个人简介</strong>
        <p>
          从13年大学毕业开始，一直从事编码工作。一开始搞C语言开发，后来搞iOS开发，搞iOS开发的时间最长，再后来看到了Flutter，于是开始搞Flutter，到现在搞前端，搞了前端过后，发现有Node.js这么个好东西，于是顺带着也会搞后端了。如今，我可以厚着脸皮说一声：<strong
            >我是全栈！</strong
          >
        </p>
        <el-image
          style="height: 300px; width: 100%"
          :src="require('@/assets/me0.png')"
          fit="contain"
        ></el-image>
        <p>
          有人问我，学这么多东西，不累吗？我回答是：<strong
            >累？糊口啊，大哥！</strong
          >
        </p>
        <el-image
          style="height: 300px; width: 100%"
          :src="require('@/assets/me1.png')"
          fit="contain"
        ></el-image>
      </div>
      <div class="stack">
        <strong>我的技术栈</strong>
        <div
          class="item"
          v-for="(item, index) in stack"
          :key="'stack-' + index"
        >
          <div class="i-t">{{ item.title }}</div>
          <div class="i-c">
            <div
              class="c-item"
              v-for="(content, index) in item.content"
              :key="'stack-' + content.title + index"
              @click="jumpUrl(content)"
            >
              <el-image
                class="image"
                :src="require('@/assets/' + content.image)"
                fit="contain"
              ></el-image>
              <div class="c-title">{{ content.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="experience">
        <strong>我的技能简介</strong>
        <el-timeline class="time-line">
          <el-timeline-item timestamp="2013" placement="top">
            <el-card>
              <h2>大学毕业</h2>
              <h4>单片机开发</h4>
              <p>获得C语言开发技能。</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2015" placement="top">
            <el-card>
              <h4>iOS开发</h4>
              <p>获得Objective-C、Swift语言开发技能。</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2019" placement="top">
            <el-card>
              <h4>Flutter开发</h4>
              <p>获得Dart语言开发技能。</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2021" placement="top">
            <el-card>
              <h4>前端开发</h4>
              <p>获得Vue、React、Node.js、Electron、Python开发技能。</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="contact">
        <el-image
          class="icon"
          fit="contain"
          :src="require('@/assets/github.png')"
          @click="jumpUrl({ url: 'https://github.com/flywo' })"
        ></el-image>
        <el-image
          class="icon"
          fit="contain"
          :src="require('@/assets/js.png')"
          @click="jumpUrl({ url: 'https://www.jianshu.com/u/dacb5494231b' })"
        ></el-image>
        <el-popover placement="top" trigger="hover">
          <div style="text-align: center; margin-block: 5px">316910279</div>
          <div class="qq" slot="reference">QQ</div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeView",
  data() {
    return {
      stack: [
        {
          title: "前端",
          content: [
            {
              title: "Vue",
              image: "vue.png",
              url: "https://vuejs.org",
            },
            {
              title: "React",
              image: "react.png",
              url: "https://reactjs.org",
            },
          ],
        },
        {
          title: "移动端",
          content: [
            {
              title: "iOS",
              image: "ios.png",
              url: "https://developer.apple.com",
            },
            {
              title: "Flutter",
              image: "flutter.png",
              url: "https://flutter.dev",
            },
          ],
        },
        {
          title: "PC端",
          content: [
            {
              title: "Electron",
              image: "electron.png",
              url: "https://www.electronjs.org",
            },
          ],
        },
        {
          title: "后端",
          content: [
            {
              title: "Node",
              image: "node.png",
              url: "https://nodejs.org/en/",
            },
          ],
        },
        {
          title: "其它",
          content: [
            {
              title: "C",
              image: "c.png",
              url: "https://www.w3schools.com/c/c_intro.php",
            },
            {
              title: "Python",
              image: "python.png",
              url: "https://www.python.org",
            },
          ],
        },
      ],
    };
  },
  methods: {
    jumpUrl(content) {
      window.open(content.url);
    },
  },
};
</script>

<style lang="scss" scoped>
.me-back {
  padding-bottom: 20px;
  .content {
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    background: #fff;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    transition: all 0.3s ease-out;
    .title {
      strong {
        font-size: 50px;
        font-weight: bold;
      }
      p:last-child {
        color: #999;
      }
    }
    .detail {
      margin-top: 40px;
      .d-title {
        font-weight: bold;
        font-size: 30px;
      }
      p {
        font-size: 18px;
      }
    }
    .stack {
      margin-top: 40px;
      strong {
        font-weight: bold;
        font-size: 30px;
      }
      .item {
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        padding: 20px;
        margin: 20px;
        background-color: #f2f2f2;
        .i-t {
          font-weight: bold;
        }
        .i-c {
          display: flex;
          justify-content: space-evenly;
          .c-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease-out;
            .image {
              width: 100px;
              height: 100px;
            }
          }
          .c-item:hover {
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
    .experience {
      margin-top: 40px;
      strong {
        font-weight: bold;
        font-size: 30px;
      }
      .time-line {
        padding: 20px;
      }
    }
    .contact {
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      .icon,
      .qq {
        margin: 10px;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        height: 40px;
        width: 40px;
        cursor: pointer;
        transition: all 0.3s ease-out;
      }
      .icon:hover,
      .qq:hover {
        transform: scale(1.1, 1.1);
      }
      .qq {
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
@media only screen and (min-width: 1020px) {
  .me-back {
    .content {
      margin-left: calc((100% - var(--big-screen-min-width)) / 2);
      width: var(--big-screen-min-width);
    }
  }
}

@media only screen and (max-width: 1020px) {
  .me-back {
    .content {
      margin-left: 20px;
      width: calc(100% - 40px);
    }
  }
}
</style>