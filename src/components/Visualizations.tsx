// 可视化组件 - 用于将抽象的C语言概念具象化
import { Eye } from 'lucide-react';
import { useState } from 'react';

// ====== 数据类型定义 ======
export interface MemoryViz {
  type: 'memory';
  title: string;
  description?: string;
  cells: { address: string; name: string; type: string; value: string; size: number; highlight?: boolean }[];
}

export interface ArrayViz {
  type: 'array';
  title: string;
  description?: string;
  name: string;
  elements: { value: string; highlight?: boolean; label?: string }[];
  showNull?: boolean;
  pointer?: { index: number; label: string };
}

export interface PointerViz {
  type: 'pointer';
  title: string;
  description?: string;
  vars: { id: string; name: string; type: string; value: string; addr: string }[];
  arrows: { from: string; to: string; label?: string; color?: string }[];
}

export interface FlowViz {
  type: 'flow';
  title: string;
  description?: string;
  condition: string;
  trueBranch: string;
  falseBranch: string;
  trueActive?: boolean;
  falseActive?: boolean;
}

export interface StackViz {
  type: 'stack';
  title: string;
  description?: string;
  frames: { name: string; vars?: string; active?: boolean }[];
  heapItems?: { label: string; value: string; freed?: boolean }[];
}

export interface TableViz {
  type: 'table';
  title: string;
  description?: string;
  headers: string[];
  rows: { cells: string[]; highlight?: boolean }[];
}

export interface ExecutionViz {
  type: 'execution';
  title: string;
  description?: string;
  steps: { code: string; vars: string; output: string; note?: string }[];
}

export interface LoopViz {
  type: 'loop';
  title: string;
  description?: string;
  initVar: string;
  condition: string;
  update: string;
  iterations: { varState: string; condResult: string; output: string }[];
}

export type VizData = MemoryViz | ArrayViz | PointerViz | FlowViz | StackViz | TableViz | ExecutionViz | LoopViz;

// ====== 渲染组件 ======

function MemoryVisualizer({ data }: { data: MemoryViz }) {
  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-500 mb-3 font-mono">内存布局示意图</div>
      <div className="flex flex-wrap gap-3">
        {data.cells.map((cell, i) => (
          <div key={i} className={`viz-memory-cell ${cell.highlight ? 'viz-highlight' : ''}`}>
            <div className="text-[10px] text-slate-500 font-mono mb-1">{cell.address}</div>
            <div className="viz-memory-value">{cell.value}</div>
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="text-xs text-cyan-300 font-mono">{cell.name}</div>
              <div className="text-[10px] text-slate-500">{cell.type} · {cell.size}字节</div>
            </div>
          </div>
        ))}
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-2">{data.description}</p>}
    </div>
  );
}

function ArrayVisualizer({ data }: { data: ArrayViz }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-2 font-mono">{data.name} 数组结构</div>
      <div className="flex items-end gap-0 overflow-x-auto pb-6">
        {data.elements.map((el, i) => (
          <div key={i} className="flex flex-col items-center relative">
            <div className="text-[10px] text-slate-500 mb-1 font-mono">[{i}]</div>
            <div className={`viz-array-cell ${el.highlight ? 'viz-highlight' : ''}`}>
              <span className="font-mono text-sm font-bold">{el.value}</span>
            </div>
            {el.label && (
              <div className="text-[10px] text-emerald-400 mt-1">{el.label}</div>
            )}
            {data.pointer?.index === i && (
              <div className="absolute -bottom-5 flex flex-col items-center">
                <div className="text-emerald-400 text-xs">↑</div>
                <div className="text-[10px] text-emerald-400 font-mono">{data.pointer.label}</div>
              </div>
            )}
          </div>
        ))}
        {data.showNull && (
          <div className="flex flex-col items-center">
            <div className="text-[10px] text-slate-500 mb-1 font-mono">[{data.elements.length}]</div>
            <div className="viz-array-cell viz-null">
              <span className="font-mono text-sm text-red-400">\\0</span>
            </div>
          </div>
        )}
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-2">{data.description}</p>}
    </div>
  );
}

function PointerVisualizer({ data }: { data: PointerViz }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-3 font-mono">指针引用关系图</div>
      <div className="flex items-center gap-6 flex-wrap justify-center py-2">
        {data.vars.map((v) => {
          const hasArrow = data.arrows.some(a => a.from === v.id);
          const arrowData = data.arrows.find(a => a.from === v.id);
          return (
            <div key={v.id} className="flex items-center gap-3">
              <div className={`viz-ptr-box ${hasArrow ? 'viz-ptr-source' : 'viz-ptr-target'}`}>
                <div className="text-[10px] text-slate-500">{v.addr}</div>
                <div className="text-sm font-bold text-white my-1">
                  {hasArrow ? '●→' : v.value}
                </div>
                <div className="text-xs text-cyan-300 font-mono">{v.type} {v.name}</div>
              </div>
              {hasArrow && arrowData && (
                <div className="flex items-center">
                  <div className="viz-arrow" />
                  {arrowData.label && (
                    <span className="text-[10px] text-emerald-400 -mt-5 absolute">{arrowData.label}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-2">{data.description}</p>}
    </div>
  );
}

function FlowVisualizer({ data }: { data: FlowViz }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-slate-500 mb-3 font-mono">控制流程图</div>
      {/* Condition node */}
      <div className="viz-flow-condition">
        <span className="font-mono text-sm">{data.condition}</span>
      </div>
      <div className="h-4 w-px bg-slate-600" />
      {/* Branches */}
      <div className="flex gap-6 items-start">
        {/* True branch */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-emerald-400 mb-2">✓ 真 (true)</div>
          <div className={`viz-flow-action ${data.trueActive ? 'viz-flow-active' : ''}`}>
            <span className="text-sm">{data.trueBranch}</span>
          </div>
        </div>
        {/* Divider */}
        <div className="w-px h-16 bg-slate-700 self-center" />
        {/* False branch */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-red-400 mb-2">✗ 假 (false)</div>
          <div className={`viz-flow-action ${data.falseActive ? 'viz-flow-active' : ''}`}>
            <span className="text-sm">{data.falseBranch}</span>
          </div>
        </div>
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-3">{data.description}</p>}
    </div>
  );
}

function StackVisualizer({ data }: { data: StackViz }) {
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {/* Call Stack */}
      <div className="flex-1 min-w-[140px]">
        <div className="text-xs text-slate-500 mb-2 font-mono text-center">调用栈 (Stack)</div>
        <div className="viz-stack">
          {data.frames.map((frame, i) => (
            <div key={i} className={`viz-stack-frame ${frame.active ? 'viz-stack-active' : ''}`}>
              <div className="text-sm font-mono font-medium">{frame.name}</div>
              {frame.vars && <div className="text-[10px] text-slate-400">{frame.vars}</div>}
              {i === 0 && <span className="text-[10px] text-yellow-400 ml-2">← 栈顶</span>}
              {i === data.frames.length - 1 && <span className="text-[10px] text-slate-500 ml-2">← 栈底</span>}
            </div>
          ))}
        </div>
      </div>
      {/* Heap */}
      {data.heapItems && data.heapItems.length > 0 && (
        <div className="flex-1 min-w-[140px]">
          <div className="text-xs text-slate-500 mb-2 font-mono text-center">堆 (Heap)</div>
          <div className="space-y-2">
            {data.heapItems.map((item, i) => (
              <div key={i} className={`viz-heap-block ${item.freed ? 'viz-heap-freed' : ''}`}>
                <div className="text-xs font-mono">{item.label}</div>
                <div className="text-sm font-bold">{item.value}</div>
                {item.freed && <div className="text-[10px] text-red-400">已释放 ✗</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.description && <p className="text-xs text-slate-500 mt-2 w-full">{data.description}</p>}
    </div>
  );
}

function TableVisualizer({ data }: { data: TableViz }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-2 font-mono">对照表</div>
      <div className="overflow-x-auto">
        <table className="viz-table">
          <thead>
            <tr>
              {data.headers.map((h, i) => <th key={i}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className={row.highlight ? 'viz-table-highlight' : ''}>
                {row.cells.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-2">{data.description}</p>}
    </div>
  );
}

function ExecutionVisualizer({ data }: { data: ExecutionViz }) {
  const [step, setStep] = useState(0);
  const current = data.steps[step];

  return (
    <div>
      <div className="text-xs text-slate-500 mb-3 font-mono">逐步执行追踪</div>
      <div className="viz-execution">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-emerald-400">步骤 {step + 1}/{data.steps.length}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="viz-step-btn"
            >◀ 上一步</button>
            <button
              onClick={() => setStep(Math.min(data.steps.length - 1, step + 1))}
              disabled={step === data.steps.length - 1}
              className="viz-step-btn"
            >下一步 ▶</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="viz-exec-cell">
            <div className="text-[10px] text-slate-500 mb-1">执行代码</div>
            <code className="text-yellow-300 font-mono text-xs">{current.code}</code>
          </div>
          <div className="viz-exec-cell">
            <div className="text-[10px] text-slate-500 mb-1">变量状态</div>
            <code className="text-cyan-300 font-mono text-xs">{current.vars}</code>
          </div>
          <div className="viz-exec-cell">
            <div className="text-[10px] text-slate-500 mb-1">输出</div>
            <code className="text-green-300 font-mono text-xs">{current.output || '(无)'}</code>
          </div>
        </div>
        {current.note && (
          <div className="mt-2 text-xs text-amber-400/80 bg-amber-500/5 rounded p-2">
            💡 {current.note}
          </div>
        )}
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-2">{data.description}</p>}
    </div>
  );
}

function LoopVisualizer({ data }: { data: LoopViz }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-2 font-mono">循环执行过程</div>
      <div className="mb-3 flex gap-3 flex-wrap text-xs">
        <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-300 font-mono">初始: {data.initVar}</span>
        <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 font-mono">条件: {data.condition}</span>
        <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-300 font-mono">更新: {data.update}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="viz-table viz-table-compact">
          <thead>
            <tr>
              <th>轮次</th>
              <th>变量值</th>
              <th>条件判断</th>
              <th>输出</th>
            </tr>
          </thead>
          <tbody>
            {data.iterations.map((iter, i) => (
              <tr key={i} className={iter.condResult === '假→结束' ? 'viz-table-end' : ''}>
                <td className="text-center">{i + 1}</td>
                <td className="font-mono">{iter.varState}</td>
                <td className={iter.condResult === '假→结束' ? 'text-red-400' : 'text-emerald-400'}>
                  {iter.condResult}
                </td>
                <td className="font-mono">{iter.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.description && <p className="text-xs text-slate-500 mt-2">{data.description}</p>}
    </div>
  );
}

// ====== 主入口组件 ======
export function Visualization({ data }: { data: VizData }) {
  const [show, setShow] = useState(true);

  return (
    <div className="viz-container">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors mb-2"
      >
        <Eye className="w-4 h-4" />
        <span className="font-medium">{data.title}</span>
        <span className="text-xs text-slate-600">{show ? '▼ 收起' : '▶ 展开'}</span>
      </button>

      {show && (
        <div className="viz-content animate-fadeIn">
          {data.type === 'memory' && <MemoryVisualizer data={data} />}
          {data.type === 'array' && <ArrayVisualizer data={data} />}
          {data.type === 'pointer' && <PointerVisualizer data={data} />}
          {data.type === 'flow' && <FlowVisualizer data={data} />}
          {data.type === 'stack' && <StackVisualizer data={data} />}
          {data.type === 'table' && <TableVisualizer data={data} />}
          {data.type === 'execution' && <ExecutionVisualizer data={data} />}
          {data.type === 'loop' && <LoopVisualizer data={data} />}
        </div>
      )}
    </div>
  );
}
