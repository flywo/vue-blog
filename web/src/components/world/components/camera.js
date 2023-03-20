// 相机
import {
    PerspectiveCamera
} from "three";

// 创建相机
function createCamera(aspect) {
    const camera = new PerspectiveCamera(
        35, aspect, 0.1, 100
    );
    camera.position.set(0, 0, 10);
    return camera;
}

export {
    createCamera
};