import './style.css'
import * as THREE from 'three'
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load();
const matcapTexture = textureLoader.load('https://raw.githubusercontent.com/nidorx/matcaps/master/1024/253C3C_528181_406C6C_385F5F.png')
console.log(matcapTexture);

const fontLoader = new FontLoader();

fontLoader.load(
  'static/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry('ANUBHAV',{
        font: font,
        size : 0.5,
       depth :0.2,
        curveSegments :6,
        bevelEnabled:true,
        bevelOffset :0,
        bevelThickness :0.03,
        bevelSize :0.02,
        bevelSegments : 4,
      })

      textGeometry.center();

      const material = new THREE.MeshMatcapMaterial({
        matcap:matcapTexture
      });

      const text = new THREE.Mesh(textGeometry, material);
      scene.add(text);

      console.time('donuts')

      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2 ,20, 45);
      // const Material = new THREE.MeshMatcapMaterial()

      for ( let i=0; i<150; i++ ){
       const donut = new THREE.Mesh(donutGeometry,material);

       donut.position.x = (Math.random() - 0.5) * 10
       donut.position.y = (Math.random() - 0.5) * 10
       donut.position.z = (Math.random() - 0.5) * 10

      donut.rotation.x = Math.random() * Math.PI
      donut.rotation.y = Math.random() * Math.PI

      const scale = Math.random()
      donut.scale.set(scale,scale,scale);

      // donut.scale.x = scale
      // donut.scale.y = scale
      // donut.scale.z = scale
        



       scene.add(donut)
      }
      console.timeEnd('donuts')
  },
  undefined,
  (error) => {
      console.error('Error loading font:', error);
  }
);

const scene = new THREE.Scene();


const aspect = {
  width : window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75,aspect.width/aspect.height);
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);


const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(aspect.width,aspect.height);

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true;

const cursor = {
  x:0,
  y:0
}

window.addEventListener('mousemove',(event)=>{
  cursor.x = event.clientX / aspect.width -0.5,
  cursor.y = -(event.clientY / aspect.width -0.5)
 
})

window.addEventListener('resize', ()=>
{
  camera.aspect  =  aspect.width/ aspect.height
  camera.updateProjectionMatrix();

  //Update renderer
  renderer.setSize(aspect.width,aspect.height);
})

let clock = new THREE.Clock(); 

function animate(){
  // update controls 
  
controls.update()

  window.requestAnimationFrame(animate)
  renderer.render(scene,camera);
}

animate();