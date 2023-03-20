// 界面变化
class Resizer {
    constructor(camera, renderer, container) {
        this.camera = camera;
        this.renderer = renderer;
        this.container = container;
    }

    // 刷新
    resize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }
}

export {
    Resizer
};