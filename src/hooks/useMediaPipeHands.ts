import { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export type GestureType =
  | 'Idle'
  | 'Pinch'
  | 'Open Palm'
  | 'Pointing'
  | 'Victory'
  | 'Web Shooter'
  | 'Closed Fist';

export interface LandmarkPoint {
  x: number;
  y: number;
  z: number;
}

export interface WebShooterData {
  active: boolean;
  origin: { x: number; y: number };
  direction: { x: number; y: number };
  indexMiddleDist: number;
}

export interface HandDetectionData {
  landmarks: LandmarkPoint[][];
  handednesses: string[];
  gesture: GestureType;
  pinchDistance: number;
  pinchCenter: { x: number; y: number } | null;
  webShooter: WebShooterData | null;
}

export function useMediaPipeHands() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const fpsFrameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(0);

  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [modelReady, setModelReady] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(0);

  const [detectionData, setDetectionData] = useState<HandDetectionData>({
    landmarks: [],
    handednesses: [],
    gesture: 'Idle',
    pinchDistance: 1,
    pinchCenter: null,
    webShooter: null,
  });

  const initModel = useCallback(async () => {
    if (landmarkerRef.current) return landmarkerRef.current;

    setModelLoading(true);
    setError(null);

    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      let landmarker: HandLandmarker;
      try {
        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: '/models/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 2,
        });
      } catch {
        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 2,
        });
      }

      landmarkerRef.current = landmarker;
      setModelReady(true);
      setModelLoading(false);
      return landmarker;
    } catch (err: unknown) {
      console.error('Failed to load MediaPipe HandLandmarker:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to initialize MediaPipe computer vision model.'
      );
      setModelLoading(false);
      return null;
    }
  }, []);

  const classifyGesture = (
    landmarks: LandmarkPoint[]
  ): {
    gesture: GestureType;
    pinchDist: number;
    pinchCenter: { x: number; y: number } | null;
    webShooter: WebShooterData | null;
  } => {
    if (!landmarks || landmarks.length < 21) {
      return { gesture: 'Idle', pinchDist: 1, pinchCenter: null, webShooter: null };
    }

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const indexMcp = landmarks[5];
    const middleMcp = landmarks[9];
    const ringMcp = landmarks[13];
    const pinkyMcp = landmarks[17];

    const pinchDx = thumbTip.x - indexTip.x;
    const pinchDy = thumbTip.y - indexTip.y;
    const pinchDist = Math.hypot(pinchDx, pinchDy);

    const pinchCenter = {
      x: (thumbTip.x + indexTip.x) / 2,
      y: (thumbTip.y + indexTip.y) / 2,
    };

    const indexMiddleDist = Math.hypot(indexTip.x - middleTip.x, indexTip.y - middleTip.y);

    const rawDirX = indexTip.x - indexMcp.x;
    const rawDirY = indexTip.y - indexMcp.y;
    const dirLen = Math.hypot(rawDirX, rawDirY) || 1;
    const dir = {
      x: rawDirX / dirLen,
      y: rawDirY / dirLen,
    };

    const webOrigin = {
      x: (indexTip.x + middleTip.x) / 2,
      y: (indexTip.y + middleTip.y) / 2,
    };

    const distFromWrist = (pt: LandmarkPoint) => Math.hypot(pt.x - wrist.x, pt.y - wrist.y);
    const isIndexExtended = distFromWrist(indexTip) > distFromWrist(indexMcp) * 1.25;
    const isMiddleExtended = distFromWrist(middleTip) > distFromWrist(middleMcp) * 1.25;
    const isRingExtended = distFromWrist(ringTip) > distFromWrist(ringMcp) * 1.2;
    const isPinkyExtended = distFromWrist(pinkyTip) > distFromWrist(pinkyMcp) * 1.2;

    // Closed Fist: all four fingers curled in (none extended), and not pinching
    const isFist =
      !isIndexExtended &&
      !isMiddleExtended &&
      !isRingExtended &&
      !isPinkyExtended &&
      pinchDist > 0.08;
    if (isFist) {
      return { gesture: 'Closed Fist', pinchDist, pinchCenter: null, webShooter: null };
    }

    const isIndexMiddleClosed = indexMiddleDist < 0.058 && isIndexExtended && isMiddleExtended;
    if (isIndexMiddleClosed) {
      return {
        gesture: 'Web Shooter',
        pinchDist,
        pinchCenter: null,
        webShooter: {
          active: true,
          origin: webOrigin,
          direction: dir,
          indexMiddleDist,
        },
      };
    }

    if (
      isIndexExtended &&
      isMiddleExtended &&
      isRingExtended &&
      isPinkyExtended &&
      indexMiddleDist >= 0.065
    ) {
      return { gesture: 'Open Palm', pinchDist, pinchCenter: null, webShooter: null };
    }

    if (pinchDist < 0.08) {
      return { gesture: 'Pinch', pinchDist, pinchCenter, webShooter: null };
    }

    if (
      isIndexExtended &&
      isMiddleExtended &&
      !isRingExtended &&
      !isPinkyExtended &&
      indexMiddleDist >= 0.065
    ) {
      return { gesture: 'Victory', pinchDist, pinchCenter: null, webShooter: null };
    }

    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { gesture: 'Pointing', pinchDist, pinchCenter: null, webShooter: null };
    }

    return { gesture: 'Idle', pinchDist, pinchCenter: null, webShooter: null };
  };

  const startCamera = async () => {
    setError(null);
    setSimulationActive(false);

    try {
      const landmarker = await initModel();
      if (!landmarker) {
        throw new Error('Vision model could not be initialized.');
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam media devices API not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      setCameraActive(false);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError(
            'Camera permission denied. Please allow camera access in your browser address bar.'
          );
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError('No camera device found on this system. You can test with Simulation Mode.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to start camera.');
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    setCameraActive(false);
    setDetectionData({
      landmarks: [],
      handednesses: [],
      gesture: 'Idle',
      pinchDistance: 1,
      pinchCenter: null,
      webShooter: null,
    });
  };

  const startSimulation = () => {
    stopCamera();
    setSimulationActive(true);
    setError(null);
  };

  const stopSimulation = () => {
    setSimulationActive(false);
    setDetectionData({
      landmarks: [],
      handednesses: [],
      gesture: 'Idle',
      pinchDistance: 1,
      pinchCenter: null,
      webShooter: null,
    });
  };

  useEffect(() => {
    if (!cameraActive) return;

    const detectLoop = () => {
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;

      if (video && landmarker && video.readyState >= 2) {
        if (video.currentTime !== lastVideoTimeRef.current) {
          lastVideoTimeRef.current = video.currentTime;

          try {
            const results = landmarker.detectForVideo(video, performance.now());

            const landmarksList: LandmarkPoint[][] = (results.landmarks || []).map((hand) =>
              hand.map((pt) => ({ x: pt.x, y: pt.y, z: pt.z ?? 0 }))
            );

            const handednesses: string[] = (results.handedness || []).map(
              (h) => h[0]?.displayName || 'Hand'
            );

            let detectedGesture: GestureType = 'Idle';
            let minPinchDist = 1;
            let pinchCenter: { x: number; y: number } | null = null;
            let webShooterData: WebShooterData | null = null;

            if (landmarksList.length > 0) {
              const primaryAnalysis = classifyGesture(landmarksList[0]);
              detectedGesture = primaryAnalysis.gesture;
              minPinchDist = primaryAnalysis.pinchDist;
              pinchCenter = primaryAnalysis.pinchCenter;
              webShooterData = primaryAnalysis.webShooter;
            }

            setDetectionData({
              landmarks: landmarksList,
              handednesses,
              gesture: detectedGesture,
              pinchDistance: minPinchDist,
              pinchCenter,
              webShooter: webShooterData,
            });
          } catch (e) {
            console.warn('MediaPipe detect frame warning:', e);
          }

          fpsFrameCountRef.current++;
          const now = performance.now();
          if (lastFpsTimeRef.current === 0) {
            lastFpsTimeRef.current = now;
          } else if (now - lastFpsTimeRef.current >= 1000) {
            setFps(Math.round((fpsFrameCountRef.current * 1000) / (now - lastFpsTimeRef.current)));
            fpsFrameCountRef.current = 0;
            lastFpsTimeRef.current = now;
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(detectLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(detectLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [cameraActive]);

  useEffect(() => {
    if (!simulationActive) return;

    let simTime = 0;
    const simLoop = () => {
      simTime += 0.02;

      const cx = 0.5 + Math.sin(simTime * 0.7) * 0.2;
      const cy = 0.55 + Math.cos(simTime * 0.9) * 0.12;

      // Cycle: 0-3.5s Web Shooter, 3.5-6.5s Closed Fist, 6.5-9s Pinch
      const cycleTime = simTime % 9;
      const isWebShooter = cycleTime < 3.5;
      const isFist = cycleTime >= 3.5 && cycleTime < 6.5;
      const isPinching = cycleTime >= 6.5;

      const aimAngle = -Math.PI / 2 + Math.sin(simTime * 1.5) * 0.35;
      const aimDirX = Math.cos(aimAngle);
      const aimDirY = Math.sin(aimAngle);

      const indexMiddleOffset = isWebShooter ? 0.015 : 0.07;

      const thumbTipX = isFist ? cx - 0.02 : cx - 0.08 + (isPinching ? 0.04 : 0);
      const thumbTipY = isFist ? cy + 0.1 : cy + 0.02 - (isPinching ? 0.05 : 0);

      const indexMcpX = cx - 0.03;
      const indexMcpY = cy + 0.04;
      const indexTipX = isWebShooter
        ? indexMcpX + aimDirX * 0.22
        : isFist
          ? indexMcpX + 0.01
          : cx - indexMiddleOffset;
      const indexTipY = isWebShooter
        ? indexMcpY + aimDirY * 0.22
        : isFist
          ? indexMcpY + 0.05
          : isPinching
            ? cy - 0.03
            : cy - 0.14;

      const middleMcpX = cx + 0.01;
      const middleMcpY = cy + 0.04;
      const middleTipX = isWebShooter
        ? indexTipX + 0.02
        : isFist
          ? middleMcpX + 0.01
          : cx + indexMiddleOffset;
      const middleTipY = isWebShooter
        ? indexTipY + 0.01
        : isFist
          ? middleMcpY + 0.05
          : cy - 0.17;

      const ringTipY = isFist ? cy + 0.02 : cy - 0.14;
      const pinkyTipY = isFist ? cy + 0.0 : cy - 0.1;

      const fakeHand: LandmarkPoint[] = [
        { x: cx, y: cy + 0.18, z: 0 },
        { x: cx - 0.06, y: cy + 0.13, z: 0 },
        { x: cx - 0.09, y: cy + 0.08, z: 0 },
        { x: cx - 0.1, y: cy + 0.04, z: 0 },
        { x: thumbTipX, y: thumbTipY, z: 0 },
        { x: indexMcpX, y: indexMcpY, z: 0 },
        { x: (indexMcpX + indexTipX) / 2, y: (indexMcpY + indexTipY) / 2, z: 0 },
        { x: (indexMcpX + indexTipX * 2) / 3, y: (indexMcpY + indexTipY * 2) / 3, z: 0 },
        { x: indexTipX, y: indexTipY, z: 0 },
        { x: middleMcpX, y: middleMcpY, z: 0 },
        { x: (middleMcpX + middleTipX) / 2, y: (middleMcpY + middleTipY) / 2, z: 0 },
        { x: (middleMcpX + middleTipX * 2) / 3, y: (middleMcpY + middleTipY * 2) / 3, z: 0 },
        { x: middleTipX, y: middleTipY, z: 0 },
        { x: cx + 0.05, y: cy + 0.05, z: 0 },
        { x: cx + 0.05, y: cy - 0.02, z: 0 },
        { x: cx + 0.05, y: cy - 0.08, z: 0 },
        { x: cx + 0.05, y: ringTipY, z: 0 },
        { x: cx + 0.08, y: cy + 0.07, z: 0 },
        { x: cx + 0.09, y: cy + 0.01, z: 0 },
        { x: cx + 0.09, y: cy - 0.04, z: 0 },
        { x: cx + 0.09, y: pinkyTipY, z: 0 },
      ];

      const currentGesture: GestureType = isWebShooter
        ? 'Web Shooter'
        : isFist
          ? 'Closed Fist'
          : isPinching
            ? 'Pinch'
            : 'Idle';

      const webShooterObj: WebShooterData | null = isWebShooter
        ? {
          active: true,
          origin: { x: (indexTipX + middleTipX) / 2, y: (indexTipY + middleTipY) / 2 },
          direction: { x: aimDirX, y: aimDirY },
          indexMiddleDist: Math.hypot(indexTipX - middleTipX, indexTipY - middleTipY),
        }
        : null;

      const pinchCenter = {
        x: (thumbTipX + indexTipX) / 2,
        y: (thumbTipY + indexTipY) / 2,
      };

      setDetectionData({
        landmarks: [fakeHand],
        handednesses: ['Right'],
        gesture: currentGesture,
        pinchDistance: Math.hypot(thumbTipX - indexTipX, thumbTipY - indexTipY),
        pinchCenter: isPinching ? pinchCenter : null,
        webShooter: webShooterObj,
      });

      setFps(60);
      animFrameIdRef.current = requestAnimationFrame(simLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(simLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [simulationActive]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    cameraActive,
    modelLoading,
    modelReady,
    simulationActive,
    error,
    fps,
    detectionData,
    startCamera,
    stopCamera,
    startSimulation,
    stopSimulation,
  };
}