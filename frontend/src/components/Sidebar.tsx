import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MagneticButton } from "./MagneticButton";
import { gsap } from "gsap";
import { useRef } from "react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "◈" },
  { path: "/analytics", label: "Analytics", icon: "◉" },
  { path: "/control", label: "Control", icon: "◎" },
];

export const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    gsap.to(sidebarRef.current, {
      x: -100, opacity: 0, duration: 0.3,
      onComplete: () => { logout(); navigate("/login"); }
    });
  };

  return (
    <div
      ref={sidebarRef}
      className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 z-50"
      style={{ background: "#0a0a0a", borderRight: "1px solid #1a1a1a" }}
    >
      <div className="font-bebas text-green text-2xl mb-12 tracking-widest">
        TC
      </div>

      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 font-mono text-lg
              ${isActive
                ? "bg-green text-bg"
                : "text-muted hover:text-green hover:bg-surface"
              }`
            }
            title={item.label}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-3">
        <div className="font-mono text-xs text-muted uppercase tracking-wider"
          style={{ writingMode: "vertical-rl" }}>
          {user?.username}
        </div>
        <MagneticButton
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted hover:border-red hover:text-red transition-all duration-300 font-mono"
        >
          ⏻
        </MagneticButton>
      </div>
    </div>
  );
};