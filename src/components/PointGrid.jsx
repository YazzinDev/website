import React, { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

const PointGrid = ({
  spacing = 32,
  dotColor = 'rgba(93, 63, 211, 0.15)',
  speed = 0.002,
  maxSize = 1.5,
  directionX = 0,
  directionY = 1,
  noiseScale = 0.001,
  className = "absolute inset-0 w-full h-full pointer-events-none z-0"
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const noise2D = createNoise2D();
    let animationFrameId;

    let width, height;
    let dots = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    const initDots = () => {
      dots = [];
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          dots.push({ x, y });
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += speed;

      dots.forEach(dot => {
        // Apply direction and scale to the noise coordinates
        const noiseX = dot.x * noiseScale + time * directionX;
        const noiseY = dot.y * noiseScale + time * directionY;

        const noise = noise2D(noiseX, noiseY);        const size = Math.max(0.5, (noise + 1) * maxSize);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);

        ctx.fillStyle = dotColor;
        ctx.globalAlpha = Math.max(0.2, (noise + 1) * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [spacing, dotColor, speed, maxSize, directionX, directionY, noiseScale]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
};

export default PointGrid;
