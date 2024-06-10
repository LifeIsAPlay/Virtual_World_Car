import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Stats } from "@react-three/drei";
import { useState, useEffect } from 'react';

function Model(props) {
  const { scene } = useGLTF("/Lamb.glb");
  return <primitive object={scene} {...props} />;
}

function App() {
  const [statsType, setStatsType] = useState(0);
  const [description, setDescription] = useState("");

  const descriptions = [
    "FPS: Frames per second - higher is better.",
    "MS: Milliseconds per frame - lower is better.",
    "MB: Memory usage - lower is better."
  ];

  useEffect(() => {
    setDescription(descriptions[statsType]);
  }, [statsType]);

  const handleToggleStats = () => {
    setStatsType((statsType + 1) % 3);
  };

  return (
    <>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ position: "absolute", width: '100%', height: '100%' }}>
        <color attach="background" args={["#101010"]} />
        <PresentationControls speed={1.5} global polar={[-Math.PI / 2, Math.PI / 2]}>
          <Stage environment="sunset">
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
        <Stats showPanel={statsType} onClick={handleToggleStats} />
      </Canvas>
      <div style={{ position: 'absolute', top: 'calc(50% - 5cm)', left: '10px', zIndex: 1 }}>
        <button onClick={handleToggleStats} style={{ marginBottom: '5px' }}>
          Toggle Stats
        </button>
        <div style={{ color: 'white' }}>
          {description}
        </div>
      </div>
    </>
  );
}

export default App;
