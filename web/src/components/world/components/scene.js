// 场景
import {
    Color,
    Scene
} from "three";

// 创建场景
function createScene() {
    const scene = new Scene();
    scene.background = new Color("black");
    return scene
}

export {
    createScene
};