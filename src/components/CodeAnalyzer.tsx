import { useState } from 'react';

export interface CodeLine {
  num: number;
  code?: string;
  explanation: string;
  memoryChange?: string;
  highlight?: boolean;
}

export interface MemoryCell {
  name: string;
  address: string;
  value: string;
  beforeValue?: string;
  type: 'variable' | 'pointer' | 'array' | 'struct';
  pointsTo?: string;
  changed?: boolean;
}

interface CodeAnalyzerProps {
  code: string;
  lines: CodeLine[];
  memoryCells: MemoryCell[];
  knowledgePoints: string[];
  hint?: string;
  showAnalysis?: boolean;
}

export function CodeAnalyzer({
  code,
  lines,
  memoryCells,
  knowledgePoints,
  hint,
  showAnalysis = false
}: CodeAnalyzerProps) {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [showMemory, setShowMemory] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const codeLines = code.split('\n');

  return (
    <div className="space-y-4">
      <div className="bg-[#0d1117] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#2a2a2a]">
          <span className="text-[#8b949e] text-sm font-medium">代码分析</span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowMemory(!showMemory)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                showMemory
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                  : 'bg-[#21262d] text-[#8b949e] border border-[#30363d] hover:border-purple-500/50'
              }`}
            >
              🧠 内存图
            </button>
            {hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  showHint
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                    : 'bg-[#21262d] text-[#8b949e] border border-[#30363d] hover:border-yellow-500/50'
                }`}
              >
                💡 提示
              </button>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex-1 font-mono text-sm">
            {codeLines.map((line, i) => {
              const lineInfo = lines.find(l => l.num === i + 1);
              const isActive = activeLine === i + 1 || lineInfo?.highlight;
              return (
                <div
                  key={i}
                  className={`flex transition-colors cursor-pointer ${
                    isActive ? 'bg-[#1f6feb]/20' : 'hover:bg-[#1f6feb]/10'
                  }`}
                  onMouseEnter={() => setActiveLine(i + 1)}
                  onMouseLeave={() => setActiveLine(null)}
                >
                  <span className="w-10 text-right pr-3 text-[#484f58] select-none border-r border-[#21262d] py-1">
                    {i + 1}
                  </span>
                  <pre className="flex-1 px-4 py-1 whitespace-pre overflow-x-auto">
                    {highlightSyntax(line)}
                  </pre>
                </div>
              );
            })}
          </div>

          {showAnalysis && activeLine && (
            <div className="w-72 border-l border-[#2a2a2a] bg-[#161b22] p-3 text-sm">
              {(() => {
                const lineInfo = lines.find(l => l.num === activeLine);
                if (!lineInfo) return null;
                return (
                  <div className="space-y-2">
                    <div className="text-[#58a6ff] font-medium">第 {activeLine} 行解析</div>
                    <p className="text-[#c9d1d9] leading-relaxed">{lineInfo.explanation}</p>
                    {lineInfo.memoryChange && (
                      <div className="mt-2 p-2 bg-[#238636]/20 rounded border border-[#238636]/50 text-[#7ee787] text-xs">
                        📦 {lineInfo.memoryChange}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {showHint && hint && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <span>💡</span>
            <span className="font-medium">提示</span>
          </div>
          <p>{hint}</p>
        </div>
      )}

      {showMemory && memoryCells.length > 0 && (
        <div className="bg-[#0d1117] border border-[#2a2a2a] rounded-lg p-4">
          <h3 className="text-[#58a6ff] text-sm font-medium mb-4">📦 内存布局</h3>
          <div className="space-y-2 font-mono text-sm">
            {memoryCells.map((cell, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[#ffa657] w-28 text-xs">{cell.name}</span>
                <span className="text-[#8b949e] text-xs w-20">{cell.address}</span>
                <div
                  className={`px-3 py-1 rounded border ${
                    cell.changed
                      ? 'bg-[#238636]/20 border-[#238636]/50 text-[#7ee787]'
                      : 'bg-[#161b22] border-[#30363d] text-[#79c0ff]'
                  }`}
                >
                  {cell.beforeValue && (
                    <span className="text-[#8b949e] line-through mr-2">{cell.beforeValue}</span>
                  )}
                  {cell.value}
                </div>
                {cell.pointsTo && (
                  <>
                    <span className="text-[#58a6ff]">→</span>
                    <span className="text-[#7ee787] text-xs">{cell.pointsTo}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {knowledgePoints.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {knowledgePoints.map((point, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-xs text-[#79c0ff]"
            >
              {point}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function highlightSyntax(code: string): React.ReactNode {
  const keywords = ['int', 'char', 'void', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'struct', 'typedef', 'const', 'static', 'extern', 'volatile', 'unsigned', 'signed', 'long', 'short', 'float', 'double', 'sizeof', 'enum', 'union', 'goto', 'default', 'register', 'auto'];
  
  const parts: React.ReactNode[] = [];
  let remaining = code;
  let key = 0;

  const patterns = [
    { regex: /"[^"]*"/g, className: 'text-[#a5d6ff]' },
    { regex: /'[^']*'/g, className: 'text-[#a5d6ff]' },
    { regex: /\/\/.*$/g, className: 'text-[#8b949e] italic' },
    { regex: /\/\*[\s\S]*?\*\//g, className: 'text-[#8b949e] italic' },
    { regex: /\b\d+\b/g, className: 'text-[#ffa657]' },
    { regex: /0x[0-9a-fA-F]+/g, className: 'text-[#ffa657]' },
    { regex: /\b(true|false|NULL|nullptr)\b/g, className: 'text-[#ffa657]' },
  ];

  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  const functionPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g;
  const pointerPattern = /\*/g;

  let processed = remaining;

  patterns.forEach(({ regex, className }) => {
    processed = processed.replace(regex, (match) => {
      return `{{${className}|${match}}}`;
    });
  });

  processed = processed.replace(keywordPattern, (match) => {
    return `{{text-[#ff7b72]|${match}}}`;
  });

  processed = processed.replace(functionPattern, (_, name) => {
    return `{{text-[#d2a8ff]|${name}}}`;
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

export function generateMemoryVisualization(
  variables: Array<{ name: string; type: string; value: string; address?: string }>
): MemoryCell[] {
  return variables.map((v, i) => ({
    name: v.name,
    address: v.address || `0x${(1000 + i * 4).toString(16)}`,
    value: v.value,
    type: v.type as MemoryCell['type'],
  }));
}
