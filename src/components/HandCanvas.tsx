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
  rings: number;
  settled: boolean;
}

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

const MAX_PERSISTED_SHOTS = 180;
const SPOKE_COUNT = 8;

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

  useEffect(() => {
    webShotsRef.current = [];
  }, [clearTrigger]);

  useEffect(() => {
    const isPinching = detectionData.gesture === 'Pinch' && detectionData.pinchCenter !== null;

    if (audioEnabled && isPinching && detectionData.pinchCenter) {
      synth.play(detectionData.pinchCenter.x, detectionData.pinchCenter.y);
    } else {
      synth.stop();
    }
  }, [detectionData, audioEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (detectionData.gesture === 'Closed Fist') {
      webShotsRef.current = [];
    }

    if (detectionData.gesture === 'Web Shooter' && detectionData.webShooter) {
      const now = performance.now();
      if (now - lastSpawnTimeRef.current >= 220) {
        lastSpawnTimeRef.current = now;

        const startX = (1 - detectionData.webShooter.origin.x) * width;
        const startY = detectionData.webShooter.origin.y * height;
        const dirX = -detectionData.webShooter.direction.x;
        const dirY = detectionData.webShooter.direction.y;
        const angle = Math.atan2(dirY, dirX);

        const speed = 7.5;

        if (webShotsRef.current.length >= MAX_PERSISTED_SHOTS) {
          webShotsRef.current.shift();
        }

        webShotsRef.current.push({
          id: nextShotIdRef.current++,
          originX: startX,
          originY: startY,
          x: startX + Math.cos(angle) * 15,
          y: startY + Math.sin(angle) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle,
          radius: 10,
          maxRadius: 55 + Math.random() * 20,
          alpha: 0.95,
          rings: 4,
          settled: false,
        });
      }
    }

    for (let i = webShotsRef.current.length - 1; i >= 0; i--) {
      const shot = webShotsRef.current[i];

      if (!shot.settled) {
        shot.x += shot.vx * 0.5;
        shot.y += shot.vy * 0.5;
        shot.radius += (shot.maxRadius - shot.radius) * 0.08 + 0.8;

        if (shot.radius >= shot.maxRadius * 0.98) {
          shot.settled = true;
          shot.alpha = 0.85;
        }
      }

      ctx.save();
      ctx.globalAlpha = shot.alpha;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#f4f4f5';
      ctx.shadowColor = '#e4e4e7';
      ctx.shadowBlur = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const centerX = shot.x;
      const centerY = shot.y;

      const spokeEnds: { x: number; y: number }[] = [];
      for (let s = 0; s < SPOKE_COUNT; s++) {
        const spokeAngle = (Math.PI * 2 * s) / SPOKE_COUNT;
        const endX = centerX + Math.cos(spokeAngle) * shot.radius;
        const endY = centerY + Math.sin(spokeAngle) * shot.radius;
        spokeEnds.push({ x: endX, y: endY });

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      for (let r = 1; r <= shot.rings; r++) {
        const ringFrac = r / shot.rings;

        ctx.beginPath();
        for (let s = 0; s <= SPOKE_COUNT; s++) {
          const idx = s % SPOKE_COUNT;
          const next = (s + 1) % SPOKE_COUNT;
          const p1 = spokeEnds[idx];
          const p2 = spokeEnds[next];

          const p1RingX = centerX + (p1.x - centerX) * ringFrac;
          const p1RingY = centerY + (p1.y - centerY) * ringFrac;
          const p2RingX = centerX + (p2.x - centerX) * ringFrac;
          const p2RingY = centerY + (p2.y - centerY) * ringFrac;

          const midAngle =
            (Math.atan2(p1RingY - centerY, p1RingX - centerX) +
              Math.atan2(p2RingY - centerY, p2RingX - centerX)) /
            2;
          const sagAmount = (shot.radius / shot.rings) * 0.28;
          const midX = centerX + Math.cos(midAngle) * (ringFrac * shot.radius - sagAmount);
          const midY = centerY + Math.sin(midAngle) * (ringFrac * shot.radius - sagAmount);

          if (s === 0) {
            ctx.moveTo(p1RingX, p1RingY);
          }
          ctx.quadraticCurveTo(midX, midY, p2RingX, p2RingY);
        }
        ctx.stroke();
      }

      ctx.save();
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(228, 228, 231, 0.6)';
      ctx.beginPath();
      ctx.moveTo(shot.originX, shot.originY);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    }

    if (visualMode !== 'webshooter') {
      detectionData.landmarks.forEach((hand, handIndex) => {
        const points = hand.map((pt) => ({
          x: (1 - pt.x) * width,
          y: pt.y * height,
          z: pt.z,
        }));

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
            ctx.fillStyle = '#f4f4f5';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 14;
          } else if (isPinchFinger) {
            ctx.arc(pt.x, pt.y, 7.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f59e0b';
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 12;
          } else if (isTip) {
            ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
            ctx.fillStyle = '#2dd4bf';
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
                : detectionData.gesture === 'Closed Fist'
                  ? '#fca5a5'
                  : '#5eead4';
          ctx.textAlign = 'center';
          ctx.fillText(labelText, wrist.x, wrist.y + 29);
          ctx.restore();
        }
      });
    }

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