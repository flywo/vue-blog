<template>
  <div class="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default {
  name: "BlogView",
  mounted() {
    // 容器
    const container = document.querySelector(".scene-container");

    // 场景
    const scene = new THREE.Scene();

    // 相机
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    // 加载器
    const loader = new GLTFLoader();
    loader.load('static/gltf/dino/scene.gltf', (gltf) => {
        scene.add(gltf.scene);
    });

    // 渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.append(renderer.domElement);

    // 直线光
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.add(topLight);

    // 环境光
    const ambientLight = new THREE.AmbientLight(0x333333, 5);
    scene.add(ambientLight);

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 动画
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // 界面改变
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
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