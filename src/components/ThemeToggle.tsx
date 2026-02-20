import { useState } from 'react';

interface ThemeToggleProps {
  isDark: boolean;
  onChange: (v: boolean) => void;
}

export function ThemeToggle({ isDark, onChange }: ThemeToggleProps) {
  const [transitioning, setTransitioning] = useState(false);

  const toggle = () => {
    setTransitioning(true);
    onChange(!isDark);
    setTimeout(() => setTransitioning(false), 500);
  };

  return (
    <button
      onClick={toggle}
      className={`toggle-liquid ${isDark ? 'on' : 'off'}`}
      style={{ background: isDark ? 'rgba(34, 211, 238, 0.3)' : 'rgba(148, 163, 184, 0.3)' }}
    >
      <div className={`toggle-thumb ${transitioning ? 'transitioning' : ''}`} />
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px]">
        {isDark ? '' : '☀️'}
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px]">
        {isDark ? '🌙' : ''}
      </span>
    </button>
  );
}
