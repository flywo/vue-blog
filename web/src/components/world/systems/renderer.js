// 渲染器
import {
    WebGLRenderer
} from "three";

// 创建渲染器
function createRenderer(width, height) {
    const renderer = new WebGLRenderer({
        // 抗锯齿开启
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.physicallyCorrectLights = true;
    renderer.useLegacyLights = false;
    return renderer;
}

export {
    createRenderer
};