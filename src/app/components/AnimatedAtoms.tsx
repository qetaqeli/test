"use client";

import { useEffect, useRef } from "react";

export default function AnimatedAtoms() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const atoms = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * 0.5 - 0.25,
      glow: Math.random() * 20 + 20,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      atoms.forEach((a) => {
        a.x += a.dx;
        a.y += a.dy;

        if (a.x < 0 || a.x > canvas.width) a.dx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.dy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = a.glow;
        ctx.fillStyle = "#00ffff";
        ctx.fill();
        ctx.closePath();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
