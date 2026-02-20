import { useState } from 'react';
import { Project, ProjectFragment } from '../data/projects';
import SyntaxHighlighter from './SyntaxHighlighter';

interface ProjectViewProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectView({ project, onBack }: ProjectViewProps) {
  const [currentFragmentId, setCurrentFragmentId] = useState(1);
  const [showExplanation, setShowExplanation] = useState(true);
  const [showInterviewTips, setShowInterviewTips] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const currentFragment = project.fragments.find(f => f.id === currentFragmentId) || project.fragments[0];

  const goToNext = () => {
    if (currentFragmentId < project.fragments.length) {
      setCurrentFragmentId(currentFragmentId + 1);
      setExpandedQuestion(null);
    }
  };

  const goToPrev = () => {
    if (currentFragmentId > 1) {
      setCurrentFragmentId(currentFragmentId - 1);
      setExpandedQuestion(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'intermediate': return '中等';
      case 'advanced': return '进阶';
      case 'expert': return '专家';
      default: return difficulty;
    }
  };

  const renderVisualization = (fragment: ProjectFragment) => {
    switch (fragment.visualizationType) {
      case 'architecture':
        return (
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400 mb-2">🏗️ 系统架构图</div>
            <div className="text-slate-300 whitespace-pre leading-relaxed">
              {`┌─────────────────────────────────────────┐
│              主线程 (Main Thread)        │
│              监听端口: ${project.totalLines > 200 ? '8080' : '----'}              │
└─────────────────┬───────────────────────┘
                  │ accept()
                  ▼
┌─────────────────────────────────────────┐
│           工作线程池 (Thread Pool)       │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │线程1│ │线程2│ │线程3│ │线程4│ ...    │
│  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘       │
│     └───────┴───────┴───────┘          │
│              处理HTTP请求               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           日志系统 (Async Logger)        │
│      环形缓冲区 + 异步刷盘线程            │
└─────────────────────────────────────────┘`}
            </div>
          </div>
        );
      case 'flow':
        return (
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-blue-400 mb-2">🔄 流程图</div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-900/50 px-4 py-2 rounded text-blue-200">开始</div>
              <div className="text-slate-500">↓</div>
              <div className="bg-slate-700 px-4 py-2 rounded text-slate-200">socket()</div>
              <div className="text-slate-500">↓</div>
              <div className="bg-slate-700 px-4 py-2 rounded text-slate-200">bind()</div>
              <div className="text-slate-500">↓</div>
              <div className="bg-slate-700 px-4 py-2 rounded text-slate-200">listen()</div>
              <div className="text-slate-500">↓</div>
              <div className="bg-yellow-900/50 px-4 py-2 rounded text-yellow-200">accept() ⏳ 阻塞等待</div>
              <div className="text-slate-500">↓</div>
              <div className="bg-green-900/50 px-4 py-2 rounded text-green-200">创建线程处理</div>
              <div className="text-slate-500">↓ 循环</div>
              <div className="bg-yellow-900/50 px-4 py-2 rounded text-yellow-200">accept()</div>
            </div>
          </div>
        );
      case 'memory':
        return (
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-purple-400 mb-2">💾 内存布局图</div>
            <div className="text-slate-300">
              <div className="mb-2">环形缓冲区 (64KB):</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                      i < 4 ? 'bg-green-600 text-white' : 
                      i < 8 ? 'bg-blue-600 text-white' : 
                      'bg-slate-600 text-slate-400'
                    }`}
                  >
                    {i < 4 ? 'T' : i < 8 ? 'H' : ''}
                  </div>
                ))}
              </div>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>tail = 已读取位置</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>head = 写入位置</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-600 rounded"></div>
                  <span>空闲空间</span>
                </div>
              </div>
              <div className="mt-3 text-purple-300">
                head = (head + 1) % BUFFER_SIZE
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
          >
            ← 返回
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-100">{project.name}</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className={getDifficultyColor(project.difficulty)}>
                {getDifficultyText(project.difficulty)}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{project.totalLines} 行代码</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{project.fragments.length} 个片段</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentFragmentId === 1}
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded transition-colors"
          >
            ← 上一片段
          </button>
          <span className="text-sm text-slate-400 px-2">
            {currentFragmentId} / {project.fragments.length}
          </span>
          <button
            onClick={goToNext}
            disabled={currentFragmentId === project.fragments.length}
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded transition-colors"
          >
            下一片段 →
          </button>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧片段导航 */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
          <div className="p-3 border-b border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300">片段导航</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {project.fragments.map((fragment) => (
              <button
                key={fragment.id}
                onClick={() => {
                  setCurrentFragmentId(fragment.id);
                  setExpandedQuestion(null);
                }}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  currentFragmentId === fragment.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-700 text-slate-300'
                }`}
              >
                <div className="font-medium">{fragment.id}. {fragment.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-5xl mx-auto space-y-4">
            {/* 片段标题 */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-100">
                {currentFragment.id}. {currentFragment.title}
              </h3>
            </div>

            {/* 代码区 */}
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <div className="px-4 py-2 bg-slate-700/50 border-b border-slate-700 flex items-center justify-between">
                <span className="text-sm text-slate-400">代码</span>
                <span className="text-xs text-slate-500">{currentFragment.code.split('\n').length} 行</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <SyntaxHighlighter code={currentFragment.code} />
              </div>
            </div>

            {/* 可视化区 */}
            {currentFragment.visualizationType !== 'none' && (
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <div className="px-4 py-2 bg-slate-700/50 border-b border-slate-700">
                  <span className="text-sm text-slate-400">可视化</span>
                </div>
                <div className="p-4">
                  {renderVisualization(currentFragment)}
                </div>
              </div>
            )}

            {/* 详细解析 */}
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full px-4 py-3 bg-slate-700/50 border-b border-slate-700 flex items-center justify-between hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-300">📖 详细解析</span>
                <span className="text-slate-400">{showExplanation ? '▼' : '▶'}</span>
              </button>
              {showExplanation && (
                <div className="p-4 space-y-4">
                  <p className="text-slate-300 leading-relaxed">{currentFragment.explanation}</p>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">核心要点</h4>
                    <ul className="space-y-1">
                      {currentFragment.keyPoints.map((point, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 面试要点 */}
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => setShowInterviewTips(!showInterviewTips)}
                className="w-full px-4 py-3 bg-slate-700/50 border-b border-slate-700 flex items-center justify-between hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-semibold text-yellow-400">💼 面试常问</span>
                <span className="text-slate-400">{showInterviewTips ? '▼' : '▶'}</span>
              </button>
              {showInterviewTips && (
                <div className="p-4">
                  <ul className="space-y-2">
                    {currentFragment.interviewTips.map((tip, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 动手练习 */}
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => setShowPractice(!showPractice)}
                className="w-full px-4 py-3 bg-slate-700/50 border-b border-slate-700 flex items-center justify-between hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-semibold text-blue-400">✏️ 动手练习</span>
                <span className="text-slate-400">{showPractice ? '▼' : '▶'}</span>
              </button>
              {showPractice && (
                <div className="p-4 space-y-3">
                  {currentFragment.practiceQuestions.map((q, i) => (
                    <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                        className="w-full px-4 py-3 bg-slate-700/30 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                      >
                        <span className="text-sm text-slate-200 font-medium">Q{i + 1}: {q.question}</span>
                        <span className="text-slate-400">{expandedQuestion === i ? '▼' : '▶'}</span>
                      </button>
                      {expandedQuestion === i && (
                        <div className="px-4 py-3 bg-slate-700/20">
                          <p className="text-sm text-green-300">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 底部导航 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <button
                onClick={goToPrev}
                disabled={currentFragmentId === 1}
                className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-200 rounded transition-colors"
              >
                ← {currentFragmentId > 1 ? project.fragments[currentFragmentId - 2].title : '无'}
              </button>
              <button
                onClick={goToNext}
                disabled={currentFragmentId === project.fragments.length}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded transition-colors"
              >
                {currentFragmentId < project.fragments.length ? project.fragments[currentFragmentId].title : '无'} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
