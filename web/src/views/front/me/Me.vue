<template>
  <div class="me-back">
    <div class="content">
      <div class="title">
        <p>你好，欢迎来到我的博客。我叫<strong>余华</strong>。</p>
        <p>前端开发 | iOS开发 | Flutter开发 | Node.js开发</p>
      </div>
      <div class="stack">
        <strong>技术栈</strong>
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
        <strong>技能简介</strong>
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
    margin-left: calc((100% - 1000px) / 2);
    width: 1000px;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    background: #fff;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
    .title {
      p:first-child {
        font-size: 30px;
        strong {
          font-weight: bold;
        }
      }
    }
    .stack {
      margin-top: 40px;
      strong {
        font-weight: bold;
        font-size: 20px;
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
        font-size: 20px;
      }
      .time-line {
        padding: 20px;
      }
    }
  }
}
</style>