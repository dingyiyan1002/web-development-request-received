import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

// ============================================
// 可视化组件工厂 - 根据题目类型自动挂载
// ============================================

export type VizType = 'memory' | 'pointer' | 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'flow';

interface VizStep {
  description: string;
  highlight?: number[];
  arrows?: { from: number; to: number; label?: string }[];
  variables?: Record<string, any>;
}

interface VisualizationData {
  type: VizType;
  title: string;
  description: string;
  steps: VizStep[];
  initialData?: any;
}

interface VisualizationFactoryProps {
  data: VisualizationData;
  isDarkMode: boolean;
}

export const VisualizationFactory: React.FC<VisualizationFactoryProps> = ({ 
  data, 
  isDarkMode 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 自动播放
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= data.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isPlaying, data.steps.length]);

  const step = data.steps[currentStep];

  return (
    <div className={`viz-factory ${isDarkMode ? 'dark' : 'light'}`}>
      {/* 控制栏 */}
      <div className="viz-controls">
        <button 
          onClick={() => setCurrentStep(0)}
          className="control-btn"
          title="重置"
        >
          <RotateCcw size={14} />
        </button>
        <button 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className="control-btn"
          disabled={currentStep === 0}
        >
          <ChevronLeft size={14} />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="control-btn primary"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button 
          onClick={() => setCurrentStep(Math.min(data.steps.length - 1, currentStep + 1))}
          className="control-btn"
          disabled={currentStep === data.steps.length - 1}
        >
          <ChevronRight size={14} />
        </button>
        <span className="step-indicator">
          步骤 {currentStep + 1} / {data.steps.length}
        </span>
      </div>

      {/* 步骤描述 */}
      <div className="step-description">
        {step.description}
      </div>

      {/* 根据类型渲染不同的可视化 */}
      <div className="viz-stage">
        {data.type === 'memory' && <MemoryVisualization step={step} isDarkMode={isDarkMode} />}
        {data.type === 'pointer' && <PointerVisualization step={step} isDarkMode={isDarkMode} />}
        {data.type === 'array' && <ArrayVisualization step={step} isDarkMode={isDarkMode} />}
        {data.type === 'linkedlist' && <LinkedListVisualization step={step} isDarkMode={isDarkMode} />}
        {data.type === 'flow' && <FlowVisualization step={step} isDarkMode={isDarkMode} />}
      </div>

      {/* 变量监视器 */}
      {step.variables && (
        <div className="variable-monitor">
          <h4>变量状态</h4>
          <div className="variable-grid">
            {Object.entries(step.variables).map(([name, value]) => (
              <div key={name} className="variable-item">
                <span className="var-name">{name}</span>
                <span className="var-value">{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .viz-factory {
          font-family: 'SF Mono', Monaco, monospace;
        }

        .viz-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 12px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
          border-radius: 8px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
          color: ${isDarkMode ? '#e2e8f0' : '#475569'};
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-btn:hover:not(:disabled) {
          background: ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'};
        }

        .control-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .control-btn.primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
        }

        .step-indicator {
          margin-left: auto;
          font-size: 12px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
        }

        .step-description {
          padding: 12px 16px;
          background: ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'};
          border-left: 3px solid #3b82f6;
          border-radius: 0 8px 8px 0;
          font-size: 13px;
          color: ${isDarkMode ? '#e2e8f0' : '#334155'};
          margin-bottom: 16px;
        }

        .viz-stage {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .variable-monitor {
          margin-top: 16px;
          padding: 12px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
          border-radius: 8px;
        }

        .variable-monitor h4 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          margin: 0 0 8px 0;
        }

        .variable-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 8px;
        }

        .variable-item {
          display: flex;
          flex-direction: column;
          padding: 8px 12px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'white'};
          border-radius: 6px;
          border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
        }

        .var-name {
          font-size: 11px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          margin-bottom: 2px;
        }

        .var-value {
          font-size: 13px;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
          font-family: monospace;
        }
      `}</style>
    </div>
  );
};

// ============================================
// 内存可视化组件
// ============================================
const MemoryVisualization: React.FC<{ step: VizStep; isDarkMode: boolean }> = ({ step, isDarkMode }) => {
  const cells = step.cells || [
    { address: '0x1000', value: '??', label: '未初始化' },
    { address: '0x1004', value: '??', label: '未初始化' },
    { address: '0x1008', value: '??', label: '未初始化' },
  ];

  return (
    <div className="memory-viz">
      <div className="memory-grid">
        {cells.map((cell: any, idx: number) => (
          <div 
            key={idx}
            className={`memory-cell ${step.highlight?.includes(idx) ? 'highlight' : ''}`}
          >
            <div className="cell-address">{cell.address}</div>
            <div className="cell-value">{cell.value}</div>
            <div className="cell-label">{cell.label}</div>
          </div>
        ))}
      </div>

      {/* 指针箭头 */}
      {step.arrows?.map((arrow: any, idx: number) => (
        <div key={idx} className="memory-arrow">
          <svg viewBox="0 0 100 40" className="arrow-svg">
            <defs>
              <marker id={`arrowhead-${idx}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            <line 
              x1="10" y1="20" 
              x2="90" y2="20" 
              stroke="#3b82f6" 
              strokeWidth="2"
              markerEnd={`url(#arrowhead-${idx})`}
            />
          </svg>
          {arrow.label && <span className="arrow-label">{arrow.label}</span>}
        </div>
      ))}

      <style>{`
        .memory-viz {
          width: 100%;
        }

        .memory-grid {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .memory-cell {
          width: 80px;
          padding: 12px 8px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'white'};
          border: 2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s;
        }

        .memory-cell.highlight {
          border-color: #3b82f6;
          background: ${isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'};
          box-shadow: 0 0 0 3px ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
        }

        .cell-address {
          font-size: 10px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          margin-bottom: 4px;
        }

        .cell-value {
          font-size: 16px;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
          font-family: monospace;
        }

        .cell-label {
          font-size: 10px;
          color: ${isDarkMode ? '#94a3b8' : '#64748b'};
          margin-top: 4px;
        }

        .memory-arrow {
          margin-top: 16px;
          text-align: center;
        }

        .arrow-svg {
          width: 100px;
          height: 40px;
        }

        .arrow-label {
          display: block;
          font-size: 11px;
          color: #3b82f6;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

// ============================================
// 指针可视化组件
// ============================================
const PointerVisualization: React.FC<{ step: VizStep; isDarkMode: boolean }> = ({ step, isDarkMode }) => {
  return (
    <div className="pointer-viz">
      <div className="pointer-diagram">
        {/* 变量盒子 */}
        <div className="variable-boxes">
          {step.variables && Object.entries(step.variables).map(([name, value]: [string, any]) => (
            <div key={name} className={`var-box ${value?.type === 'pointer' ? 'pointer' : ''}`}>
              <div className="var-box-name">{name}</div>
              <div className="var-box-value">
                {value?.type === 'pointer' ? value.address : JSON.stringify(value)}
              </div>
            </div>
          ))}
        </div>

        {/* 内存区域 */}
        <div className="memory-region">
          {step.memory?.map((block: any, idx: number) => (
            <div 
              key={idx}
              className={`mem-block ${step.highlight?.includes(idx) ? 'active' : ''}`}
            >
              <span className="block-addr">{block.address}</span>
              <span className="block-val">{block.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pointer-viz {
          width: 100%;
        }

        .pointer-diagram {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .variable-boxes {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .var-box {
          padding: 12px 16px;
          background: ${isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'};
          border: 2px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'};
          border-radius: 8px;
          text-align: center;
          min-width: 80px;
        }

        .var-box.pointer {
          background: ${isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'};
          border-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
        }

        .var-box-name {
          font-size: 11px;
          color: ${isDarkMode ? '#94a3b8' : '#64748b'};
          margin-bottom: 4px;
        }

        .var-box-value {
          font-size: 14px;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
          font-family: monospace;
        }

        .memory-region {
          display: flex;
          gap: 4px;
          justify-content: center;
        }

        .mem-block {
          padding: 16px 12px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'white'};
          border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          border-radius: 6px;
          text-align: center;
          min-width: 60px;
        }

        .mem-block.active {
          border-color: #10b981;
          background: ${isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'};
        }

        .block-addr {
          display: block;
          font-size: 10px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          margin-bottom: 4px;
        }

        .block-val {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        }
      `}</style>
    </div>
  );
};

// ============================================
// 数组可视化组件
// ============================================
const ArrayVisualization: React.FC<{ step: VizStep; isDarkMode: boolean }> = ({ step, isDarkMode }) => {
  const array = step.array || [1, 2, 3, 4, 5];
  const i = step.i ?? -1;
  const j = step.j ?? -1;

  return (
    <div className="array-viz">
      <div className="array-container">
        {array.map((val: any, idx: number) => (
          <div 
            key={idx}
            className={`array-cell 
              ${idx === i ? 'pointer-i' : ''} 
              ${idx === j ? 'pointer-j' : ''}
              ${step.highlight?.includes(idx) ? 'highlight' : ''}
            `}
          >
            <div className="cell-index">[{idx}]</div>
            <div className="cell-value">{val}</div>
          </div>
        ))}
      </div>

      {/* 指针指示器 */}
      <div className="pointer-indicators">
        {i >= 0 && (
          <div className="pointer-label i">
            <span className="pointer-arrow">↑</span>
            <span>i = {i}</span>
          </div>
        )}
        {j >= 0 && (
          <div className="pointer-label j">
            <span className="pointer-arrow">↑</span>
            <span>j = {j}</span>
          </div>
        )}
      </div>

      <style>{`
        .array-viz {
          width: 100%;
        }

        .array-container {
          display: flex;
          gap: 4px;
          justify-content: center;
          margin-bottom: 8px;
        }

        .array-cell {
          width: 50px;
          padding: 12px 8px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'white'};
          border: 2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s;
        }

        .array-cell.pointer-i {
          border-color: #8b5cf6;
          background: ${isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'};
        }

        .array-cell.pointer-j {
          border-color: #10b981;
          background: ${isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'};
        }

        .array-cell.highlight {
          border-color: #f59e0b;
          background: ${isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)'};
        }

        .cell-index {
          font-size: 10px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          margin-bottom: 4px;
        }

        .cell-value {
          font-size: 18px;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        }

        .pointer-indicators {
          display: flex;
          gap: 24px;
          justify-content: center;
        }

        .pointer-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
        }

        .pointer-label.i {
          color: #8b5cf6;
        }

        .pointer-label.j {
          color: #10b981;
        }

        .pointer-arrow {
          font-size: 20px;
          line-height: 1;
        }
      `}</style>
    </div>
  );
};

// ============================================
// 链表可视化组件
// ============================================
const LinkedListVisualization: React.FC<{ step: VizStep; isDarkMode: boolean }> = ({ step, isDarkMode }) => {
  const nodes = step.nodes || [
    { value: 1, next: 1 },
    { value: 2, next: 2 },
    { value: 3, next: null },
  ];

  return (
    <div className="linkedlist-viz">
      <div className="linked-list">
        {nodes.map((node: any, idx: number) => (
          <React.Fragment key={idx}>
            <div className={`list-node ${step.highlight?.includes(idx) ? 'active' : ''}`}>
              <div className="node-value">{node.value}</div>
              <div className="node-next">→</div>
            </div>
            {node.next !== null && (
              <div className="node-connector">
                <svg viewBox="0 0 40 20" className="connector-svg">
                  <line x1="0" y1="10" x2="35" y2="10" stroke="#64748b" strokeWidth="2" />
                  <polygon points="35,6 40,10 35,14" fill="#64748b" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="list-null">NULL</div>
      </div>

      <style>{`
        .linkedlist-viz {
          width: 100%;
          overflow-x: auto;
        }

        .linked-list {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 20px;
          min-width: min-content;
        }

        .list-node {
          display: flex;
          align-items: center;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'white'};
          border: 2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          border-radius: 8px;
          overflow: hidden;
        }

        .list-node.active {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
        }

        .node-value {
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
          border-right: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
        }

        .node-next {
          padding: 12px 8px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          font-size: 14px;
        }

        .node-connector {
          width: 40px;
          flex-shrink: 0;
        }

        .connector-svg {
          width: 100%;
          height: 20px;
        }

        .list-null {
          padding: 8px 12px;
          background: ${isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)'};
          border-radius: 4px;
          font-size: 12px;
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
};

// ============================================
// 流程可视化组件
// ============================================
const FlowVisualization: React.FC<{ step: VizStep; isDarkMode: boolean }> = ({ step, isDarkMode }) => {
  const states = step.states || [
    { name: 'IDLE', active: true },
    { name: 'RUN', active: false },
    { name: 'STOP', active: false },
  ];

  return (
    <div className="flow-viz">
      <div className="flow-diagram">
        {states.map((state: any, idx: number) => (
          <React.Fragment key={idx}>
            <div className={`flow-state ${state.active ? 'active' : ''}`}>
              {state.name}
            </div>
            {idx < states.length - 1 && (
              <div className="flow-arrow">
                <svg viewBox="0 0 60 24" className="arrow-svg">
                  <line x1="0" y1="12" x2="50" y2="12" stroke="#64748b" strokeWidth="2" />
                  <polygon points="50,8 60,12 50,16" fill="#64748b" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <style>{`
        .flow-viz {
          width: 100%;
        }

        .flow-diagram {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px;
        }

        .flow-state {
          padding: 12px 24px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'white'};
          border: 2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          color: ${isDarkMode ? '#94a3b8' : '#64748b'};
          transition: all 0.3s;
        }

        .flow-state.active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .flow-arrow {
          width: 60px;
        }

        .arrow-svg {
          width: 100%;
          height: 24px;
        }
      `}</style>
    </div>
  );
};

export default VisualizationFactory;
