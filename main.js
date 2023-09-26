import * as THREE from 'three';
import "./style.css"
import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();


const geometry = new THREE.SphereGeometry(10, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: "#FFC0CB" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


const light = new THREE.PointLight("#FFFFFF", 150, 100);
light.position.set(0, 10, 20);

scene.add(light);



const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height, 0.1, 1000)
 camera.position.setZ(40)
scene.add(camera)






const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.enableRotate = true;
controls.autoRotateSpeed = 5;




window.addEventListener("resize", ()=>{

sizes.width = window.innerWidth;
sizes.height = window.innerHeight;
camera.aspect = sizes.width / sizes.height;
camera.updateProjectionMatrix();
renderer.setSize(sizes.width, sizes.height);

});




const timeLine = gsap.timeline({defaults: {duration:1}});

timeLine.fromTo(mesh.scale, {x:0,y:0,z:0},{x:1,y:1,z:1});

timeLine.fromTo("h1", { opacity: "0", y: "-200%" }, { opacity:"1", y: "0%" });

const loop = ()=>{
  mesh.rotation.y += 1
  controls.update();
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop);
  

}

loop()