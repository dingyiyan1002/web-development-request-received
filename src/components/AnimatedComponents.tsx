import { useState, useEffect, useRef } from 'react';

export interface AnimatedValueProps {
  value: string;
  previousValue?: string;
  isChanged?: boolean;
  type?: 'number' | 'binary' | 'hex' | 'address';
  isDarkMode?: boolean;
}

export function AnimatedValue({ 
  value, 
  previousValue, 
  isChanged = false,
  type = 'number',
  isDarkMode = true 
}: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value && isChanged) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      prevRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value, isChanged]);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const getAnimationClass = () => {
    if (!isAnimating) return '';
    return 'animate-pulse bg-green-500/20 rounded px-1';
  };

  const formatValue = () => {
    if (type === 'binary') {
      const num = parseInt(value);
      if (!isNaN(num)) {
        return num.toString(2).padStart(8, '0').replace(/(\d{4})/g, '$1 ').trim();
      }
    }
    if (type === 'hex') {
      const num = parseInt(value);
      if (!isNaN(num)) {
        return '0x' + num.toString(16).toUpperCase().padStart(8, '0');
      }
    }
    return value;
  };

  return (
    <span className={`font-mono transition-all duration-300 ${getAnimationClass()} ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
      {formatValue()}
    </span>
  );
}

export function AnimatedPointer({ 
  from, 
  to, 
  isDarkMode = true 
}: { 
  from: { x: number; y: number }; 
  to: { x: number; y: number };
  isDarkMode?: boolean;
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % 10);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  return (
    <svg 
      className="absolute pointer-events-none"
      style={{
        left: from.x,
        top: from.y,
        width: length + 20,
        height: 20,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%'
      }}
    >
      <defs>
        <marker 
          id="arrowhead" 
          markerWidth="10" 
          markerHeight="7" 
          refX="9" 
          refY="3.5" 
          orient="auto"
        >
          <polygon 
            points="0 0, 10 3.5, 0 7" 
            fill={isDarkMode ? '#22c55e' : '#16a34a'} 
          />
        </marker>
      </defs>
      <line 
        x1="0" 
        y1="10" 
        x2={length - 5} 
        y2="10" 
        stroke={isDarkMode ? '#22c55e' : '#16a34a'} 
        strokeWidth="2"
        strokeDasharray={`${offset}, 5`}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}

export function CodeHighlight({ 
  code, 
  currentLine, 
  isDarkMode = true 
}: { 
  code: string; 
  currentLine: number;
  isDarkMode?: boolean;
}) {
  const lines = code.split('\n');

  return (
    <div className={`font-mono text-sm ${isDarkMode ? 'bg-[#0d1117]' : 'bg-slate-50'} rounded-lg overflow-hidden`}>
      {lines.map((line, idx) => {
        const isActive = idx + 1 === currentLine;
        const isPast = idx + 1 < currentLine;
        
        return (
          <div 
            key={idx}
            className={`flex transition-all duration-300 ${
              isActive 
                ? isDarkMode 
                  ? 'bg-green-500/20 border-l-4 border-green-500' 
                  : 'bg-green-100 border-l-4 border-green-500'
                : isPast
                  ? isDarkMode ? 'bg-slate-800/30' : 'bg-slate-100'
                  : ''
            }`}
          >
            <span className={`w-10 text-right pr-3 select-none ${
              isActive 
                ? 'text-green-400 font-bold' 
                : isDarkMode ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {idx + 1}
            </span>
            <pre className={`flex-1 px-4 py-1 whitespace-pre ${
              isActive 
                ? isDarkMode ? 'text-white' : 'text-slate-900'
                : isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {highlightSyntax(line, isDarkMode)}
            </pre>
          </div>
        );
      })}
    </div>
  );
}

function highlightSyntax(code: string, isDarkMode: boolean): React.ReactNode {
  const keywords = ['int', 'char', 'void', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'struct', 'typedef', 'const', 'static', 'extern', 'volatile', 'unsigned', 'signed', 'long', 'short', 'float', 'double', 'sizeof', 'enum', 'union', 'goto', 'default', 'register', 'auto', 'uint8_t', 'uint16_t', 'uint32_t', 'int8_t', 'int16_t', 'int32_t'];
  
  const parts: React.ReactNode[] = [];
  let remaining = code;
  let key = 0;

  const patterns = [
    { regex: /"[^"]*"/g, className: isDarkMode ? 'text-[#a5d6ff]' : 'text-blue-600' },
    { regex: /'[^']*'/g, className: isDarkMode ? 'text-[#a5d6ff]' : 'text-blue-600' },
    { regex: /\/\/.*$/g, className: isDarkMode ? 'text-[#8b949e] italic' : 'text-slate-500 italic' },
    { regex: /\/\*[\s\S]*?\*\//g, className: isDarkMode ? 'text-[#8b949e] italic' : 'text-slate-500 italic' },
    { regex: /\b\d+\b/g, className: isDarkMode ? 'text-[#ffa657]' : 'text-orange-600' },
    { regex: /0x[0-9a-fA-F]+/g, className: isDarkMode ? 'text-[#ffa657]' : 'text-orange-600' },
    { regex: /\b(true|false|NULL|nullptr)\b/g, className: isDarkMode ? 'text-[#ffa657]' : 'text-orange-600' },
  ];

  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  const functionPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g;

  let processed = remaining;

  patterns.forEach(({ regex, className }) => {
    processed = processed.replace(regex, (match) => {
      return `{{${className}|${match}}}`;
    });
  });

  processed = processed.replace(keywordPattern, (match) => {
    return `{{${isDarkMode ? 'text-[#ff7b72]' : 'text-red-600'}|${match}}}`;
  });

  processed = processed.replace(functionPattern, (_, name) => {
    return `{{${isDarkMode ? 'text-[#d2a8ff]' : 'text-purple-600'}|${name}}}`;
  });

  const tokens = processed.split(/(\{\{[^}]+\}\})/);

  return tokens.map((token) => {
    if (token.startsWith('{{') && token.endsWith('}}')) {
      const match = token.match(/^\{\{([^|]+)\|(.+)\}\}$/);
      if (match) {
        const [, className, content] = match;
        return (
          <span key={key++} className={className}>
            {content}
          </span>
        );
      }
    }
    return token;
  });
}

export function NumberCounter({ 
  target, 
  duration = 500 
}: { 
  target: number; 
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(target * eased));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [target, duration]);

  return <span>{current}</span>;
}

export function TypewriterText({ 
  text, 
  speed = 50,
  isDarkMode = true 
}: { 
  text: string; 
  speed?: number;
  isDarkMode?: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
      {displayed}
      {index < text.length && <span className="animate-pulse">▌</span>}
    </span>
  );
}

export function FlashEffect({ 
  children, 
  trigger,
  isDarkMode = true 
}: { 
  children: React.ReactNode; 
  trigger: boolean;
  isDarkMode?: boolean;
}) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (trigger) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className={`transition-all duration-300 ${flash ? 'scale-105' : 'scale-100'}`}>
      {children}
    </div>
  );
}
