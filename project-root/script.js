const layers = document.querySelectorAll(".layer");

let targetX = 50;
let targetY = 50;
let currentX = 50;
let currentY = 50;

let active = false;
let timeout;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

window.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth) * 100;
  targetY = (e.clientY / window.innerHeight) * 100;
  active = true;

  clearTimeout(timeout);
  timeout = setTimeout(() => active = false, 120);
});

function animate() {
  if (active) {
    currentX = lerp(currentX, targetX, 0.04);
    currentY = lerp(currentY, targetY, 0.04);

    layers.forEach((layer, i) => {
      const depth = (i + 1) * 0.18;

      layer.style.setProperty("--gx", `${currentX}%`);
      layer.style.setProperty("--gy", `${currentY}%`);

      layer.style.transform = `
        translate(${Math.round((currentX - 50) * depth)}px,
                  ${Math.round((currentY - 50) * depth)}px)
      `;
    });
  }

  requestAnimationFrame(animate);
}

animate();
