/* ==========================================================================
   Quantory — Configuración de fondo animado tecnológico (tsParticles)
   ========================================================================== */

(function initParticles() {
  if (typeof tsParticles === "undefined") return;

  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      number: {
        value: 70,
        density: { enable: true, area: 900 },
      },
      color: { value: ["#3b82f6", "#8b5cf6", "#60a5fa"] },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.2, max: 0.6 },
      },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: true,
        distance: 140,
        color: "#6366f1",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.7,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.5 } },
        push: { quantity: 3 },
      },
    },
    detectRetina: true,
  });
})();
