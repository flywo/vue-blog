<template>
  <div class="d-c-back">
    <div class="city" ref="city"></div>
    <div class="content">
      <h1>方块城市</h1>
      <h3>
        这是一个由方块组成的城市，你可以用鼠标左键长按，然后进行上下左右拖动查看，以及鼠标滚轮进行缩放查看。
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "CityView",
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {
    document.title = "方块城市";
    const container = this.$refs.city;
    const uSpeed = 0.001;
    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.append(renderer.domElement);
    // camera
    const camera = new THREE.PerspectiveCamera(
      20,
      container.clientWidth / container.clientHeight,
      1,
      500
    );
    camera.position.set(0, 6, 15);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minPolarAngle = Math.PI / 13;
    controls.maxPolarAngle = (Math.PI * 6) / 13;
    controls.minDistance = 14;
    controls.maxDistance = 20;
    // scene
    const color = 0xf02050bb;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(color);
    scene.fog = new THREE.Fog(color, 10, 20);
    // math
    function random(num = 8) {
      return -Math.random() * num + Math.random() * num;
    }
    // init
    const city = new THREE.Group();
    const smoke = new THREE.Group();
    const town = new THREE.Group();
    function init() {
      // cube
      for (let i = 1; i < 100; i++) {
        const cubeg = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
        const cubem = new THREE.MeshStandardMaterial({
          color: 0x000000,
          wireframe: false,
          flatShading: true,
          side: THREE.DoubleSide,
        });
        const waterm = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.03,
          side: THREE.DoubleSide,
        });
        const cube = new THREE.Mesh(cubeg, cubem);
        const floor = new THREE.Mesh(cubeg, cubem);
        const wfloor = new THREE.Mesh(cubeg, waterm);
        cube.add(wfloor);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(random(8));
        floor.scale.y = 0.05;
        cube.scale.y = 0.1 + Math.abs(random(8));
        const cubeWidth = 0.9;
        cube.scale.x = cube.scale.z = cubeWidth + random(1 - cubeWidth);
        cube.position.x = Math.round(random(6));
        cube.position.z = Math.round(random(6));
        floor.position.set(cube.position.x, 0, cube.position.z);
        town.add(floor);
        town.add(cube);
      }
      const m = new THREE.MeshToonMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
      });
      const g = new THREE.CircleGeometry(0.01, 3);
      const n = 5;
      for (let i = 1; i < 300; i++) {
        const p = new THREE.Mesh(g, m);
        p.position.set(random(n), random(n), random(n));
        p.rotation.set(random(), random(), random());
        smoke.add(p);
      }
      // plan
      const planeg = new THREE.PlaneGeometry(60, 60);
      const planem = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        opacity: 0.9,
        transparent: true,
      });
      const plane = new THREE.Mesh(planeg, planem);
      plane.rotation.x = (-90 * Math.PI) / 180;
      plane.position.y = -0.001;
      plane.receiveShadow = true;
      city.add(plane);
      city.add(smoke);
      city.add(town);
      // light
      const ambientLight = new THREE.AmbientLight(0xffffff, 4);
      scene.add(ambientLight);
      scene.add(city);
    }
    init();
    // animate
    const animate = () => {
      city.rotation.y -= uSpeed;
      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;
      camera.lookAt(city.position);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    // resize
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.d-c-back {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  .city {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .content {
    z-index: 1;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    h3 {
      color: white;
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