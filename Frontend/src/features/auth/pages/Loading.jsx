import { useEffect, useState } from "react";

const STEPS = [
  { pct: 15,  text: "Loading modules",      msg: "loading core modules..."     },
  { pct: 30,  text: "Verifying auth",        msg: "verifying credentials..."    },
  { pct: 50,  text: "Mounting filesystem",   msg: "mounting filesystems..."     },
  { pct: 68,  text: "Checking updates",      msg: "checking for updates..."     },
  { pct: 85,  text: "Starting services",     msg: "starting services..."        },
  { pct: 100, text: "Ready",                 msg: "all systems operational"     },
];

const LOGS = [
  { ts: "00:00:01", type: "ok",   text: "kernel modules loaded"      },
  { ts: "00:00:02", type: "info", text: "authenticating session..."   },
  { ts: "00:00:03", type: "ok",   text: "SSH keys verified"           },
  { ts: "00:00:04", type: "warn", text: "2 pending updates found"     },
  { ts: "00:00:05", type: "info", text: "mounting filesystems..."     },
  { ts: "00:00:06", type: "ok",   text: "environment ready"          },
];

const typeColor = { ok: "#3fb950", info: "#58a6ff", warn: "#e3b341" };
const typeLabel = { ok: "[OK]",   info: "[INFO]",   warn: "[WARN]"  };

export default function LoadingScreen() {
  const [step, setStep]       = useState(0);
  const [visLogs, setVisLogs] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) return;
    const delay = 700 + Math.random() * 400;
    const t = setTimeout(() => {
      setStep(s => s + 1);
      setVisLogs(l => Math.min(l + 1, LOGS.length));
    }, delay);
    return () => clearTimeout(t);
  }, [step]);

  const current = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <main>
      {/* grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,255,136,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* scan line */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: 2,
        background: "rgba(0,255,136,.15)",
        animation: "scan 3s linear infinite"
      }} />

      <div className="form-container" style={{ alignItems: "center" }}>

        {/* spinning rings */}
        <div style={{ position: "relative", width: 80, height: 80, marginBottom: 24 }}>
          {[
            { inset: 0,  border: "2px solid transparent", borderTopColor: "#00ff88", borderRightColor: "#00ff88", animation: "spin 1.2s linear infinite" },
            { inset: 8,  border: "2px solid transparent", borderBottomColor: "#58a6ff", borderLeftColor: "#58a6ff", animation: "spin 0.9s linear infinite reverse" },
            { inset: 16, border: "2px solid transparent", borderTopColor: "#d2a8ff", borderRightColor: "#d2a8ff", animation: "spin 1.5s linear infinite" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", borderRadius: "50%", ...s }} />
          ))}
          <div style={{
            position: "absolute", inset: 24, background: "#00ff88",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{ width: 12, height: 12, background: "#0d1117", borderRadius: "50%" }} />
          </div>
        </div>

        {/* brand */}
        <h1 style={{ fontSize: 18, fontWeight: 500, color: "#e6edf3", letterSpacing: "0.1em", marginBottom: 4 }}>
          <span style={{ color: "#00ff88" }}>dev</span>hub<span style={{ color: "#00ff88" }}>.</span>io
        </h1>
        <p style={{ fontSize: 11, color: "#484f58", letterSpacing: "0.05em", marginBottom: 32 }}>
          initializing secure environment...
        </p>

        {/* progress bar */}
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#8b949e" }}>{current.text}</span>
            <span style={{ fontSize: 11, color: "#00ff88", fontWeight: 500 }}>{current.pct}%</span>
          </div>
          <div style={{ height: 4, background: "#21262d", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: "#00ff88", borderRadius: 2,
              width: `${current.pct}%`, transition: "width 0.4s ease"
            }} />
          </div>
        </div>

        {/* log box */}
        <div style={{
          width: "100%", background: "#161b22", border: "1px solid #21262d",
          borderRadius: 6, padding: 12, marginTop: 16, minHeight: 100
        }}>
          {LOGS.slice(0, visLogs).map((log, i) => (
            <div key={i} style={{
              fontSize: 11, color: "#6e7681", lineHeight: 1.8,
              display: "flex", gap: 8,
              animation: "fadeUp 0.3s ease forwards"
            }}>
              <span style={{ color: "#30363d", minWidth: 60 }}>{log.ts}</span>
              <span style={{ color: typeColor[log.type] }}>{typeLabel[log.type]}</span>
              <span>{log.text}{i === visLogs - 1 && <Cursor />}</span>
            </div>
          ))}
        </div>

        {/* status */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: "#3fb950",
            animation: "pulse 2s ease infinite"
          }} />
          <span style={{ fontSize: 11, color: "#3fb950" }}>{current.msg}</span>
        </div>
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes scan    { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:.3; } }
        @keyframes blink   { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </main>
  );
}

function Cursor() {
  return (
    <span style={{
      display: "inline-block", width: 7, height: 13,
      background: "#00ff88", animation: "blink 1s steps(1) infinite",
      verticalAlign: "middle", marginLeft: 3
    }} />
  );
}