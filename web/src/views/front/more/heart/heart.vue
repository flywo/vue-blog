<template>
  <div class="heart-back">
    <div class="heart-content" ref="container"></div>
    <div class="center">
      <p>这么好看的背景，来听首歌吧。</p>
      <el-image
        class="play-button button-selected"
        :src="require(isPlay ? '@/assets/pause4.png' : '@/assets/play4.png')"
        @click="play"
      ></el-image>
      <el-slider class="voice-slider" v-model="voice"></el-slider>
      <p class="more">
        更多有趣的内容，请关注<a class="more-a" target="_blank" href="/"
          >余华的个人博客</a
        >。
      </p>
    </div>
    <div class="bottom">
      <p @click="open">蜀ICP备19041988号-1</p>
    </div>
    <audio
      :src="require('@/assets/songbie.mp3')"
      ref="audioplayer"
      :loop="true"
    ></audio>
  </div>
</template>

<script>
import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
export default {
  name: "HeartView",
  data() {
    return {
      voice: 100,
      isPlay: false,
    };
  },
  watch: {
    voice(value) {
      this.$refs.audioplayer.volume = value / 100.0;
    },
  },
  computed: {},
  components: {},
  mounted() {
    document.title = "心动的声音";
    const container = this.$refs.container;
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.append(renderer.domElement);
    const uniforms = {
      u_resolution: {
        value: [container.clientWidth * 2, container.clientHeight * 2],
      },
      u_time: { value: 0 },
    };
    const plang = new THREE.PlaneGeometry(2, 2);
    const planm = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    const plan = new THREE.Mesh(plang, planm);
    scene.add(plan);
    function renderMethod() {
      uniforms.u_time.value += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(renderMethod);
    }
    renderMethod();
    window.addEventListener("resize", () => {
      uniforms.u_resolution.value = [
        container.clientWidth * 2,
        container.clientHeight * 2,
      ];
      camera.aspect = container.clientWidth / container.clientHeight;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  },
  beforeDestroy() {},
  methods: {
    play() {
      if (this.isPlay) {
        this.$refs.audioplayer.pause();
      } else {
        this.$refs.audioplayer.play();
      }
      this.isPlay = !this.isPlay;
    },
    open() {
      window.open("https://beian.miit.gov.cn/");
    },
  },
};
</script>

<style lang="scss" scoped>
.heart-back {
  height: 100%;
  width: 100%;
  position: relative;
  .heart-content {
    height: 100%;
    width: 100%;
  }
  .center {
    position: absolute;
    color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .play-button {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      animation: animation 3s linear infinite;
    }
    .voice-slider {
      margin-top: 20px;
      width: 200px;
      ::v-deep .el-slider__bar {
        background-color: white;
      }
      ::v-deep .el-slider__button {
        border: 2px solid white;
      }
    }
    .more,
    .more-a {
      font-family: "marcellus_scregular", serif;
      text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.55);
      color: white;
    }
    .more-a {
      margin-left: 5px;
    }
  }
  .bottom {
    position: fixed;
    height: 20px;
    width: 100%;
    bottom: 0;
    background-color: #6ae79277;
    display: flex;
    p {
      margin: auto;
      color: white;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>