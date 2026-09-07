import { useEffect, useRef } from 'react';
import type { HandDetectionData } from '../hooks/useMediaPipeHands';
import { synth } from '../lib/audioSynth';

export type VisualMode = 'skeleton' | 'webshooter' | 'minimal';

interface HandCanvasProps {
  detectionData: HandDetectionData;
  visualMode: VisualMode;
  audioEnabled: boolean;
  clearTrigger: number;
}

interface WebShot {
  id: number;
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  spokes: number;
  spread: number;
  rings: number;
}

// MediaPipe standard 21-point hand joint links
const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4], // Thumb
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8], // Index
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12], // Middle
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16], // Ring
  [13, 17],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20], // Pinky
];

export function HandCanvas({
  detectionData,
  visualMode,
  audioEnabled,
  clearTrigger,
}: HandCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webShotsRef = useRef<WebShot[]>([]);
  const lastSpawnTimeRef = useRef<number>(0);
  const nextShotIdRef = useRef<number>(1);

  // Clear all web shots on explicit button click
  useEffect(() => {
    webShotsRef.current = [];
  }, [clearTrigger]);

  // Audio sonification trigger for Pinch (Thumb + Index)
  useEffect(() => {
    const isPinching = detectionData.gesture === 'Pinch' && detectionData.pinchCenter !== null;

    if (audioEnabled && isPinching && detectionData.pinchCenter) {
      synth.play(detectionData.pinchCenter.x, detectionData.pinchCenter.y);
    } else {
      synth.stop();
    }
  }, [detectionData, audioEnabled]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas resolution to bounding box
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    const width = canvas.width;
    const height = canvas.height;

    // Clear frame
    ctx.clearRect(0, 0, width, height);

    // 1. Clear State: If hand returns to fully open palm (all 5 extended), clear all active webs immediately
    if (detectionData.gesture === 'Open Palm') {
      webShotsRef.current = [];
    }

    // 2. Trigger State: Index + Middle closed together fires web shot
    if (detectionData.gesture === 'Web Shooter' && detectionData.webShooter) {
      const now = performance.now();
      // Throttle spawn rate to max ~5 shots per second (every 200ms)
      if (now - lastSpawnTimeRef.current >= 200) {
        lastSpawnTimeRef.current = now;

        // Mirrored coordinate transforms:
        // Video display is scale-x-[-1], so x becomes (1 - x), and dx becomes -dx
        const startX = (1 - detectionData.webShooter.origin.x) * width;
        const startY = detectionData.webShooter.origin.y * height;
        const dirX = -detectionData.webShooter.direction.x;
        const dirY = detectionData.webShooter.direction.y;
        const angle = Math.atan2(dirY, dirX);

        const speed = 7.5; // Travel speed in px/frame

        webShotsRef.current.push({
          id: nextShotIdRef.current++,
          originX: startX,
          originY: startY,
          x: startX + Math.cos(angle) * 15,
          y: startY + Math.sin(angle) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle,
          radius: 14,
          maxRadius: 150 + Math.random() * 30,
          alpha: 0.95,
          spokes: 7,
          spread: (Math.PI / 180) * 80, // 80 degree cone
          rings: 4,
        });
      }
    }

    // 3. Render and Update Flying Web Shots
    for (let i = webShotsRef.current.length - 1; i >= 0; i--) {
      const shot = webShotsRef.current[i];

      // Physical progression
      shot.x += shot.vx;
      shot.y += shot.vy;
      shot.radius += (shot.maxRadius - shot.radius) * 0.05 + 1.2;
      shot.alpha -= 0.012; // Smooth fade-out

      if (shot.alpha <= 0.02 || shot.radius >= shot.maxRadius * 0.98) {
        webShotsRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, shot.alpha);
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = '#f4f4f5'; // Studio white/light-gray
      ctx.shadowColor = '#e4e4e7';
      ctx.shadowBlur = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Apex position (back vertex of the web net)
      const apexOffset = shot.radius * 0.35;
      const apexX = shot.x - Math.cos(shot.angle) * apexOffset;
      const apexY = shot.y - Math.sin(shot.angle) * apexOffset;

      // Calculate radiating spoke endpoints
      const spokeEnds: { x: number; y: number }[] = [];
      const halfSpread = shot.spread / 2;

      for (let s = 0; s < shot.spokes; s++) {
        const t = shot.spokes > 1 ? s / (shot.spokes - 1) : 0.5;
        const spokeAngle = shot.angle - halfSpread + t * shot.spread;
        const endX = shot.x + Math.cos(spokeAngle) * shot.radius;
        const endY = shot.y + Math.sin(spokeAngle) * shot.radius;
        spokeEnds.push({ x: endX, y: endY });

        // Draw radial spoke line from apex outward
        ctx.beginPath();
        ctx.moveTo(apexX, apexY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw cross-connecting spiderweb ring arcs
      for (let r = 1; r <= shot.rings; r++) {
        const ringFrac = Math.pow(r / shot.rings, 0.85);

        ctx.beginPath();
        for (let s = 0; s < shot.spokes - 1; s++) {
          const p1 = spokeEnds[s];
          const p2 = spokeEnds[s + 1];

          const p1RingX = apexX + (p1.x - apexX) * ringFrac;
          const p1RingY = apexY + (p1.y - apexY) * ringFrac;
          const p2RingX = apexX + (p2.x - apexX) * ringFrac;
          const p2RingY = apexY + (p2.y - apexY) * ringFrac;

          // Midpoint with inward sag curve towards the apex
          const midX = (p1RingX + p2RingX) / 2 - Math.cos(shot.angle) * (shot.radius * 0.06);
          const midY = (p1RingY + p2RingY) / 2 - Math.sin(shot.angle) * (shot.radius * 0.06);

          if (s === 0) {
            ctx.moveTo(p1RingX, p1RingY);
          }
          ctx.quadraticCurveTo(midX, midY, p2RingX, p2RingY);
        }
        ctx.stroke();
      }

      // Draw silk trailing thread from origin/fingertips to apex
      ctx.save();
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(228, 228, 231, 0.6)';
      ctx.beginPath();
      ctx.moveTo(shot.originX, shot.originY);
      ctx.lineTo(apexX, apexY);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    }

    // 4. Render Hand Landmarks and Skeletal Bones (if mode is skeleton or minimal)
    if (visualMode !== 'webshooter') {
      detectionData.landmarks.forEach((hand, handIndex) => {
        const points = hand.map((pt) => ({
          x: (1 - pt.x) * width,
          y: pt.y * height,
          z: pt.z,
        }));

        // Draw bones
        if (visualMode === 'skeleton') {
          ctx.save();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#0d9488';
          ctx.shadowColor = '#14b8a6';
          ctx.shadowBlur = 8;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          CONNECTIONS.forEach(([start, end]) => {
            const p1 = points[start];
            const p2 = points[end];
            if (p1 && p2) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
          ctx.restore();
        }

        // Draw joint nodes
        points.forEach((pt, index) => {
          const isTip = [4, 8, 12, 16, 20].includes(index);
          const isPinchFinger = [4, 8].includes(index) && detectionData.gesture === 'Pinch';
          const isWebShooterFinger =
            [8, 12].includes(index) && detectionData.gesture === 'Web Shooter';

          if (visualMode === 'minimal' && !isTip) return;

          ctx.save();
          ctx.beginPath();

          if (isWebShooterFinger) {
            ctx.arc(pt.x, pt.y, 7.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f4f4f5'; // Pure white glow for web shooter fingers
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 14;
          } else if (isPinchFinger) {
            ctx.arc(pt.x, pt.y, 7.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f59e0b'; // Amber highlight for pinch
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 12;
          } else if (isTip) {
            ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
            ctx.fillStyle = '#2dd4bf'; // Neon cyan tip
            ctx.shadowColor = '#5eead4';
            ctx.shadowBlur = 8;
          } else {
            ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#14b8a6';
            ctx.shadowBlur = 4;
          }

          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#0f766e';
          ctx.stroke();
          ctx.restore();
        });

        // Handedness and Gesture Label
        const wrist = points[0];
        if (wrist) {
          ctx.save();
          const handedness = detectionData.handednesses[handIndex] || 'Hand';
          const labelText = `${handedness.toUpperCase()} • ${detectionData.gesture.toUpperCase()}`;

          ctx.font = '600 11px "JetBrains Mono", monospace';
          const textWidth = ctx.measureText(labelText).width;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
          ctx.roundRect(wrist.x - textWidth / 2 - 8, wrist.y + 14, textWidth + 16, 22, 4);
          ctx.fill();

          ctx.fillStyle =
            detectionData.gesture === 'Web Shooter'
              ? '#f4f4f5'
              : detectionData.gesture === 'Pinch'
                ? '#fde047'
                : '#5eead4';
          ctx.textAlign = 'center';
          ctx.fillText(labelText, wrist.x, wrist.y + 29);
          ctx.restore();
        }
      });
    }

    // 5. Aiming Direction Indicator when in Web Shooter gesture
    if (detectionData.gesture === 'Web Shooter' && detectionData.webShooter) {
      const originX = (1 - detectionData.webShooter.origin.x) * width;
      const originY = detectionData.webShooter.origin.y * height;
      const dirX = -detectionData.webShooter.direction.x;
      const dirY = detectionData.webShooter.direction.y;

      ctx.save();
      ctx.strokeStyle = 'rgba(244, 244, 245, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + dirX * 45, originY + dirY * 45);
      ctx.stroke();
      ctx.restore();
    }

    // 6. Pinch Reticle for Audio Synth
    if (detectionData.gesture === 'Pinch' && detectionData.pinchCenter) {
      const px = (1 - detectionData.pinchCenter.x) * width;
      const py = detectionData.pinchCenter.y * height;

      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.75;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.arc(px, py, 18, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px - 6, py);
      ctx.lineTo(px + 6, py);
      ctx.moveTo(px, py - 6);
      ctx.lineTo(px, py + 6);
      ctx.stroke();
      ctx.restore();
    }
  }, [detectionData, visualMode]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />
  );
}
