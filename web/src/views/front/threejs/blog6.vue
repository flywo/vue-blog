<template>
  <div class="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
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
    camera.position.set(20, 20, 20);

    // 渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.append(renderer.domElement);

    // 立方体
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -10;
    scene.add(mesh);
    const geometry1 = new THREE.BoxGeometry(10, 10, 10);
    const material1 = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.y = 10;
    scene.add(mesh1);

    // 光
    const composer = new EffectComposer(renderer);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      // 泛光的范围
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      // 强度
      1.5,
      // 发光半径
      0.1,
      // 泛光触发的光照强度阈值，大于该值，则会触发泛光
      0.1
    );
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 动画
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
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