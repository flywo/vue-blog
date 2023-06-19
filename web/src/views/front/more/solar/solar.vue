<template>
  <div class="solar-back" ref="solar">
    <div class="content">
      <h1>太阳系九大行星</h1>
      <h3>
        根据离太阳的距离，由近到远，分别为：<span style="color: #6ae792"
          >水星、金星、地球、火星、木星、土星、天王星、海王星、冥王星</span
        >。
      </h3>
      <h3>网页是3D的，可上下左右拖动全方位查看。</h3>
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
  name: "SolarView",
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {
    const stars = require("@/assets/solar/stars.jpg");

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.solar.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-90, 140, 140);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    const light = new THREE.AmbientLight(0x333333);
    scene.add(light);

    const loaderCube = new THREE.CubeTextureLoader();
    scene.background = loaderCube.load([
      stars,
      stars,
      stars,
      stars,
      stars,
      stars,
    ]);

    const loaderTexture = new THREE.TextureLoader();

    const sunGeo = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
      map: loaderTexture.load(require("@/assets/solar/sun.jpg")),
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    function createPlanete(size, path, position, ring) {
      const planeteGeo = new THREE.SphereGeometry(size, 30, 30);
      const planeteMat = new THREE.MeshStandardMaterial({
        map: loaderTexture.load(require("@/assets/solar/" + path)),
      });
      const planete = new THREE.Mesh(planeteGeo, planeteMat);
      const planeteObj = new THREE.Object3D();
      planeteObj.add(planete);
      if (ring) {
        const planeteRingGeo = new THREE.RingGeometry(
          ring.innerRadius,
          ring.outerRadius,
          30
        );
        const planeteRingMat = new THREE.MeshBasicMaterial({
          map: loaderTexture.load(require("@/assets/solar/" + ring.path)),
          side: THREE.DoubleSide,
        });
        const planeteRing = new THREE.Mesh(planeteRingGeo, planeteRingMat);
        planeteRing.position.x = position;
        planeteRing.rotation.x = -0.5 * Math.PI;
        planeteObj.add(planeteRing);
      }
      scene.add(planeteObj);
      planete.position.x = position;
      return { planete, planeteObj };
    }

    const mercury = createPlanete(3.2, "mercury.jpg", 28);
    const venus = createPlanete(5.8, "venus.jpg", 44);
    const earth = createPlanete(6, "earth.jpg", 62);
    const mars = createPlanete(4, "mars.jpg", 78);
    const jupiter = createPlanete(12, "jupiter.jpg", 100);
    const neptune = createPlanete(7, "neptune.jpg", 200);
    const pluto = createPlanete(2.8, "pluto.jpg", 216);
    const saturn = createPlanete(10, "saturn.jpg", 138, {
      innerRadius: 10,
      outerRadius: 20,
      path: "saturn ring.png",
    });
    const uranus = createPlanete(10, "uranus.jpg", 176, {
      innerRadius: 7,
      outerRadius: 12,
      path: "uranus ring.png",
    });

    function animate() {
      sun.rotateY(0.004);
      mercury.planete.rotateY(0.004);
      venus.planete.rotateY(0.002);
      earth.planete.rotateY(0.02);
      mars.planete.rotateY(0.018);
      jupiter.planete.rotateY(0.04);
      saturn.planete.rotateY(0.038);
      uranus.planete.rotateY(0.03);
      neptune.planete.rotateY(0.032);
      pluto.planete.rotateY(0.008);

      mercury.planeteObj.rotateY(0.04);
      venus.planeteObj.rotateY(0.015);
      earth.planeteObj.rotateY(0.01);
      mars.planeteObj.rotateY(0.008);
      jupiter.planeteObj.rotateY(0.002);
      saturn.planeteObj.rotateY(0.0009);
      uranus.planeteObj.rotateY(0.0004);
      neptune.planeteObj.rotateY(0.0001);
      pluto.planeteObj.rotateY(0.00007);

      renderer.render(scene, camera);
    }

    const point = new THREE.PointLight(0xffffff, 2, 300);
    scene.add(point);

    renderer.setAnimationLoop(animate);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.solar-back {
  height: 100%;
  width: 100%;
  .content {
    position: fixed;
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