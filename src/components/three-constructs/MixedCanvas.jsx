// TODO, rework from https://codesandbox.io/s/two-r3f-renderers-share-scene-and-camera-qq1zl?file=/src/App.js

import * as React from "react";
import ReactDOM from "react-dom";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";


import {   CSS3DObject as Css3DObject,
  CSS3DSprite as Css3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';

import * as THREE from "three";



extend({ Css3DObject, Css3DSprite });

const ROOT_CLASS = "__R3F_HTML_ROOT__";
const setGLPointer = (gl, value) =>
  (gl.domElement.parentNode.style.pointerEvents = value);

const MixedCanvasContext = React.createContext(null);
const MixedCanvasProvider = MixedCanvasContext.Provider;
const useMixedCanvasContext = () =>
  React.useContext(MixedCanvasContext) ||
  (console.error("Html3D can only be used inside a MixedCanvas Component"),
  null);

const resizeMap = new WeakMap();


export const Html3D = React.forwardRef(
  (
    {
      children,
      sprite = false,
      autoClip = true,
      ClipComponent = ClipMesh,
      cssProps = {},
      clipProps = {},
      ...props
    },
    ref
  ) => {
    const ctx = useMixedCanvasContext();
    const root = React.useMemo(
      () =>
        Object.assign(document.createElement("div"), {
          className: ROOT_CLASS
        }),
      []
    );
    React.useEffect(() => {
      ReactDOM.render(children, root);
      const resizeObserver = new ResizeObserver((entries) => {
        for (let i = 0; i !== entries.length; i++) {
          const target = entries[i].target;
          let offsets = resizeMap.get(target);
          if (!offsets) {
            offsets = {};
            resizeMap.set(target, offsets);
          }
          offsets.width = target.offsetWidth;
          offsets.height = target.offsetHeight;
        }
      });
      
      resizeObserver.observe(root);
      return () => resizeObserver.unobserve(root);
    }, [children, root]);
    return (
      ctx && (
        <group ref={ref} {...props}>
          {React.createElement(`css3D${sprite ? "Sprite" : "Object"}`, {
            args: [root],
            scale: new Array(3).fill(1 / ctx.scaleFactor),
            ...cssProps
          })}
          {autoClip && (
            <ClipComponent
              dom={root}
              rootType={sprite ? "sprite" : "mesh"}
              materialType={sprite ? "sprite" : "meshPhong"}
              {...clipProps}
            />
          )}
        </group>
      )
    );
  }
);

const ClipMesh = React.forwardRef(
  ({ dom, rootType = "mesh", materialType = "meshPhong", ...props }, fRef) => {
    const ctx = useMixedCanvasContext();
    const iRef = React.useRef();
    const ref = fRef || iRef;
    const { gl } = useThree();
    useFrame(() => {
      const size = resizeMap.get(dom);
      if (size && ref.current) {
        ref.current.scale.x = size.width / ctx.scaleFactor;
        ref.current.scale.y = size.height / ctx.scaleFactor;
      }
    });
    return (
      ctx &&
      React.createElement(
        rootType,
        {
          ref,
          ...props,
          onPointerMove: (...args) => {
            // the timeout is needed to exec this AFTER document.onmousemove
            setTimeout(() => setGLPointer(gl, "none"), 0);
            if (props.onPointerMove) props.onPointerMove(...args);
          }
        },
        <planeBufferGeometry args={[1, 1]} />,
        React.createElement(materialType + "Material", {
          opacity: 0.1,
          color: "black",
          side: THREE.DoubleSide,
          blending: THREE.NoBlending
        })
      )
    );
  }
);

export function MixedCanvas({ children, scaleFactor = 160, cssProps = {}, ...props }) {
  const [canvasState, setFromCanvas] = React.useState(null);
  React.useEffect(() => {
    if (canvasState) {
      function swapPointer({ target }) {
        if (!target.closest(`.${ROOT_CLASS}`))
          setGLPointer(canvasState.gl, "auto");
      }
      document.addEventListener("mousemove", swapPointer);
      return () => document.removeEventListener("mousemove", swapPointer);
    }
  }, [canvasState]);
  return (
    <>
      <Canvas
        {...props}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          ...(props.style || {})
        }}
        onCreated={(state, ...args) => {
          state.gl.domElement.addEventListener("pointerdown", () => {
            document.getSelection().removeAllRanges();
            document.activeElement.blur();
          });
          setFromCanvas(state);
          if (props.onCreated) props.onCreated(state, ...args);
        }}
      >
        <MixedCanvasProvider value={{ scaleFactor }}>
          {canvasState && children}
        </MixedCanvasProvider>
      </Canvas>
      {canvasState && (
        <Canvas
          {...cssProps}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            ...(cssProps.style || {})
          }}
        >
          <RenderCSS scaleFactor={scaleFactor} {...canvasState} />
        </Canvas>
      )}
    </>
  );
}

function RenderCSS({ scene, camera, scaleFactor }) {
  useFrame(({ gl: css3d }) => css3d.render(scene, camera), 1);
  return null;
}
