<template>
  <div class="b-e-view"></div>
</template>

<script>
import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
export default {
  name: "BackEndView",
  mounted() {
    // 拿到容器
    const container = document.querySelector(".b-e-view");

    // 创建场景
    const scene = new THREE.Scene();

    // 相机
    const camera = new THREE.Camera();
    // 相机位置
    camera.position.z = 1;
    scene.add(camera);

    // 渲染器
    const render = new THREE.WebGLRenderer();
    // 渲染器大小
    render.setSize(container.clientWidth, container.clientHeight);
    // 渲染器像素比
    render.setPixelRatio(window.devicePixelRatio);
    // 添加到页面
    container.append(render.domElement);

    // 渲染器
    const uniforms = {
      u_resolution: {
        value: [
          container.clientWidth * window.devicePixelRatio,
          container.clientHeight * window.devicePixelRatio,
        ],
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

    // 渲染函数
    function renderMethod() {
      uniforms.u_time.value += 0.005;
      // 渲染
      render.render(scene, camera);
      // 每一帧都调用渲染函数
      requestAnimationFrame(renderMethod);
    }
    // 渲染
    renderMethod();

    // 界面变化
    window.addEventListener("resize", () => {
      uniforms.u_resolution.value = [
        container.clientWidth * window.devicePixelRatio,
        container.clientHeight * window.devicePixelRatio,
      ];
      // 更新相机宽高比
      camera.aspect = container.clientWidth / container.clientHeight;
      // 更新渲染器大小
      render.setSize(container.clientWidth, container.clientHeight);
      // 更新像素比
      render.setPixelRatio(window.devicePixelRatio);
    });
  },
};
</script>

<style lang="scss" scoped>
.b-e-view {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  background-color: #f9f6f6;
}
</style>