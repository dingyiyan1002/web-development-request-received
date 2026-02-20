import { useState, useRef, useEffect, useCallback } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface LiquidTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function LiquidTabs({ tabs, activeTab, onChange, className = '' }: LiquidTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const [isMoving, setIsMoving] = useState(false);

  const updateSlider = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
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

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return;

    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 500);

    onChange(tabId);
  };

  return (
    <div
      ref={containerRef}
      className={`nav-tabs relative ${className}`}
      style={{ background: 'rgba(30, 41, 59, 0.3)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className={`nav-slider ${isMoving ? 'moving' : ''}`}
        style={sliderStyle}
      />

      {tabs.map((tab) => (
        <button
          key={tab.id}
          data-tab-id={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
        >
          <span className="flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
