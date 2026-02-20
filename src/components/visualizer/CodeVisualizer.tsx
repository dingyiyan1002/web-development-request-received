// CodeVisualizer.tsx - 代码可视化主组件
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { SyntaxHighlight } from './syntax-highlight';
import { getVisualizationData } from './step-data/index';
import { PLAYBACK_SPEEDS, SEMANTIC_COLORS, BG_COLORS } from './constants';
import './visualizer.css';

interface CodeVisualizerProps {
  questionId: string;
  onClose: () => void;
}

const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ questionId, onClose }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<keyof typeof PLAYBACK_SPEEDS>('normal');
  const [isFullscreen, setIsFullscreen] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 获取数据
  const data = getVisualizationData(questionId) || getVisualizationData('uint8-overflow')!;
  const maxStep = data.steps.length - 1;
  const currentStep = data.steps[step];

  // 清理定时器
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 下一步
  const nextStep = useCallback(() => {
    setStep(prev => {
      if (prev >= maxStep) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [maxStep]);

  // 上一步
  const prevStep = useCallback(() => {
    setStep(prev => Math.max(0, prev - 1));
  }, []);

  // 重置
  const reset = useCallback(() => {
    setStep(0);
    setIsPlaying(false);
  }, []);

  // 播放/暂停
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // 自动播放
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= maxStep) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, PLAYBACK_SPEEDS[speed]);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isPlaying, speed, maxStep, clearTimer]);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 阻止事件冒泡，避免触发父组件的快捷键（如浏览器后退）
      e.stopPropagation();
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        reset();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFullscreen(prev => !prev);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    
    // 使用 capture 阶段拦截，确保优先处理
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [nextStep, prevStep, togglePlay, reset, onClose]);

  // 二进制显示组件
  const BinaryDisplay: React.FC<{ value: number; bits: number; label?: string; warning?: boolean }> = ({
    value,
    bits,
    label,
    warning,
  }) => {
    const binary = value.toString(2).padStart(bits, '0');
    return (
      <div className={`viz-card ${warning ? 'border-red-500' : 'border-yellow-500'}`}>
        <div className="viz-card-header">
          <span className={warning ? 'text-red-400' : 'text-yellow-400'}>⚡ 二进制</span>
          {label && <span className="text-xs text-slate-400 ml-2">{label}</span>}
        </div>
        <div className="viz-card-body">
          <div className="flex gap-1 justify-center">
            {binary.split('').map((bit, i) => (
              <div
                key={i}
                className={`binary-bit ${bit === '1' ? 'bit-1' : 'bit-0'}`}
              >
                {bit}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-lg font-mono">
            <span className={warning ? 'text-red-400' : 'text-green-400'}>{value}</span>
          </div>
        </div>
      </div>
    );
  };

  // 栈帧显示
  const StackFrame: React.FC<{ frame: typeof currentStep.frames[0] }> = ({ frame }) => {
    return (
      <div className="viz-card border-blue-500">
        <div className="viz-card-header">
          <span className="text-blue-400">📦 {frame.name}()</span>
        </div>
        <div className="viz-card-body space-y-2">
          {frame.vars.map((v, i) => (
            <div
              key={i}
              className={`var-display ${v.state === 'changed' ? 'var-changed' : ''} ${
                v.state === 'reading' ? 'var-reading' : ''
              }`}
            >
              <span className="text-slate-400">{v.type}</span>
              <span className="text-white mx-1">{v.name}</span>
              <span className="text-slate-500">=</span>
              <span
                className={`ml-1 font-mono ${
                  v.state === 'changed'
                    ? 'text-green-400 var-bounce'
                    : v.state === 'reading'
                    ? 'text-blue-400'
                    : 'text-slate-300'
                }`}
              >
                {v.value}
              </span>
              {v.showBinary && (
                <span className="ml-2 text-xs text-slate-500 font-mono">
                  ({Number(v.value).toString(2).padStart(8, '0')})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染可视化块
  const renderVizBlock = (block: typeof currentStep.vizBlocks[0], index: number) => {
    switch (block.type) {
      case 'rule':
        return (
          <div key={index} className="viz-card border-yellow-500">
            <div className="viz-card-header">
              <span className="text-yellow-400">📋 {block.data.title}</span>
            </div>
            <div className="viz-card-body text-slate-300">{block.data.content}</div>
          </div>
        );
      case 'binary-display':
        return (
          <BinaryDisplay
            key={index}
            value={block.data.value as number}
            bits={block.data.bits as number}
            label={block.data.label as string}
            warning={block.data.warning as boolean}
          />
        );
      case 'conversion':
        return (
          <div key={index} className="viz-card border-red-500">
            <div className="viz-card-header">
              <span className="text-red-400">⚠️ 溢出转换</span>
            </div>
            <div className="viz-card-body text-center">
              <div className="text-2xl font-mono">
                <span className="text-slate-400">{block.data.from}</span>
                <span className="mx-2 text-red-400">→</span>
                <span className="text-green-400">{block.data.to}</span>
              </div>
              <div className="text-sm text-red-400 mt-2">{block.data.operation}</div>
            </div>
          </div>
        );
      case 'stdout':
        return (
          <div key={index} className="viz-card border-green-500">
            <div className="viz-card-header">
              <span className="text-green-400">🖥️ 输出</span>
            </div>
            <div className="viz-card-body">
              <div className="bg-black/50 p-3 rounded font-mono text-green-400">
                {block.data.content}
              </div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div key={index} className="viz-card border-red-500">
            <div className="viz-card-header">
              <span className="text-red-400">📝 {block.data.title}</span>
            </div>
            <div className="viz-card-body">
              <ul className="space-y-1">
                {(block.data.points as string[]).map((p, i) => (
                  <li key={i} className="text-slate-300 flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'memory-layout':
        return (
          <div key={index} className="viz-card border-purple-500">
            <div className="viz-card-header">
              <span className="text-purple-400">{block.data.title}</span>
            </div>
            <div className="viz-card-body">
              {/* 表达式显示 */}
              <div className="mb-4 p-2 bg-slate-800 rounded font-mono text-center">
                <span className="text-slate-400">{block.data.expression}</span>
              </div>
              {/* 内存布局 */}
              <div className="space-y-2">
                {(block.data.variables as any[]).map((v, i) => (
                  <div key={i} className={`p-3 rounded border-2 ${v.highlight ? 'border-red-500 bg-red-500/10' : 'border-slate-600 bg-slate-800'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 font-mono text-sm">{v.address}</span>
                        <span className="text-purple-400 font-bold">{v.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-mono font-bold text-white">{v.value}</span>
                        <span className="text-slate-500 text-xs">({v.size} byte)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* 说明 */}
              {block.data.note && (
                <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-sm">
                  ⚠️ {block.data.note}
                </div>
              )}
            </div>
          </div>
        );
      case 'operation':
        return (
          <div key={index} className="viz-card border-blue-500">
            <div className="viz-card-header">
              <span className="text-blue-400">🔧 执行过程</span>
            </div>
            <div className="viz-card-body">
              {/* 表达式展示 */}
              <div className="font-mono text-lg text-center mb-4">
                <span className="text-slate-300">{block.data.expression}</span>
              </div>
              
              {/* 箭头流程图 */}
              {block.data.arrows && (
                <div className="flex items-center justify-center gap-8 my-4">
                  {(block.data.arrows as any[]).map((arrow, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {/* 上方标签 */}
                      <div className={`text-sm mb-1 ${arrow.highlight ? 'text-yellow-400 font-bold' : 'text-slate-500'}`}>
                        {arrow.label}
                      </div>
                      {/* 箭头 */}
                      <div className={`text-2xl ${arrow.highlight ? 'text-yellow-400' : 'text-slate-600'}`}>
                        ↓
                      </div>
                      {/* 下方值 */}
                      <div className={`mt-1 px-3 py-1 rounded ${arrow.highlight ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-slate-700 text-slate-400'}`}>
                        {arrow.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 普通值展示（兼容旧格式） */}
              {block.data.values && !block.data.arrows && (
                <div className="text-center text-xl font-bold text-green-400">
                  {block.data.values}
                </div>
              )}
              
              {block.data.note && (
                <div className="mt-2 text-sm text-slate-400 text-center">
                  {block.data.note}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const content = (
    <div
      className={`code-visualizer ${isFullscreen ? 'fullscreen' : 'window'}`}
      style={{ backgroundColor: BG_COLORS.outer }}
    >
      {/* TopBar */}
      <div className="viz-topbar">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-3 text-slate-400 text-sm">{data.filename}</span>
        </div>
        <div className="flex items-center gap-4">
          {data.badge && (
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs border border-red-500/30">
              {data.badge}
            </span>
          )}
          <span className="text-slate-400 text-sm">
            STEP {step + 1}/{maxStep + 1}
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="viz-main">
        {/* Code Panel */}
        <div className="viz-code-panel">
          <div className="text-xs text-slate-500 mb-2 px-2">源代码</div>
          <div className="code-lines">
            {data.code.map((line, i) => (
              <div
                key={i}
                className={`code-line ${i === currentStep.line ? 'code-line-active' : ''}`}
              >
                <span className="line-number">{i + 1}</span>
                <span className="line-content">
                  <SyntaxHighlight code={line} />
                </span>
                {i === currentStep.line && (
                  <span className="line-arrow">▶</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Viz Panel */}
        <div className="viz-panel">
          {/* Description */}
          <div
            className={`description-bar ${
              currentStep.descriptionWarn ? 'description-warn' : ''
            }`}
          >
            {currentStep.description}
          </div>

          {/* Stack Frames */}
          <div className="space-y-3 mb-4">
            {currentStep.frames.map((frame, i) => (
              <StackFrame key={i} frame={frame} />
            ))}
          </div>

          {/* Viz Blocks */}
          <div className="space-y-3">
            {currentStep.vizBlocks.map((block, i) => renderVizBlock(block, i))}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="viz-controlbar">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="control-btn" title="重置 (R)">
            <RotateCcw size={18} />
          </button>
          <button onClick={prevStep} className="control-btn" title="上一步 (←)">
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={togglePlay}
            className={`control-btn ${isPlaying ? 'text-red-400' : 'text-green-400'}`}
            title="播放/暂停 (Enter)"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={nextStep} className="control-btn" title="下一步 (→/Space)">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 mx-4">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${((step + 1) / (maxStep + 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-center gap-1 mt-1">
            {data.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === step
                    ? 'bg-blue-500 scale-125'
                    : i < step
                    ? 'bg-slate-600'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-1">
          {(['slow', 'normal', 'fast'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                speed === s
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {s === 'slow' ? '0.5x' : s === 'normal' ? '1x' : '2x'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default CodeVisualizer;
