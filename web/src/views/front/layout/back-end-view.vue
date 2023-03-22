<template>
  <div class="b-e-view"></div>
</template>

<script>
import * as THREE from "three";
export default {
  name: "BackEndView",
  mounted() {
    // 拿到容器
    const container = document.querySelector(".b-e-view");

    // 创建场景
    const scene = new THREE.Scene();

    // 相机
    const camera = new THREE.Camera();
    // 相机位置
    camera.position.z = 1;
    scene.add(camera);

    // 渲染器
    const render = new THREE.WebGLRenderer();
    // 渲染器大小
    render.setSize(container.clientWidth, container.clientHeight);
    // 渲染器像素比
    render.setPixelRatio(window.devicePixelRatio);
    // 添加到页面
    container.append(render.domElement);

    // 渲染器
    const uniforms = {
      u_time: { type: "f", value: Math.random() * 100.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2(1, 1) },
      u_mouse: { type: "v2", value: new THREE.Vector2(1, 1, 1) },
      u_position: { type: "v2", value: new THREE.Vector2(1, 1, 1) },
    };
    const plang = new THREE.PlaneGeometry(2, 2);
    const planm = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
    varying vec4 v_fragCoord;
    void main() {
        v_fragCoord = gl_Position = vec4( position, 1.0 );
    }
      `,
      fragmentShader: `
    varying vec4 v_fragCoord;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_position;
    const int octaves = 2;
    const float seed2 = 73156.8473192;
    const float seed = 43758.5453123;

precision mediump float;

uniform vec4 color;


// Star Nest by Pablo Roman Andrioli


#define iterations 12
#define formuparam 0.53

#define volsteps 12
#define stepsize 0.1

#define zoom   0.800
#define tile   0.850
#define speed  0.010 

#define brightness 0.0015
#define darkmatter 0.300
#define distfading 0.730
#define saturation 0.850

//user define
vec2 iResolution = vec2(1,1);
vec2 iMouse = vec2(1,1);
//vec2 iterations = vec2(1,1);

float iTime = 1.0;
//vec2 fragCoord = vec2(.1,.1);
/*void mainImage( out vec4 fragColor, in vec2 fragCoord )*/
void main()
{
	//get coords and direction
	vec2 uv=v_fragCoord.xy/u_resolution.xy-.5;
	uv.y*=u_resolution.y/u_resolution.x;
	vec3 dir=vec3(uv*zoom,1.);
	float time=u_time*speed+.25;

	//mouse rotation
	float a1=.5+u_mouse.x/u_resolution.x*2.;
	float a2=.8+u_mouse.y/u_resolution.y*2.;
	mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
	mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
	dir.xz*=rot1;
	dir.xy*=rot2;
	vec3 from=vec3(1.,.5,0.5);
	from+=vec3(time*2.,time,-2.);
	from.xz*=rot1;
	from.xy*=rot2;
	
	//volumetric rendering
	float s=0.1,fade=1.;
	vec3 v=vec3(0.); 
	for (int r=0; r<volsteps; r++) {
		vec3 p=from+s*dir*.5;
		p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) { 
			p=abs(p)/dot(p,p)-formuparam; // the magic formula
			a+=abs(length(p)-pa); // absolute sum of average change
			pa=length(p);
		}
		float dm=max(0.,darkmatter-a*a*.001); //dark matter
		a*=a*a; // add contrast
		if (r>6) fade*=1.-dm; // dark matter, don't render near
		//v+=vec3(dm,dm*.5,0.);
		v+=fade;
		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
		fade*=distfading; // distance fading
		s+=stepsize;
	}
	v=mix(vec3(length(v)),v,saturation); //color adjust
	gl_FragColor = vec4(v*.01,1.);	
	
}
      `,
    });
    const plan = new THREE.Mesh(plang, planm);
    scene.add(plan);

    // 渲染函数
    function renderMethod() {
      uniforms.u_time.value += 0.005;
      // 渲染
      render.render(scene, camera);
      // 每一帧都调用渲染函数
      requestAnimationFrame(renderMethod);
    }
    // 渲染
    renderMethod();

    // 界面变化
    window.addEventListener("resize", () => {
      // 拿到容器
      const container = document.querySelector(".b-e-view");
      // 更新相机宽高比
      camera.aspect = container.clientWidth / container.clientHeight;
      // 更新渲染器大小
      render.setSize(container.clientWidth, container.clientHeight);
      // 更新像素比
      render.setPixelRatio(window.devicePixelRatio);
    });
  },
};
</script>

<style lang="scss" scoped>
.b-e-view {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  background-color: #f9f6f6;
}
</style>