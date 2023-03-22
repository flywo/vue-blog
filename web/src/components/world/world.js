import {
    createCamera
} from "./components/camera";
import {
    createScene
} from "./components/scene";
import {
    createRenderer
} from "./systems/renderer";
import {
    Resizer
} from "./systems/resizer";
import {
    createControl
} from "./components/control";
import {
    createAxes
} from "./components/axes";

// 这样可以实现私有变量
// let camera;
// let renderer;
// let scene;

// 3D世界类
class World {
    // 构造函数
    constructor(container, contentMethod) {
        // 场景
        this.scene = createScene();
        // 相机
        this.camera = createCamera(container.clientWidth / container.clientHeight);
        this.scene.add(this.camera);
        // 内容创建
        contentMethod(this.scene);
        // 渲染器
        this.renderer = createRenderer(container.clientWidth, container.clientHeight);
        container.append(this.renderer.domElement);
        // 控制器
        this.control = createControl(this.camera, this.renderer);
        // 辅助线
        this.axes = createAxes();
        this.scene.add(this.axes);
        // 界面变化
        this.resizer = new Resizer(this.camera, this.renderer, container);
    }

    // 每一帧调用
    frameCall() {
        if (this.renderMethod) {
            this.renderMethod();
        }
        this.control.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.frameCall.bind(this));
    }

    // 渲染函数
    render(renderMethod) {
        this.renderMethod = renderMethod;
        this.frameCall();
    }

    // 销毁
    destroy() {
        this.resizer.removeListen();
    }
}

export {
    World
};