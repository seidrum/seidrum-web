import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

export default function GraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const NODE_COUNT = 60;
    const CONNECT_DIST = 180;
    const MOUSE_DIST = 250;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      hue: Math.random() > 0.5 ? 270 + Math.random() * 30 : 185 + Math.random() * 20,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Bounce off edges with padding
        if (node.x < -20) node.vx = Math.abs(node.vx);
        if (node.x > w + 20) node.vx = -Math.abs(node.vx);
        if (node.y < -20) node.vy = Math.abs(node.vy);
        if (node.y > h + 20) node.vy = -Math.abs(node.vy);

        // Mouse repulsion — gentle push
        const dx = node.x - mouse.current.x;
        const dy = node.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = (1 - dist / MOUSE_DIST) * 0.015;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Damping
        node.vx *= 0.999;
        node.vy *= 0.999;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;

            // Edges near mouse glow brighter
            const mx = (a.x + b.x) / 2 - mouse.current.x;
            const my = (a.y + b.y) / 2 - mouse.current.y;
            const mDist = Math.sqrt(mx * mx + my * my);
            const mouseBoost = mDist < MOUSE_DIST ? (1 - mDist / MOUSE_DIST) * 0.3 : 0;

            const hue = (a.hue + b.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha + mouseBoost})`;
            ctx.lineWidth = 0.5 + mouseBoost * 2;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseR = node.radius + Math.sin(node.pulse) * 0.5;

        // Glow near mouse
        const dx = node.x - mouse.current.x;
        const dy = node.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < MOUSE_DIST;
        const mouseAlpha = nearMouse ? (1 - dist / MOUSE_DIST) : 0;

        if (nearMouse) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR + 6 * mouseAlpha, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${node.hue}, 80%, 70%, ${mouseAlpha * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
        const baseAlpha = 0.4 + Math.sin(node.pulse) * 0.2 + mouseAlpha * 0.4;
        ctx.fillStyle = `hsla(${node.hue}, 80%, 75%, ${baseAlpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
