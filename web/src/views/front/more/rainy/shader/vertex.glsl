void main() {
    // 获取二维顶点
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}