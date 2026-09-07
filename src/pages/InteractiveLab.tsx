import { useState } from 'react';
import { useMediaPipeHands } from '../hooks/useMediaPipeHands';
import { HandCanvas } from '../components/HandCanvas';
import type { VisualMode } from '../components/HandCanvas';

export function InteractiveLab() {
  const {
    videoRef,
    cameraActive,
    modelLoading,
    simulationActive,
    error,
    fps,
    detectionData,
    startCamera,
    stopCamera,
    startSimulation,
    stopSimulation,
  } = useMediaPipeHands();

  const [visualMode, setVisualMode] = useState<VisualMode>('skeleton');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [clearTrigger, setClearTrigger] = useState<number>(0);

  const isTrackingActive = cameraActive || simulationActive;

  return (
    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/80 pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            R&amp;D // COMPUTER VISION EXPERIMENT
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
              MediaPipe Hands Controller
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 mt-2 max-w-2xl leading-relaxed">
              Real-time 21-joint 3D hand tracking, dynamic web-shooter gesture mechanics, and Web
              Audio sonification running entirely in your browser via WebAssembly.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${isTrackingActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isTrackingActive ? 'bg-emerald-500 animate-ping' : 'bg-zinc-400'
                  }`}
              />
              <span>
                {isTrackingActive ? (simulationActive ? 'SIMULATION' : 'ACTIVE') : 'STANDBY'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="space-y-6">
        {/* Viewport Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl flex items-center justify-center">
          {/* Mirrored Video Stream */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 ${cameraActive ? 'opacity-70' : 'opacity-0 pointer-events-none'
              }`}
          />

          {/* Canvas Rendering Overlay */}
          {isTrackingActive && (
            <HandCanvas
              detectionData={detectionData}
              visualMode={visualMode}
              audioEnabled={audioEnabled}
              clearTrigger={clearTrigger}
            />
          )}

          {/* Grid Background when camera is inactive */}
          {!cameraActive && (
            <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
          )}

          {/* Standby / Initial State Overlay */}
          {!isTrackingActive && !modelLoading && (
            <div className="relative z-30 flex flex-col items-center justify-center p-6 text-center space-y-5 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-primary-400 shadow-inner">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white tracking-tight">Camera Feed Ready</h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Start your webcam to track hands locally on-device. Bring index and middle fingers
                  together to shoot glowing webs!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md active:scale-95"
                >
                  Start Webcam
                </button>
                <button
                  type="button"
                  onClick={startSimulation}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs sm:text-sm border border-zinc-700 transition-all"
                >
                  Run Simulation Mode
                </button>
              </div>
            </div>
          )}

          {/* Model Loading State */}
          {modelLoading && (
            <div className="relative z-30 flex flex-col items-center space-y-3">
              <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-primary-300">
                Loading MediaPipe WASM Model...
              </span>
            </div>
          )}

          {/* Top HUD Telemetry Bar (active when tracking) */}
          {isTrackingActive && (
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 text-[11px] font-mono text-zinc-300 flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="text-zinc-500">FPS:</span>
                    <span className="text-emerald-400 font-bold">{fps}</span>
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-zinc-500">HANDS:</span>
                    <span className="text-white font-bold">{detectionData.landmarks.length}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                  <span className="text-zinc-500">GESTURE:</span>
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${detectionData.gesture === 'Web Shooter'
                        ? 'text-white bg-zinc-800 border border-zinc-600 shadow-xs'
                        : detectionData.gesture === 'Pinch'
                          ? 'text-amber-400 bg-amber-950/60 border border-amber-700/50'
                          : detectionData.gesture === 'Open Palm'
                            ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-700/50'
                            : 'text-primary-300'
                      }`}
                  >
                    {detectionData.gesture.toUpperCase()}
                  </span>
                </div>

                {audioEnabled && (
                  <div className="px-2.5 py-1.5 rounded-md bg-primary-950/80 backdrop-blur-md border border-primary-700/60 text-[11px] font-mono text-primary-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                    <span>SYNTH ON</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-red-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={startSimulation}
              className="text-xs font-semibold underline hover:text-red-800 shrink-0"
            >
              Try Simulation Mode Instead
            </button>
          </div>
        )}

        {/* Interactive Control Panel */}
        <div className="bg-white rounded-xl border border-zinc-200/80 p-5 shadow-2xs space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              {cameraActive ? (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition"
                >
                  Stop Webcam
                </button>
              ) : simulationActive ? (
                <button
                  type="button"
                  onClick={stopSimulation}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-semibold transition"
                >
                  Exit Simulation
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startCamera}
                  disabled={modelLoading}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition disabled:opacity-50"
                >
                  Start Webcam
                </button>
              )}

              {!isTrackingActive && (
                <button
                  type="button"
                  onClick={startSimulation}
                  className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium border border-zinc-200 transition"
                >
                  Test With Simulation
                </button>
              )}
            </div>

            {/* Visual Mode Selector */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg border border-zinc-200/70 text-xs">
              <span className="text-[11px] font-mono text-zinc-500 px-2">Visual Mode:</span>
              <button
                type="button"
                onClick={() => setVisualMode('skeleton')}
                className={`px-3 py-1 rounded-md font-medium transition ${visualMode === 'skeleton'
                    ? 'bg-white text-zinc-950 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                  }`}
              >
                Skeleton + Webs
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('webshooter')}
                className={`px-3 py-1 rounded-md font-medium transition ${visualMode === 'webshooter'
                    ? 'bg-white text-zinc-950 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                  }`}
              >
                Web Shooter Only
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('minimal')}
                className={`px-3 py-1 rounded-md font-medium transition ${visualMode === 'minimal'
                    ? 'bg-white text-zinc-950 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                  }`}
              >
                Minimal
              </button>
            </div>

            {/* Audio & Clear Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${audioEnabled
                    ? 'bg-primary-50 text-primary-800 border-primary-200 font-semibold'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                  }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      audioEnabled
                        ? 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                        : 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2'
                    }
                  />
                </svg>
                <span>{audioEnabled ? 'Audio Synth On' : 'Mute Synth'}</span>
              </button>

              <button
                type="button"
                onClick={() => setClearTrigger((prev) => prev + 1)}
                className="px-3 py-1.5 rounded-lg bg-white text-zinc-600 hover:text-zinc-950 text-xs font-medium border border-zinc-200 hover:bg-zinc-50 transition"
              >
                Clear Webs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gesture Guide & Reference */}
      <div className="space-y-4 pt-4 border-t border-zinc-200/80">
        <h3 className="text-lg font-bold text-zinc-950 tracking-tight">
          Interactive Gesture Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Web Shooter Card */}
          <div className="p-5 rounded-xl bg-white border border-zinc-200/80 space-y-2 shadow-2xs ring-1 ring-zinc-900/5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-white border border-zinc-800">
                WEB SHOOTER
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">Index + Middle</span>
            </div>
            <h4 className="font-semibold text-zinc-900 text-sm">Shoot Expanding Webs</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Close your index and middle fingertips together while pointing in any direction. Fires
              glowing, expanding spider web nets traveling outward along your hand&rsquo;s vector.
            </p>
          </div>

          {/* Open Palm Card */}
          <div className="p-5 rounded-xl bg-white border border-zinc-200/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                OPEN PALM
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">All 5 Extended</span>
            </div>
            <h4 className="font-semibold text-zinc-900 text-sm">Spatial Hover &amp; Clear Webs</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Spread all 5 fingers open wide. Instantly clears all active web nets from the canvas
              and resets back to clean idle overlay.
            </p>
          </div>

          {/* Pinch Card */}
          <div className="p-5 rounded-xl bg-white border border-zinc-200/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60">
                PINCH
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">Thumb + Index</span>
            </div>
            <h4 className="font-semibold text-zinc-900 text-sm">Audio Synth Sonification</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Touch your thumb and index fingertips together. Controls the Web Audio synthesizer,
              modulating frequency on X axis and filter cutoff on Y axis.
            </p>
          </div>

          {/* Pointing Card */}
          <div className="p-5 rounded-xl bg-white border border-zinc-200/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-primary-50 text-primary-800 border border-primary-200/60">
                POINTING / VICTORY
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">Selective Fingers</span>
            </div>
            <h4 className="font-semibold text-zinc-900 text-sm">Aiming &amp; Pose Selection</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Extend your index finger to aim the vector, or index and middle spread apart for a
              victory peace pose.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Architecture Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1">
          <span className="text-[11px] font-mono text-zinc-400 uppercase block">Model Engine</span>
          <span className="text-xs font-semibold text-zinc-900 block">MediaPipe Tasks Vision</span>
        </div>
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1">
          <span className="text-[11px] font-mono text-zinc-400 uppercase block">Landmarks</span>
          <span className="text-xs font-semibold text-zinc-900 block">21 3D Joint Nodes</span>
        </div>
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1">
          <span className="text-[11px] font-mono text-zinc-400 uppercase block">Acceleration</span>
          <span className="text-xs font-semibold text-zinc-900 block">GPU Delegate + WASM</span>
        </div>
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1">
          <span className="text-[11px] font-mono text-zinc-400 uppercase block">Privacy</span>
          <span className="text-xs font-semibold text-emerald-700 block">100% Client-Side</span>
        </div>
      </div>
    </div>
  );
}
