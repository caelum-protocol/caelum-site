import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function CaelumParticles() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="caelum-particles"
      init={particlesInit}
      options={{
        background: { color: { value: "#000000" } },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: ["#7c3aed", "#38bdf8", "#a78bfa", "#6d28d9"] },
          shape: { type: "circle" },
          opacity: { value: 0.15, random: true },
          size: { value: 3, random: true },
          move: { enable: true, speed: 0.5, direction: "none", outModes: "out" },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}