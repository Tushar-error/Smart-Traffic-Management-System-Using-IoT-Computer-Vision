import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../context/AuthContext";
import { MagneticButton } from "../components/MagneticButton";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  const handleLogin = async () => {
    if (!username || !password) { setError("Fill in all fields"); return; }
    setLoading(true);
    setError("");

    const ok = await login(username, password);
    if (ok) {
      gsap.to(formRef.current, {
        scale: 0.95, opacity: 0, duration: 0.3,
        onComplete: () => navigate("/dashboard")
      });
    } else {
      setError("Invalid credentials");
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(#00FF94 1px, transparent 1px), linear-gradient(90deg, #00FF94 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Glowing orb */}
      <div className="absolute w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #00FF94, transparent)", top: "10%", left: "20%" }}
      />

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12">
          <div className="font-bebas text-7xl text-white tracking-widest leading-none">
            TRAFFIC
          </div>
          <div className="font-bebas text-7xl text-green tracking-widest leading-none">
            CONTROL
          </div>
          <div className="font-mono text-xs text-muted tracking-widest uppercase mt-3">
            Command Center v1.0
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="rounded-2xl p-8"
          style={{ background: "#111", border: "1px solid #222" }}
        >
          <div className="font-bebas text-2xl tracking-widest text-white mb-8">
            ACCESS TERMINAL
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="admin"
                className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-muted outline-none transition-all duration-300 focus:border-green"
                style={{ caretColor: "#00FF94" }}
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-muted outline-none transition-all duration-300 focus:border-green"
                style={{ caretColor: "#00FF94" }}
              />
            </div>
          </div>

          {error && (
            <div className="font-mono text-xs text-red mb-4 tracking-wider">
              ⚠ {error}
            </div>
          )}

          <MagneticButton
            onClick={handleLogin}
            className="w-full py-4 rounded-xl font-bebas text-xl tracking-widest transition-all duration-300"
            style={{
              background: loading ? "#1a1a1a" : "#00FF94",
              color: loading ? "#555" : "#080808",
            } as any}
          >
            {loading ? "AUTHENTICATING..." : "ENTER SYSTEM"}
          </MagneticButton>

          <div className="font-mono text-xs text-muted text-center mt-4 tracking-widest">
            default: admin / admin123
          </div>
        </div>
      </div>
    </div>
  );
};