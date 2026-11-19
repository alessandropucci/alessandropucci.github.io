// An abstract, folded field drawn in cross sections.
(() => {
  const canvas = document.getElementById("field");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function draw() {
    const {width, height} = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const style = getComputedStyle(canvas);
    const ink = style.getPropertyValue("--wire").trim();
    const paper = style.getPropertyValue("--art").trim();
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.25;
    for (let y = 10; y < height; y += 15) {
      for (let x = 10; x < width; x += 15) ctx.fillRect(x, y, 1, 1);
    }
    ctx.globalAlpha = 1;
    const scale = Math.min(width / 440, height / 300);
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.rotate(-0.31);
    ctx.strokeStyle = ink;
    ctx.fillStyle = paper;
    ctx.lineWidth = 1.1;
    for (let row = 0; row <= 86; row++) {
      const angle = row * Math.PI / 43;
      const cx = 121 * Math.cos(angle);
      const cy = 60 * Math.sin(angle);
      const tilt = angle / 2 + 0.32;
      const rx = 49 * Math.cos(tilt);
      const ry = 49 * Math.sin(tilt);
      ctx.beginPath();
      for (let point = 0; point <= 64; point++) {
        const t = 2 * Math.PI * point / 64;
        const cross = Math.cos(t);
        const depth = Math.sin(t);
        const x = cx + (rx * cross - ry * depth * 0.33) * Math.cos(angle);
        const y = cy + (rx * cross - ry * depth * 0.33) * Math.sin(angle) * 0.50
          + ry * cross + rx * depth * 0.33;
        if (point === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  new ResizeObserver(draw).observe(canvas.parentElement);
  document.addEventListener("portfolio-theme-change", draw);
  draw();
})();
