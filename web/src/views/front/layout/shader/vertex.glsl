// 传递给片元着色器
varying vec4 v_fragCoord;
void main() {
    // gl_Position 可写，顶点着色器裁剪空间输出位置
    v_fragCoord = gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}