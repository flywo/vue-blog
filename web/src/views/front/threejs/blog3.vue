<template>
  <div class="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "BlogView",
  mounted() {
    // 拿到容器
    const container = document.querySelector(".scene-container");

    // 创建场景
    const scene = new THREE.Scene();
    // 场景背景色
    scene.background = new THREE.Color("black");

    // 相机角度
    const fov = 35;
    // 宽高比
    const aspect = container.clientWidth / container.clientHeight;
    // 相机近焦
    const near = 0.1;
    // 相机远焦
    const far = 100;
    // 场景相机
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // 相机位置
    camera.position.set(0, 0, 10);
    // 相机添加到场景
    scene.add(camera);

    // 盒子几何体
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // 盒子材质
    // const material = new THREE.MeshBasicMaterial();
    const material = new THREE.MeshStandardMaterial({
      color: "orange",
    });
    // 创建盒子物体
    const cube = new THREE.Mesh(geometry, material);
    // 旋转盒子
    cube.rotation.set(-0.5, -0.1, 0.8);
    // 添加到场景
    scene.add(cube);

    // 直线光
    const light = new THREE.DirectionalLight("white", 8);
    // 光位置
    light.position.set(10, 10, 10);
    // 添加灯光
    scene.add(light);

    // 渲染器
    const render = new THREE.WebGLRenderer();
    // 渲染器大小
    render.setSize(container.clientWidth, container.clientHeight);
    // 渲染器像素比
    render.setPixelRatio(window.devicePixelRatio);
    // 开启物理上正确的照明
    // render.physicallyCorrectLights = true;
    render.useLegacyLights = false;
    // 添加到页面
    container.append(render.domElement);

    // 控制器
    const controls = new OrbitControls(camera, render.domElement);
    // 阻尼
    controls.enableDamping = true;

    // 辅助线
    const axes = new THREE.AxesHelper(5);
    // 添加
    scene.add(axes);

    // 是否在放大
    let isZoom = true;
    // 是否在往右移动
    let isMoveRight = true;

    // 渲染函数
    function renderMethod() {
      // 更新控制器
      controls.update();
      // 旋转
      cube.rotation.x += 0.01;
      // 缩放
      if (isZoom) {
        cube.scale.x += 0.01;
      } else {
        cube.scale.x -= 0.01;
      }
      if (cube.scale.x > 2) {
        isZoom = false;
      } else if (cube.scale.x < 1) {
        isZoom = true;
      }
      // 平移
      if (isMoveRight) {
        cube.position.x += 0.01;
      } else {
        cube.position.x -= 0.01;
      }
      if (cube.position.x > 2) {
        isMoveRight = false;
      } else if (cube.position.x < -2) {
        isMoveRight = true;
      }
      // 渲染
      render.render(scene, camera);
      // 每一帧都调用渲染函数
      requestAnimationFrame(renderMethod);
    }
    // 渲染
    renderMethod();

    // 界面变化
    window.addEventListener("resize", () => {
      // 拿到容器
      const container = document.querySelector(".scene-container");
      // 更新相机宽高比
      camera.aspect = container.clientWidth / container.clientHeight;
      // 更新相机矩阵
      camera.updateProjectionMatrix();
      // 更新渲染器大小
      render.setSize(container.clientWidth, container.clientHeight);
      // 更新像素比
      render.setPixelRatio(window.devicePixelRatio);
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