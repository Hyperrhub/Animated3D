import { Center, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";


const defaultSpeed = 0.01;

const Spin = ({ children, speed, visibility, ...props }) => {
  const groupRef = useRef(null);

  useFrame(() => {
    groupRef.current.rotation.y += speed.current;
    groupRef.current.rotation.x += speed.current;
  });

  return (
    <group ref={groupRef} visible={visibility} {...props}>
      {children}
    </group>
  );
};

const Slider = ({ speed }) => {
  const max = 1;
  const min = 0;

  const [value, setValue] = useState(defaultSpeed);

  useEffect(() => {
    speed.current = Number(value);
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Animation Speed</label>
      <input
        type="range"
        min={min}
        max={max}
        step="0.001"
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          const validValue = Math.min(Math.max(newValue, min), max);
          setValue(validValue);
        }}
      />
    </div>
  );
};

const Toggle = ({ toggle }) => {
  return (
    <div>
      <label>Visibility</label>
      <input
        type="checkbox"
        defaultChecked={true}
        onChange={(e) => {
          toggle(e.target.checked);
        }}
      />
    </div>
  );
};

const useUI = () => {
  const speedRef = useRef(defaultSpeed);
  const [visibility, setVisibility] = useState(true);
  const sliderProps = { speed: speedRef };
  const toggleProps = { toggle: setVisibility };
  return [sliderProps, toggleProps, speedRef, visibility];
};

const Container = ({ children }) => {
  return <div style={{ margin: "15px" }}>{children}</div>;
};

function App() {
  const [sliderProps, toggleProps, speedRef, visibility] = useUI();
  const [sliderProps2, toggleProps2, speedRef2, visibility2] = useUI();
  const [sliderProps3, toggleProps3, speedRef3, visibility3] = useUI();

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Container>
          <h2>Box Props</h2>
          <Slider {...sliderProps} />
          <Toggle {...toggleProps} />
        </Container>
        <Container>
          <h2>Torus Props</h2>
          <Slider {...sliderProps2} />
          <Toggle {...toggleProps2} />
        </Container>
        <Container>
          <h2>Dodecahedron Props</h2>
          <Slider {...sliderProps3} />
          <Toggle {...toggleProps3} />
        </Container>
      </div>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Suspense>
          <Canvas camera={{ position: [0, 3, 5] }} shadows>
            <color attach="background" args={["black"]} />

            <Spin speed={speedRef} visibility={visibility}>
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={"hotpink"} />
              </mesh>
            </Spin>

            <Spin
              speed={speedRef2}
              position={[2, 0, 0]}
              visibility={visibility2}
            >
              <mesh>
                <torusGeometry args={[0.5, 0.1, 16, 100]} />
                <meshBasicMaterial color={"hotpink"} />
              </mesh>
            </Spin>

            <Spin
              speed={speedRef3}
              position={[-2, 0, 0]}
              visibility={visibility3}
            >
              <mesh>
                <dodecahedronGeometry args={[0.5, 0]} />
                <meshBasicMaterial color={"hotpink"} />
              </mesh>
            </Spin>

            <OrbitControls />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}

export default App;
