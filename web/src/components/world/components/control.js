// 控制器
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";

function createControl(camera, renderer) {
    // 控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 阻尼
    controls.enableDamping = true;
    return controls;
}

export {
    createControl
};