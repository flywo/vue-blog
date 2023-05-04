<template>
  <div class="e-back">
    <div class="e-content">
      <el-select v-model="choice">
        <el-option
          v-for="(item, index) in uses"
          :key="item.name + index"
          :label="item.name"
          :value="index"
        ></el-option>
      </el-select>
      <div class="image">
        <el-image
          :src="this.gifUrl"
          v-loading="loading"
          v-if="this.gifUrl"
        ></el-image>
        <el-image :src="img ?? ''" v-loading="loading" v-else></el-image>
        <div class="build button-selected" @click="build(false)">预览</div>
        <div class="build button-selected" @click="build(true)">下载</div>
      </div>
      <input-view
        :index="index + 1"
        :value="item.default"
        :ref="'item' + index"
        v-for="(item, index) in inputs"
        :key="item.default + index"
      ></input-view>
    </div>
  </div>
</template>

<script>
import InputView from "./input.vue";
import woshuode from "./data/woshuode";
import weisuoyuwei from "./data/weisuoyuwei";
import wangjingze from "./data/wangjingze";
import shuifandui from "./data/shuifandui";
import lianliankan from "./data/lianliankan";
import dagong from "./data/dagong";
import omggif from "omggif";
import GIF from "gif.js";
export default {
  name: "EmoticonsView",
  data() {
    return {
      // 选择的图片
      img: null,
      // 预设文字
      inputs: [],
      // 选择的序号
      choice: 0,
      // gif路径
      gifUrl: null,
      // 是否加载
      loading: false,
      // 所有gif
      uses: [
        {
          config: woshuode,
          name: "我说的",
        },
        {
          config: wangjingze,
          name: "王境泽",
        },
        {
          config: weisuoyuwei,
          name: "为所欲为",
        },
        {
          config: lianliankan,
          name: "星际还是魔兽",
        },
        {
          config: shuifandui,
          name: "谁赞成，谁反对",
        },
        {
          config: dagong,
          name: "打工是不可能打工的",
        },
      ],
    };
  },
  watch: {
    choice(value) {
      this.use(this.uses[value].config);
    },
  },
  computed: {},
  components: {
    InputView,
  },
  mounted() {
    this.use(this.uses[0].config);
  },
  beforeDestroy() {},
  methods: {
    // 下载gif
    downGif() {
      let a = document.createElement("a");
      a.href = this.gifUrl;
      a.download = "build.gif";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // 渲染gif
    renderGif() {
      this.gif.render();
      this.gif.on("progress", (progress) => {
        console.log("渲染进度：", progress);
        this.loading = true;
      });
      this.gif.on("finished", (blob) => {
        console.log("渲染完毕");
        this.loading = false;
        this.gifUrl = URL.createObjectURL(blob);
        if (this.download) {
          this.downGif();
        }
      });
    },
    // 处理gif
    drawFrame(info) {
      for (let i = 0; i < info.gifReader.numFrames(); i++) {
        info.gifReader.decodeAndBlitFrameRGBA(i, info.pixelBuffer);
        let imageData = new window.ImageData(
          info.pixelBuffer,
          info.width,
          info.height
        );
        info.ctx.putImageData(imageData, 0, 0);
        let frameInfo = info.gifReader.frameInfo(i);
        if (info.index < this.inputs.length) {
          this.drawCaptions(info, frameInfo);
        }
        this.gif.addFrame(info.ctx, {
          copy: true,
          delay: frameInfo.delay * 10,
          dispose: -1,
        });
      }
    },
    // 渲染文字
    drawCaptions(info, frameInfo) {
      var textInfo = this.inputs[info.index];
      if (textInfo.startTime <= info.time && info.time <= textInfo.endTime) {
        var text = textInfo.default;
        info.ctx.strokeText(text, info.width / 2, info.height - 5, info.width);
        info.ctx.fillText(text, info.width / 2, info.height - 5, info.width);
      }
      info.time += frameInfo.delay / 100;
      if (info.time > textInfo.endTime) {
        info.index++;
      }
    },
    // 创建构造器
    async createWorkers(info) {
      const tmpWorker = await fetch("./js/gif.worker.js"),
        workerSrcBlob = new Blob([await tmpWorker.text()], {
          type: "text/javascript",
        }),
        workerBlobURL = window.URL.createObjectURL(workerSrcBlob);
      this.gif = new GIF({
        workerScript: workerBlobURL,
        workers: 3,
        quality: 16,
        width: info.width,
        height: info.height,
      });
    },
    // 创建画布
    createCanvasContext(width, height) {
      const canvas = document.createElement("canvas");
      [canvas.width, canvas.height] = [width, height];
      const ctx = canvas.getContext("2d");
      ctx.font = "16px 'Microsoft YaHei', sans-serif";
      [ctx.textAlign, ctx.textBaseline] = ["center", "bottom"];
      [ctx.fillStyle, ctx.strokeStyle] = ["white", "black"];
      [ctx.lineWidth, ctx.lineJoin] = [3, "round"];
      return [canvas, ctx];
    },
    // 创建gif
    async createGif() {
      const tmp = await fetch(this.img),
        response = await tmp.arrayBuffer(),
        arrayBufferView = new Uint8Array(response),
        gifReader = new omggif.GifReader(arrayBufferView),
        frameZeroInfo = gifReader.frameInfo(0),
        [, ctx] = this.createCanvasContext(
          frameZeroInfo.width,
          frameZeroInfo.height
        );
      return {
        index: 0,
        time: 0,
        ctx: ctx,
        gifReader: gifReader,
        width: frameZeroInfo.width,
        height: frameZeroInfo.height,
        pixelBuffer: new Uint8ClampedArray(
          frameZeroInfo.width * frameZeroInfo.height * 4
        ),
      };
    },
    // 构建
    async build(download) {
      if (this.loading) {
        return;
      }
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].default = this.$refs["item" + i][0].input;
      }
      this.download = download;
      const info = await this.createGif();
      await this.createWorkers(info);
      this.drawFrame(info);
      this.renderGif();
    },
    use(config) {
      this.gifUrl = null;
      this.img = require(`@/assets/${config.img}.gif`);
      this.inputs = config.config;
    },
  },
};
</script>

<style lang="scss" scoped>
.e-back {
  width: 100%;
  padding-bottom: 40px;
  .e-content {
    .image {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .build {
        margin-left: 40px;
        color: white;
        width: 200px;
        height: 50px;
        background: var(--bg-green);
        border-radius: 5px;
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
@media only screen and (min-width: 1020px) {
  .e-content {
    margin-left: calc((100% - var(--big-screen-min-width)) / 2);
    width: var(--big-screen-min-width);
  }
}

@media only screen and (max-width: 1020px) {
  .e-content {
    margin-left: 20px;
    width: calc(100% - 40px);
  }
}
</style>