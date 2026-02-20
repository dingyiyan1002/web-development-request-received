import { useState, useEffect } from 'react';

// 指针与内存可视化 - 深度交互组件
// 理解：指针、地址、解引用、指针运算、多级指针

type MemoryCell = {
  address: number;
  value: number | string;
  type: 'data' | 'pointer' | 'null';
  label?: string;
  pointsTo?: number;  // 如果是指针，指向的地址
};

const MEMORY_SIZE = 16;
const BASE_ADDRESS = 0x1000;

export function PointerMemoryViz() {
  const [memory, setMemory] = useState<MemoryCell[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [hoveredAddress, setHoveredAddress] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  // 初始化内存场景
  const scenarios = [
    {
      name: '基础指针',
      description: 'int a = 100; int *p = &a;',
      setup: () => {
        const mem: MemoryCell[] = [];
        for (let i = 0; i < MEMORY_SIZE; i++) {
          mem.push({
            address: BASE_ADDRESS + i * 4,
            value: 0,
            type: 'null'
          });
        }
        // a = 100 @ 0x1000
        mem[0] = { address: BASE_ADDRESS, value: 100, type: 'data', label: 'a' };
        // p = &a @ 0x1004
        mem[1] = { address: BASE_ADDRESS + 4, value: BASE_ADDRESS, type: 'pointer', label: 'p', pointsTo: BASE_ADDRESS };
        return mem;
      },
      code: [
        'int a = 100;      // a在0x1000，值为100',
        'int *p = &a;      // p在0x1004，值为0x1000',
        '',
        '*p = 200;         // 通过p修改a的值',
      ]
    },
    {
      name: '多级指针',
      description: 'int **pp = &p; 理解指向指针的指针',
      setup: () => {
        const mem: MemoryCell[] = [];
        for (let i = 0; i < MEMORY_SIZE; i++) {
          mem.push({ address: BASE_ADDRESS + i * 4, value: 0, type: 'null' });
        }
        mem[0] = { address: BASE_ADDRESS, value: 42, type: 'data', label: 'x' };
        mem[1] = { address: BASE_ADDRESS + 4, value: BASE_ADDRESS, type: 'pointer', label: 'p', pointsTo: BASE_ADDRESS };
        mem[2] = { address: BASE_ADDRESS + 8, value: BASE_ADDRESS + 4, type: 'pointer', label: 'pp', pointsTo: BASE_ADDRESS + 4 };
        return mem;
      },
      code: [
        'int x = 42;       // x在0x1000',
        'int *p = &x;      // p在0x1004，指向x',
        'int **pp = &p;    // pp在0x1008，指向p',
        '',
        '**pp = 100;       // 两次解引用修改x',
        '// pp -> p -> x',
      ]
    },
    {
      name: '指针运算',
      description: 'p+1实际上移动多少字节？',
      setup: () => {
        const mem: MemoryCell[] = [];
        for (let i = 0; i < MEMORY_SIZE; i++) {
          mem.push({ address: BASE_ADDRESS + i * 4, value: i * 10, type: 'data', label: `arr[${i}]` });
        }
        return mem;
      },
      code: [
        'int arr[5] = {0, 10, 20, 30, 40};',
        'int *p = arr;     // p = 0x1000',
        '',
        'p + 1;            // 0x1004 (不是0x1001！)',
        'p + 2;            // 0x1008',
        '// 指针运算考虑类型大小',
      ]
    },
    {
      name: '野指针与悬空指针',
      description: '理解危险的指针操作',
      setup: () => {
        const mem: MemoryCell[] = [];
        for (let i = 0; i < MEMORY_SIZE; i++) {
          mem.push({ address: BASE_ADDRESS + i * 4, value: 0, type: 'null' });
        }
        mem[0] = { address: BASE_ADDRESS, value: '???', type: 'data', label: '未初始化' };
        mem[1] = { address: BASE_ADDRESS + 4, value: BASE_ADDRESS + 100, type: 'pointer', label: '野指针p', pointsTo: BASE_ADDRESS + 100 };
        mem[5] = { address: BASE_ADDRESS + 20, value: '已释放', type: 'data', label: 'freed' };
        mem[6] = { address: BASE_ADDRESS + 24, value: BASE_ADDRESS + 20, type: 'pointer', label: '悬空指针q', pointsTo: BASE_ADDRESS + 20 };
        return mem;
      },
      code: [
        'int *p;           // 野指针：未初始化',
        '*p = 10;          // 危险！写入随机地址',
        '',
        'int *q = malloc(4);',
        'free(q);          // q现在悬空',
        '*q = 20;          // 危险！使用已释放内存',
      ]
    }
  ];

  const [currentScenario, setCurrentScenario] = useState(0);

  useEffect(() => {
    const mem = scenarios[currentScenario].setup();
    setMemory(mem);
    setCodeLines(scenarios[currentScenario].code);
    setSelectedCell(null);
    setStep(0);
  }, [currentScenario]);

  const getCellContent = (cell: MemoryCell) => {
    if (cell.type === 'null') return '';
    if (cell.type === 'pointer') {
      return `0x${(cell.value as number).toString(16).toUpperCase()}`;
    }
    return cell.value.toString();
  };

  const getPointerArrow = (fromIdx: number) => {
    const cell = memory[fromIdx];
    if (cell.type !== 'pointer' || cell.pointsTo === undefined) return null;
    
    const toIdx = memory.findIndex(m => m.address === cell.pointsTo);
    if (toIdx === -1) return null;

    const fromRow = Math.floor(fromIdx / 4);
    const fromCol = fromIdx % 4;
    const toRow = Math.floor(toIdx / 4);
    const toCol = toIdx % 4;

    // 计算箭头路径
    const isPointingDown = toRow > fromRow;
    const isPointingUp = toRow < fromRow;
    
    return (
      <svg 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
          </marker>
        </defs>
        <line
          x1={`${(fromCol + 0.5) * 25}%`}
          y1={`${(fromRow + 0.5) * 25}%`}
          x2={`${(toCol + 0.5) * 25}%`}
          y2={`${(toRow + 0.5) * 25}%`}
          stroke="#fbbf24"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          strokeDasharray="4"
        />
      </svg>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl">
      {/* 标题和场景选择 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">🎯 指针与内存可视化</h3>
          <p className="text-slate-400 text-sm">{scenarios[currentScenario].description}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentScenario(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentScenario === i
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 内存网格 */}
        <div className="relative">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="grid grid-cols-4 gap-2 relative">
              {memory.map((cell, idx) => (
                <div
                  key={cell.address}
                  onClick={() => setSelectedCell(idx)}
                  onMouseEnter={() => setHoveredAddress(cell.address)}
                  onMouseLeave={() => setHoveredAddress(null)}
                  className={`
                    relative h-20 rounded-lg border-2 p-2 cursor-pointer transition-all
                    ${cell.type === 'data' ? 'bg-blue-900/40 border-blue-500/50' : ''}
                    ${cell.type === 'pointer' ? 'bg-amber-900/40 border-amber-500/50' : ''}
                    ${cell.type === 'null' ? 'bg-slate-800 border-slate-700' : ''}
                    ${selectedCell === idx ? 'ring-2 ring-emerald-400' : ''}
                    ${hoveredAddress === cell.pointsTo ? 'ring-2 ring-amber-400' : ''}
                  `}
                >
                  {/* 地址标签 */}
                  <div className="absolute top-1 left-2 text-[10px] text-slate-500 font-mono">
                    0x{cell.address.toString(16).toUpperCase()}
                  </div>
                  
                  {/* 变量名 */}
                  {cell.label && (
                    <div className="absolute top-1 right-2 text-[10px] text-emerald-400 font-medium">
                      {cell.label}
                    </div>
                  )}
                  
                  {/* 值 */}
                  <div className={`
                    absolute bottom-2 left-2 right-2 text-center font-mono text-sm
                    ${cell.type === 'pointer' ? 'text-amber-400' : 'text-blue-300'}
                  `}>
                    {getCellContent(cell)}
                  </div>

                  {/* 指针标记 */}
                  {cell.type === 'pointer' && (
                    <div className="absolute bottom-1 right-1 text-amber-500">
                      👆
                    </div>
                  )}
                </div>
              ))}
              
              {/* 箭头层 */}
              <div className="absolute inset-0">
                {memory.map((_, idx) => getPointerArrow(idx))}
              </div>
            </div>
          </div>

          {/* 图例 */}
          <div className="flex gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-3 h-3 rounded bg-blue-900/40 border border-blue-500/50"></span>
              数据
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-3 h-3 rounded bg-amber-900/40 border border-amber-500/50"></span>
              指针
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
              空
            </span>
          </div>
        </div>

        {/* 代码和解释 */}
        <div className="space-y-4">
          {/* 代码显示 */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-slate-500">C代码</span>
            </div>
            <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
              {codeLines.map((line, i) => (
                <div 
                  key={i} 
                  className={`${
                    line.startsWith('//') ? 'text-slate-500' : 
                    line.includes('危险') ? 'text-red-400' :
                    line.includes('*') ? 'text-amber-400' : 'text-blue-300'
                  }`}
                >
                  {line || ' '}
                </div>
              ))}
            </pre>
          </div>

          {/* 选中单元格详情 */}
          {selectedCell !== null && memory[selectedCell].type !== 'null' && (
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-2">选中内存详情</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">地址:</span>
                  <span className="font-mono text-emerald-400">
                    0x{memory[selectedCell].address.toString(16).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">变量名:</span>
                  <span className="text-blue-300">{memory[selectedCell].label || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">类型:</span>
                  <span className={`
                    ${memory[selectedCell].type === 'pointer' ? 'text-amber-400' : 'text-blue-300'}
                  `}>
                    {memory[selectedCell].type === 'pointer' ? '指针 (int*)' : '数据 (int)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">值:</span>
                  <span className="font-mono text-white">
                    {getCellContent(memory[selectedCell])}
                  </span>
                </div>
                {memory[selectedCell].pointsTo && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">指向:</span>
                    <span className="font-mono text-amber-400">
                      0x{memory[selectedCell].pointsTo.toString(16).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 教学提示 */}
          <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-500/20">
            <h4 className="text-sm font-bold text-emerald-400 mb-2">💡 关键概念</h4>
            <ul className="text-xs text-emerald-200 space-y-1">
              {currentScenario === 0 && (
                <>
                  <li>• &a 获取变量a的地址</li>
                  <li>• *p 访问指针p指向的值</li>
                  <li>• 指针本身也有地址，占用内存</li>
                </>
              )}
              {currentScenario === 1 && (
                <>
                  <li>• pp 存储的是指针p的地址</li>
                  <li>• *pp 得到p的值（即x的地址）</li>
                  <li>• **pp 两次解引用得到x的值</li>
                </>
              )}
              {currentScenario === 2 && (
                <>
                  <li>• p+1 不是地址+1，而是+sizeof(int)</li>
                  <li>• 指针运算自动考虑类型大小</li>
                  <li>• arr[i] 等价于 *(arr+i)</li>
                </>
              )}
              {currentScenario === 3 && (
                <>
                  <li>• 野指针：未初始化就使用</li>
                  <li>• 悬空指针：指向已释放内存</li>
                  <li>• 使用前必须检查是否为NULL</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
