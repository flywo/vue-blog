// 渲染器
import {
    WebGLRenderer
} from "three";

// 创建渲染器
function createRenderer(width, height) {
    const renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
}

export {
    createRenderer
};