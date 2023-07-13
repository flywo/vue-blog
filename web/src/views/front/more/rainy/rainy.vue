<template>
  <div class="rainy-back">
    <div class="rainy-bg" ref="container"></div>
    <div class="rainy-content">
      <el-image
        class="play-button button-selected"
        :src="require(isPlay ? '@/assets/pause4.png' : '@/assets/play4.png')"
        @click="play"
      ></el-image>
      <audio ref="audioplayer" :loop="true">
        <source :src="require('@/assets/rainy.mp3')" type="audio/mpeg" />
      </audio>
      <el-slider class="voice-slider" v-model="voice"></el-slider>
      <h1>好雨知时节，当春乃发生。</h1>
      <p class="more">
        更多有趣的内容，请关注<a class="more-a" target="_blank" href="/"
          >余华的个人博客</a
        >。
      </p>
    </div>
    <div class="bottom">
      <p @click="open">蜀ICP备19041988号-1</p>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
export default {
  name: "RainyView",
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
    document.title = "听雨轩";
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
    const textureLoader = new THREE.TextureLoader();
    const ca = textureLoader.load(require("@/assets/green.jpeg"));
    const uniforms = {
      tDiffuse: { value: ca },
      u_resolution: {
        value: [container.clientWidth * 2, container.clientHeight * 2],
      },
      u_time: { value: 0 },
      u_transparent: { value: 0.5 },
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
.rainy-back {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  .rainy-bg {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .rainy-content {
    margin: auto;
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
    h1 {
      color: white;
      font-family: "marcellus_scregular", serif;
      text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.55);
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      font-size: 40px;
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
@keyframes animation {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.15);
  }
  40% {
    box-shadow: 0 0 0 100px rgba(255, 255, 255, 0);
  }
  80% {
    box-shadow: 0 0 0 100px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>