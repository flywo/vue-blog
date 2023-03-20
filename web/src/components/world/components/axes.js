// 辅助线
import {
    AxesHelper
} from "three";

function createAxes() {
    const axes = new AxesHelper(5);
    return axes;
}

export {
    createAxes
}