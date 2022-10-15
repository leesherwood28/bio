import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo } from 'react';
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  NoBlending,
  Object3D,
  Vector3,
} from 'three';
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer';

const CSS3DSceneRenderer: React.FunctionComponent = () => {
  const { scene, camera } = useThree();

  const css3dRenderer = useMemo(() => {
    const renderer = new CSS3DRenderer();
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  }, []);

  useFrame(() => {
    camera.updateMatrixWorld();
    css3dRenderer.render(scene, camera);
  });

  const resize = useCallback(() => {
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    document
      .querySelector('#game-container')
      ?.prepend(css3dRenderer.domElement);
    // const element = makeElementObject('button', 75, 20);
    // scene.add(element);
  }, []);
  return null;
};

function makeElementObject(type: string, width: number, height: number) {
  const obj = new Object3D();
  obj.position.set(0, 1, 0);

  const element = document.createElement(type);
  element.style.width = width + 'px';
  element.style.height = height + 'px';
  element.style.boxSizing = 'border-box';
  element.style.fontSize = '100px';
  element.textContent = 'Hello Test';
  var css3dObject = new CSS3DObject(element);
  // @ts-ignore
  obj.css3dObject = css3dObject;
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  var material = new MeshBasicMaterial({
    opacity: 0.2,
    color: new Color(0x111111),
    transparent: true,
    // side	: THREE.DoubleSide,
  });
  var geometry = new BoxGeometry(width, height, 1);
  var mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  obj.add(mesh);

  return obj;
}

export default CSS3DSceneRenderer;
