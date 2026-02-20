import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface LiquidNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function LiquidNav({ tabs, activeTab, onChange, className = '' }: LiquidNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({
    width: '60px',
    left: '4px'
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const updateSlider = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(`[data-nav-id="${activeTab}"]`) as HTMLElement;
    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setSliderStyle({
      left: `${buttonRect.left - containerRect.left}px`,
      width: `${buttonRect.width}px`,
    });
  }, [activeTab]);

  useEffect(() => {
    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [updateSlider]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className={`nav-liquid-container relative flex gap-1 p-1 rounded-xl ${className}`}
    >
      <div
        className={`nav-liquid-slider absolute top-1 bottom-1 rounded-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isAnimating ? 'scale-95' : ''
        }`}
        style={sliderStyle}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/20" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/5 to-transparent" />
      </div>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          data-nav-id={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? 'text-cyan-300'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
