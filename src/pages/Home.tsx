import { useState } from 'react';
import { useMediaPipeHands } from '../hooks/useMediaPipeHands';
import { HandCanvas } from '../components/HandCanvas';
import type { VisualMode } from '../components/HandCanvas';

export function Home() {
  const [experienceStarted, setExperienceStarted] = useState(false);

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

  const handleBack = () => {
    if (cameraActive) stopCamera();
    if (simulationActive) stopSimulation();
    setExperienceStarted(false);
  };

  // ---------- STATE 1: LANDING ----------
  if (!experienceStarted) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center px-4 sm:px-0"
        style={{ backgroundColor: '#FDF8F0' }}
      >
        <div className="max-w-2xl w-full space-y-6 sm:space-y-8 py-12 sm:py-20">
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#F4A896', color: '#3A3226' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#F4A896' }} />
            <span className="tracking-wide">Interaction Design &amp; Creative Technology</span>
          </div>

          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]"
              style={{ color: '#3A3226' }}
            >
              Hii!! I'm Priya 👋
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-2xl"
              style={{ color: '#6B5F4F' }}
            >
              I'm building playful, gesture-driven interfaces — things you can point at,
              pinch, and shoot webs from. Scroll down and give it a try.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setExperienceStarted(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              style={{ backgroundColor: '#F4A896' }}
            >
              Give It a Try
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- STATE 2: EXPERIENCE ----------
  return (
    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
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
            {isTrackingActive ? (simulationActive ? 'SIMULATION' : 'ACTIVE') : 'STANDBY'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
          MediaPipe Hands Controller
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl leading-relaxed">
          Real-time 21-joint 3D hand tracking, dynamic web-shooter gesture mechanics, and Web
          Audio sonification running entirely in your browser via WebAssembly.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 ${cameraActive ? 'opacity-70' : 'opacity-0 pointer-events-none'
              }`}
          />

          {isTrackingActive && (
            <HandCanvas
              detectionData={detectionData}
              visualMode={visualMode}
              audioEnabled={audioEnabled}
              clearTrigger={clearTrigger}
            />
          )}

          {!cameraActive && (
            <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
          )}

          {!isTrackingActive && !modelLoading && (
            <div className="relative z-30 flex flex-col items-center justify-center p-6 text-center space-y-5 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-primary-400 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

          {modelLoading && (
            <div className="relative z-30 flex flex-col items-center space-y-3">
              <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-primary-300">Loading MediaPipe WASM Model...</span>
            </div>
          )}

          {isTrackingActive && (
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
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
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                  <span className="text-zinc-500">GESTURE:</span>
                  <span className="font-bold px-1.5 py-0.5 rounded text-[10px] text-primary-300">
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

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={startSimulation}
              className="text-xs font-semibold underline hover:text-red-800 shrink-0"
            >
              Try Simulation Mode Instead
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-zinc-200/80 p-5 shadow-2xs space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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

            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg border border-zinc-200/70 text-xs">
              <span className="text-[11px] font-mono text-zinc-500 px-2">Visual Mode:</span>
              <button
                type="button"
                onClick={() => setVisualMode('skeleton')}
                className={`px-3 py-1 rounded-md font-medium transition ${visualMode === 'skeleton' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
              >
                Skeleton + Webs
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('webshooter')}
                className={`px-3 py-1 rounded-md font-medium transition ${visualMode === 'webshooter' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
              >
                Web Shooter Only
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('minimal')}
                className={`px-3 py-1 rounded-md font-medium transition ${visualMode === 'minimal' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
              >
                Minimal
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${audioEnabled
                    ? 'bg-primary-50 text-primary-800 border-primary-200 font-semibold'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                  }`}
              >
                {audioEnabled ? 'Audio Synth On' : 'Mute Synth'}
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
    </div>
  );
}