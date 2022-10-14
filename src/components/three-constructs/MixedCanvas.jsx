import {useState, useEffect, createContext, useContext}  from 'react';
import {Canvas} from '@react-three/fiber';
import {
  Canvas as CanvasCSS,
  useFrame as useFrameCSS
} from "react-three-fiber/css3d";

import {
  Canvas as CanvasCSS,
  useFrame as useFrameCSS
} from "react-three-fiber/css3d";

const MixedCanvasContext = createContext(null);
const MixedCanvasProvider = MixedCanvasContext.Provider;
const useMixedCanvasContext = () =>
  useContext(MixedCanvasContext) ||
  (console.error("Html3D can only be used inside a MixedCanvas Component"),
  null);

const MixedCanvas = ({ children, scaleFactor = 160, cssProps = {}, ...props }) => {
  const [canvasState, setFromCanvas] = useState(null);
  useEffect(() => {
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
        <CanvasCSS
          {...cssProps}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            ...(cssProps.style || {})
          }}
        >
          <RenderCSS scaleFactor={scaleFactor} {...canvasState} />
        </CanvasCSS>
      )}
    </>
  );
}

export default MixedCanvas;