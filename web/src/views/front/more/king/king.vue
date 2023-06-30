<template>
  <div
    class="king-back"
    v-loading="loading"
    :element-loading-text="'加载资源中，已加载: ' + progress + '%'"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="k-b-bg" ref="container"></div>
    <div class="content" v-if="!loading">
      <h1>国王大厅</h1>
      <h3>
        这是一个国王大厅，你可以点击鼠标左键，切换查看视角。
      </h3>
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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
export default {
  name: "KingView",
  data() {
    return {
      loading: true,
      progress: 0,
    };
  },
  computed: {},
  components: {},
  mounted() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const container = this.$refs.container;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer.setClearColor(0xa3a3a3);
    camera.position.set(-1.7, 0, 8.7);
    camera.lookAt(1.7, 0, 8.7);

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, loaded, total) => {
      this.progress = parseInt((loaded / total) * 100);
    };
    loadingManager.onLoad = () => {
      this.loading = false;
    };

    const gltfLoader = new GLTFLoader(loadingManager);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    let position = 0;
    gltfLoader.load("static/gltf/the_king_s_hall/scene.gltf", function (gltf) {
      const model = gltf.scene;
      scene.add(model);

      window.addEventListener("mouseup", function () {
        switch (position) {
          case 0:
            moveCamera(-1.8, 1.6, 5);
            rotateCamera(0, 0.1, 0);
            position = 1;
            break;
          case 1:
            moveCamera(2.8, 0, 3.6);
            rotateCamera(0, -2, 0);
            position = 2;
            break;
          case 2:
            moveCamera(2.5, -0.9, 12.2);
            rotateCamera(0.9, 0.6, -0.6);
            position = 3;
            break;
          case 3:
            moveCamera(-2.7, 0.6, 3.7);
            rotateCamera(0.6, 1.9, -0.6);
            position = 4;
            break;
          case 4:
            moveCamera(-1.7, 0, 8.7);
            rotateCamera(0, 4.7, 0);
            position = 5;
            break;
          case 5:
            moveCamera(0.5, 0.8, 10);
            rotateCamera(0.3, 1.65, -0.3);
            position = 0;
        }
      });
      function moveCamera(x, y, z) {
        gsap.to(camera.position, {
          x,
          y,
          z,
          duration: 3,
        });
      }
      function rotateCamera(x, y, z) {
        gsap.to(camera.rotation, {
          x,
          y,
          z,
          duration: 3.2,
        });
      }
    });

    function animate() {
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
    window.addEventListener("resize", function () {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  },
  beforeDestroy() {},
  methods: {
    open() {
      window.open("https://beian.miit.gov.cn/");
    },
  },
};
</script>

<style lang="scss" scoped>
.king-back {
  height: 100%;
  width: 100%;
  background-color: black;
  .k-b-bg {
    height: 100%;
    width: 100%;
  }
  .content {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      color: #6ae792;
      font-family: "marcellus_scregular", serif;
      text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.55);
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      font-size: 40px;
    }
    h3 {
      color: #6ae792;
      font-family: "marcellus_scregular", serif;
      text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.55);
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      font-size: 18px;
    }
    .more,
    .more-a {
      font-family: "marcellus_scregular", serif;
      text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.55);
      color: #6ae792;
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