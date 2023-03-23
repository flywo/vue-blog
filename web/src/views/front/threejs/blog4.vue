<template>
  <div class="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
export default {
  name: "BlogView",
  mounted() {
    // 容器
    const container = document.querySelector(".scene-container");

    // 相机
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      1,
      1000000
    );
    camera.position.set(0, 0, 1000);

    // 场景
    const scene = new THREE.Scene();

    // 纹理
    const loader = new RGBELoader();
    loader.loadAsync("static/hdr/room1.hdr").then((texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.encoding = THREE.sRGBEncoding;
      scene.background = texture;
      // 球体
      const geometry = new THREE.IcosahedronGeometry(400, 15);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        envMap: texture,
      });
      const sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
      scene.add(sphereMesh);
    });

    // 渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.append(renderer.domElement);

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 2500;
    controls.enableDamping = true;

    // 界面改变
    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 界面渲染
    const animate = () => {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  },
};
</script>

<style lang="scss" scoped>
.scene-container {
  margin-top: 10px;
  height: 600px;
  width: 100%;
  flex-grow: 1;
}
</style>