import { useState, useEffect } from 'react';

// COW (Copy-on-Write) 内存可视化 - 深度交互组件
// 理解：fork时的页表复制、写时复制机制

type Page = {
  id: number;
  address: string;
  content: string;
  state: 'shared' | 'parent-only' | 'child-only' | 'copied';
  isWritable: boolean;
};

type ProcessInfo = {
  pages: number[];
  pageTable: Map<number, number>;
};

type Step = {
  title: string;
  description: string;
  parent: ProcessInfo;
  child: ProcessInfo;
  pages: Page[];
};

export function COWMemoryViz() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);

  const steps: Step[] = [
    {
      title: '初始状态',
      description: '父进程拥有3页物理内存，存储数据',
      parent: { pages: [0, 1, 2], pageTable: new Map([[0, 0], [1, 1], [2, 2]]) },
      child: { pages: [], pageTable: new Map() },
      pages: [
        { id: 0, address: '0x1000', content: 'data=100', state: 'parent-only', isWritable: true },
        { id: 1, address: '0x2000', content: 'data=200', state: 'parent-only', isWritable: true },
        { id: 2, address: '0x3000', content: 'code', state: 'parent-only', isWritable: false },
      ] as Page[]
    },
    {
      title: 'fork() 执行',
      description: 'fork时只复制页表，不复制物理页。父子共享同一物理页，标记为只读',
      parent: { pages: [0, 1, 2], pageTable: new Map([[0, 0], [1, 1], [2, 2]]) },
      child: { pages: [0, 1, 2], pageTable: new Map([[0, 0], [1, 1], [2, 2]]) },
      pages: [
        { id: 0, address: '0x1000', content: 'data=100', state: 'shared', isWritable: false },
        { id: 1, address: '0x2000', content: 'data=200', state: 'shared', isWritable: false },
        { id: 2, address: '0x3000', content: 'code', state: 'shared', isWritable: false },
      ] as Page[]
    },
    {
      title: '子进程写入 0x1000',
      description: '子进程尝试写入共享页，触发缺页中断，内核复制该页，子进程获得独立副本',
      parent: { pages: [0, 1, 2], pageTable: new Map([[0, 0], [1, 1], [2, 2]]) },
      child: { pages: [3, 1, 2], pageTable: new Map([[0, 3], [1, 1], [2, 2]]) },
      pages: [
        { id: 0, address: '0x1000', content: 'data=100', state: 'parent-only', isWritable: true },
        { id: 1, address: '0x2000', content: 'data=200', state: 'shared', isWritable: false },
        { id: 2, address: '0x3000', content: 'code', state: 'shared', isWritable: false },
        { id: 3, address: '0x1000', content: 'data=999', state: 'child-only', isWritable: true },
      ] as Page[]
    },
    {
      title: '父进程写入 0x2000',
      description: '父进程写入另一共享页，同样触发COW，现在两页都是独立的',
      parent: { pages: [0, 4, 2], pageTable: new Map([[0, 0], [1, 4], [2, 2]]) },
      child: { pages: [3, 1, 2], pageTable: new Map([[0, 3], [1, 1], [2, 2]]) },
      pages: [
        { id: 0, address: '0x1000', content: 'data=100', state: 'parent-only', isWritable: true },
        { id: 1, address: '0x2000', content: 'data=200', state: 'child-only', isWritable: true },
        { id: 2, address: '0x3000', content: 'code', state: 'shared', isWritable: false },
        { id: 3, address: '0x1000', content: 'data=999', state: 'child-only', isWritable: true },
        { id: 4, address: '0x2000', content: 'data=888', state: 'parent-only', isWritable: true },
      ] as Page[]
    },
    {
      title: '最终状态',
      description: '代码页(code)始终共享（只读），数据页已分离。节省了2页的复制开销！',
      parent: { pages: [0, 4, 2], pageTable: new Map([[0, 0], [1, 4], [2, 2]]) },
      child: { pages: [3, 1, 2], pageTable: new Map([[0, 3], [1, 1], [2, 2]]) },
      pages: [
        { id: 0, address: '0x1000', content: 'data=100', state: 'parent-only', isWritable: true },
        { id: 1, address: '0x2000', content: 'data=200', state: 'child-only', isWritable: true },
        { id: 2, address: '0x3000', content: 'code', state: 'shared', isWritable: false },
        { id: 3, address: '0x1000', content: 'data=999', state: 'child-only', isWritable: true },
        { id: 4, address: '0x2000', content: 'data=888', state: 'parent-only', isWritable: true },
      ] as Page[]
    }
  ];

  const currentStep = steps[step];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const getPageColor = (pageState: string) => {
    switch (pageState) {
      case 'parent-only': return 'bg-blue-500/30 border-blue-500';
      case 'child-only': return 'bg-purple-500/30 border-purple-500';
      case 'shared': return 'bg-emerald-500/30 border-emerald-500';
      case 'copied': return 'bg-amber-500/30 border-amber-500';
      default: return 'bg-slate-700 border-slate-600';
    }
  };

  const getPageLabel = (pageState: string) => {
    switch (pageState) {
      case 'parent-only': return '父进程独占';
      case 'child-only': return '子进程独占';
      case 'shared': return '共享(只读)';
      case 'copied': return '已复制';
      default: return '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl">
      {/* 标题 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">🔄 Copy-on-Write 可视化</h3>
          <p className="text-slate-400 text-sm">理解 fork() 的写时复制机制</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs disabled:opacity-50"
          >
            ← 上一步
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium"
          >
            {isPlaying ? '⏸ 暂停' : '▶ 播放'}
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs disabled:opacity-50"
          >
            下一步 →
          </button>
        </div>
      </div>

      {/* 步骤说明 */}
      <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/20 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-blue-400 font-medium">步骤 {step + 1} / {steps.length}: {currentStep.title}</span>
        </div>
        <p className="text-sm text-blue-200">{currentStep.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 父进程页表 */}
        <div className="bg-blue-900/10 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-bold text-blue-400">父进程</h4>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="text-xs text-slate-500">页表 (虚拟 → 物理)</div>
            {Array.from(currentStep.parent.pageTable.entries()).map(([virt, phys]) => (
              <div key={virt} className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">0x{virt}000</span>
                <span className="text-slate-600">→</span>
                <span className="font-mono text-blue-300">页{phys}</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-500 mb-2">拥有的物理页</div>
          <div className="flex flex-wrap gap-2">
            {currentStep.parent.pages.map(pageId => (
              <div
                key={pageId}
                onClick={() => setSelectedPage(pageId)}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono cursor-pointer
                  border-2 transition-all
                  ${selectedPage === pageId ? 'ring-2 ring-white' : ''}
                  ${getPageColor(currentStep.pages.find(p => p.id === pageId)?.state || '')}
                `}
              >
                {pageId}
              </div>
            ))}
          </div>
        </div>

        {/* 物理内存 */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="font-bold text-slate-300 mb-4 text-center">物理内存</h4>
          
          <div className="space-y-3">
            {currentStep.pages.map(page => (
              <div
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`
                  p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${getPageColor(page.state)}
                  ${selectedPage === page.id ? 'ring-2 ring-white' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-slate-400">物理页 {page.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${page.isWritable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {page.isWritable ? '可写' : '只读'}
                  </span>
                </div>
                <div className="text-sm font-mono text-white">{page.content}</div>
                <div className="text-[10px] text-slate-500 mt-1">{getPageLabel(page.state)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 子进程页表 */}
        <div className="bg-purple-900/10 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <h4 className="font-bold text-purple-400">子进程</h4>
          </div>
          
          {currentStep.child.pages.length > 0 ? (
            <>
              <div className="space-y-2 mb-4">
                <div className="text-xs text-slate-500">页表 (虚拟 → 物理)</div>
                {Array.from(currentStep.child.pageTable.entries()).map(([virt, phys]) => (
                  <div key={virt} className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">0x{virt}000</span>
                    <span className="text-slate-600">→</span>
                    <span className="font-mono text-purple-300">页{phys}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500 mb-2">拥有的物理页</div>
              <div className="flex flex-wrap gap-2">
                {currentStep.child.pages.map(pageId => (
                  <div
                    key={pageId}
                    onClick={() => setSelectedPage(pageId)}
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono cursor-pointer
                      border-2 transition-all
                      ${selectedPage === pageId ? 'ring-2 ring-white' : ''}
                      ${getPageColor(currentStep.pages.find(p => p.id === pageId)?.state || '')}
                    `}
                  >
                    {pageId}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-slate-500 text-sm italic">尚未创建</div>
          )}
        </div>
      </div>

      {/* 选中页详情 */}
      {selectedPage !== null && (
        <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-white mb-3">物理页 {selectedPage} 详情</h4>
          {(() => {
            const page = currentStep.pages.find(p => p.id === selectedPage);
            if (!page) return null;
            return (
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">内容:</span>
                  <span className="ml-2 text-white font-mono">{page.content}</span>
                </div>
                <div>
                  <span className="text-slate-500">状态:</span>
                  <span className="ml-2 text-emerald-400">{getPageLabel(page.state)}</span>
                </div>
                <div>
                  <span className="text-slate-500">权限:</span>
                  <span className={`ml-2 ${page.isWritable ? 'text-green-400' : 'text-red-400'}`}>
                    {page.isWritable ? '可读写' : '只读'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">引用:</span>
                  <span className="ml-2 text-blue-400">
                    {currentStep.parent.pages.includes(page.id) && '父 '}
                    {currentStep.child.pages.includes(page.id) && '子'}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 教学提示 */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/20">
          <h4 className="text-sm font-bold text-emerald-400 mb-2">💡 COW 的优势</h4>
          <ul className="text-xs text-emerald-200 space-y-1">
            <li>• fork() 时不复制整个地址空间，只复制页表</li>
            <li>• 共享只读页面（如代码段），节省内存</li>
            <li>• 只有写入时才复制，延迟开销</li>
            <li>• 如果fork后立即exec，几乎零开销</li>
          </ul>
        </div>
        <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/20">
          <h4 className="text-sm font-bold text-amber-400 mb-2">⚠️ 注意事项</h4>
          <ul className="text-xs text-amber-200 space-y-1">
            <li>• 写入共享页触发缺页中断(Page Fault)</li>
            <li>• 内核分配新物理页，复制数据，更新页表</li>
            <li>• 引用计数为0时物理页才真正释放</li>
            <li>• 频繁写入会导致大量页面复制</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
