<template>
  <div class="glsl-back">
    <div class="code">
      <el-input
        type="textarea"
        placeholder="请输入glsl内容"
        v-model="editContent"
        maxlength="65535"
        show-word-limit
        resize="none"
      ></el-input>
    </div>
    <canvas ref="canvas"></canvas>
    <div class="tips">修改左边的glsl代码内容，可以实时在右边看到界面变化。</div>
  </div>
</template>

<script>
import GlslCanvas from "glslCanvas";
export default {
  name: "WebGLView",
  data() {
    return {
      editContent: `#ifdef GL_ES
precision mediump float;
#endif

void main() {
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}`,
      sandbox: null,
    };
  },
  watch: {
    editContent(value) {
      this.sandbox.load(value);
    },
  },
  computed: {},
  components: {},
  mounted() {
    // 拿到canvas
    var canvas = this.$refs.canvas;
    // 创建glsl canvas
    this.sandbox = new GlslCanvas(canvas);
    // 加载片元着色器代码，使之生效
    this.sandbox.load(this.editContent);
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.glsl-back {
  margin-top: 40px;
  height: 600px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  position: relative;
  .code {
    height: 100%;
    width: 0;
    flex-grow: 1;
    box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    ::v-deep .el-textarea {
      height: 100%;
      .el-textarea__inner {
        height: 100%;
      }
    }
  }
  .tips {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--bg-green);
  }
  canvas {
    margin-left: 10px;
    height: 100%;
    width: 0;
    flex-grow: 1;
    box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.15);
  }
}
</style>