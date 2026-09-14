import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/**
 * The hero visual: the request path of a system, drawn as a live node graph.
 *
 * Why canvas and not SVG/DOM: this draws roughly forty moving bodies with
 * distance-weighted edges between them, recomputed every frame. As DOM nodes
 * that is forty style recalculations a frame; on a canvas it is one paint.
 *
 * Four things keep it from being the reason the page is slow:
 *   - one requestAnimationFrame loop for the whole component, cancelled on unmount;
 *   - an IntersectionObserver that stops the loop entirely once the hero is
 *     scrolled past, so the rest of the page never competes with it;
 *   - particle count derived from canvas area, so a phone draws a third of what
 *     a desktop does rather than the same load on a weaker GPU;
 *   - under prefers-reduced-motion it renders exactly one frame and stops. The
 *     visual is still there, it simply holds still.
 *
 * The pointer pushes particles away within a radius and shifts the whole scene
 * slightly against the cursor for parallax. Pointer position is read from a ref
 * written by a passive listener — this component never re-renders after mount.
 */
export function NetworkCanvas({ tiers, className = "" }) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const ACCENT = [34, 211, 238];
    const pointer = { x: -9999, y: -9999, active: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let nodes = [];
    let frame = 0;
    let running = false;
    let t = 0;

    /** Tier nodes sit on a gentle S-curve so the chain reads as a path, not a list. */
    const layout = () => {
      const padX = width * 0.16;
      const usable = width - padX * 2;
      nodes = tiers.map((label, i) => {
        const p = tiers.length === 1 ? 0.5 : i / (tiers.length - 1);
        return {
          label,
          bx: padX + usable * p,
          by: height * (0.22 + 0.56 * p) + Math.sin(p * Math.PI * 1.2) * height * -0.12,
          x: 0,
          y: 0,
          phase: i * 0.8,
        };
      });

      const density = Math.round((width * height) / 26000);
      const count = Math.max(14, Math.min(46, density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.5,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (reduced) draw(0);
    };

    const rgba = (a) => `rgba(${ACCENT[0]}, ${ACCENT[1]}, ${ACCENT[2]}, ${a})`;

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // Parallax: the scene leans away from the pointer, at a fraction of its
      // travel, which reads as depth rather than as the graph chasing the mouse.
      const px = pointer.active ? (pointer.x - width / 2) * -0.022 : 0;
      const py = pointer.active ? (pointer.y - height / 2) * -0.022 : 0;

      nodes.forEach((n) => {
        n.x = n.bx + px + Math.sin(time * 0.0004 + n.phase) * 6;
        n.y = n.by + py + Math.cos(time * 0.00055 + n.phase) * 7;
      });

      // --- ambient particles -------------------------------------------------
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0.001) {
            const push = (1 - dist / 120) * 0.9;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x + px, p.y + py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(0.34);
        ctx.fill();
      });

      // --- particle-to-particle links ---------------------------------------
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 118) continue;
          ctx.beginPath();
          ctx.moveTo(a.x + px, a.y + py);
          ctx.lineTo(b.x + px, b.y + py);
          ctx.strokeStyle = rgba((1 - d / 118) * 0.14);
          ctx.stroke();
        }
      }

      // --- the request path --------------------------------------------------
      for (let i = 0; i < nodes.length - 1; i += 1) {
        const a = nodes[i];
        const b = nodes[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(0.26);
        ctx.lineWidth = 1;
        ctx.stroke();

        // A packet travelling the segment, offset per segment so the chain
        // reads as a flow rather than as five things blinking together.
        const travel = ((time * 0.00018 + i * 0.2) % 1 + 1) % 1;
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * travel, a.y + (b.y - a.y) * travel, 2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(0.9);
        ctx.fill();
      }

      // --- tier nodes --------------------------------------------------------
      ctx.font =
        "500 10px 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace";
      ctx.textBaseline = "middle";

      nodes.forEach((n, i) => {
        const near =
          pointer.active && Math.hypot(pointer.x - n.x, pointer.y - n.y) < 90;
        const pulse = 1 + Math.sin(time * 0.0016 + i) * 0.1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, (near ? 17 : 12) * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(near ? 0.75 : 0.32);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = rgba(near ? 1 : 0.72);
        ctx.fill();

        ctx.fillStyle = near ? rgba(0.95) : "rgba(161, 161, 170, 0.62)";
        ctx.fillText(n.label, n.x + 24, n.y);
      });

      // --- scan sweep --------------------------------------------------------
      const sweepY = ((time * 0.04) % (height + 260)) - 130;
      const grad = ctx.createLinearGradient(0, sweepY - 90, 0, sweepY + 90);
      grad.addColorStop(0, rgba(0));
      grad.addColorStop(0.5, rgba(0.05));
      grad.addColorStop(1, rgba(0));
      ctx.fillStyle = grad;
      ctx.fillRect(0, sweepY - 90, width, 180);
    }

    const loop = (time) => {
      t = time;
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= -80 &&
        pointer.y >= -80 &&
        pointer.x <= rect.width + 80 &&
        pointer.y <= rect.height + 80;
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visibility.observe(canvas);

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    const onHidden = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onHidden);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, [tiers, reduced]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="size-full" />
      {/* The graph is decorative, but what it depicts is content. */}
      <p className="sr-only">
        A diagram of a request path: {tiers.join(", then ")}.
      </p>
    </div>
  );
}
