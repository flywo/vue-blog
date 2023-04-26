<template>
  <div class="rainy-back" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
export default {
  name: "RainyView",
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {
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
    const ca = textureLoader.load(require("@/assets/light.jpeg"));
    const uniforms = {
      tDiffuse: { value: ca },
      u_resolution: { value: [container.clientWidth*2, container.clientHeight*2] },
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
        container.clientWidth*2,
        container.clientHeight*2,
      ];
      camera.aspect = container.clientWidth / container.clientHeight;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.rainy-back {
  height: 100%;
  width: 100%;
}
</style>