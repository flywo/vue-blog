const setSize = (camera, renderer, container) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};
// 界面变化
class Resizer {
    constructor(camera, renderer, container) {
        setSize(camera, renderer, container);
        window.onresize = () => {
            setSize(camera, renderer, container);
        }
    }

    removeListen() {
        window.onresize = null;
    }
}

export {
    Resizer
};