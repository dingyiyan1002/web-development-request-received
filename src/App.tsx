import { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import {
  chapters, questions, getQuestionsByChapter, getChapterById,
  type Question, type Chapter, type Lesson, type QuestionMode
} from './data/lessons';
import { getAllProjects, type Project } from './data/projects';
import { vizMap } from './data/vizData';
import { Visualization } from './components/Visualizations';
import { HighlightedLine } from './components/SyntaxHighlighter';
import { deriveVocabularyFromText, mergeVocabulary } from './data/vocabulary';
import { ReferenceSidebar } from './components/ReferenceSidebar';
import ProjectView from './components/ProjectView';
import { BitSwitchGame } from './components/BitSwitchGame';
import { StructPackerGame } from './components/StructPackerGame';
import { PointerSandbox } from './components/PointerSandbox';
import { CodeRunner } from './components/CodeRunner';
import { StackFrameViz } from './components/StackFrameViz';
import { COWMemoryViz } from './components/COWMemoryViz';
import { CodeAnalyzer } from './components/CodeAnalyzer';
import { DeepUnderstandingPanel } from './components/DeepUnderstandingPanel';
import { EnhancedMemoryViz, generateStepsFromCode } from './components/EnhancedMemoryViz';
import { CodeTypingPractice } from './components/CodeTypingPractice';
import { CodeVisualizer } from './components/visualizer';
import { useSoundEffects, useKeyboardShortcuts } from './hooks/useInteractions';
import { useUserStats, StatsPanel, AchievementsPanel, StreakDisplay } from './components/StatsAndAchievements';
import { loadProgress as loadProgressApi, saveProgress as saveProgressApi, type Progress } from './services/progressApi';
import {
  BookOpen,
  Trophy,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Lightbulb,
  Sparkles,
  Terminal,
  RotateCcw,
  Home,
  Target,
  Flame,
  Award,
  Zap,
  Code2,
  Bug,
  Play,
  GraduationCap,
  Brain,
  AlertTriangle,
  Shuffle, Undo2,
  Sun, Moon,
  FolderOpen,
  Layers,
  Bookmark,
  BookmarkCheck,
  Keyboard
} from 'lucide-react';

function CodeBlock({
  code,
  highlightLine,
}: {
  code: string;
  highlightLine?: number;
}) {
  const [copied, setCopied] = useState(false);

  const rawLines = code.split("\n");
  const parsed = rawLines.map((raw, idx) => {
    const m = raw.match(/^(\d+)\s*\|\s(.*)$/);
    if (m) {
      return {
        num: parseInt(m[1]!, 10),
        text: m[2] ?? "",
      };
    }
    return { num: idx + 1, text: raw };
  });

  const copyText = parsed.map((l) => l.text).join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {
      // ignore
    }
  };

  return (
    <div className="code-block relative">
      <button
        type="button"
        onClick={handleCopy}
        className="code-copy-btn"
        title="复制代码"
      >
        {copied ? "已复制" : "复制"}
      </button>

      <div className="code-grid" role="region" aria-label="代码区">
        {parsed.map((ln, idx) => {
          const isHL = highlightLine != null && ln.num === highlightLine;
          return (
            <div key={idx} className={`code-row ${isHL ? "code-row-highlight" : ""}`}>
              <div className={`code-linenum ${isHL ? "code-linenum-highlight" : ""}`}>
                {ln.num}
              </div>
              <div className="code-content">
                <code className="code-code">
                  <HighlightedLine line={ln.text} />
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Header Component
function Header({
  view,
  setView,
  progress,
  isDarkMode,
  toggleTheme,
  backendAlive
}: {
  view: string;
  setView: (v: string) => void;
  progress: Progress;
  isDarkMode: boolean;
  toggleTheme: () => void;
  backendAlive: boolean;
}) {
  const accuracy = progress.completed.length > 0
    ? Math.round((progress.correct.length / progress.completed.length) * 100)
    : 0;

  return (
    <header className={`sticky top-0 z-50 border-b ${isDarkMode ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 group"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isDarkMode ? 'bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-emerald-500/20' : 'bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-emerald-500/20'}`}>
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-slate-800 group-hover:text-emerald-600'} transition-colors`}>
              C语言思维训练器
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>硬核代码训练</p>
          </div>
          <div className="ml-2 flex items-center gap-1.5" title={backendAlive ? 'GCC 后端已连接' : 'GCC 后端未连接'}>
            <div className={`w-2 h-2 rounded-full ${backendAlive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-xs ${backendAlive ? 'text-green-500' : 'text-red-500'}`}>
              {backendAlive ? 'GCC' : '离线'}
            </span>
          </div>
        </button>

        <nav className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`}
            title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setView('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'home'
                ? 'bg-emerald-500/20 text-emerald-400'
                : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`
            }`}
          >
            <Home className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">首页</span>
          </button>
          <button
            onClick={() => setView('projects')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'projects' || view === 'project'
                ? 'bg-emerald-500/20 text-emerald-400'
                : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span className="hidden sm:inline">项目</span>
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'stats'
                ? 'bg-emerald-500/20 text-emerald-400'
                : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">统计</span>
            {progress.completed.length > 0 && (
              <span className="badge badge-success">{accuracy}%</span>
            )}
          </button>
          <button
            onClick={() => setView('lab')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'lab'
                ? 'bg-purple-500/20 text-purple-400'
                : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">实验室</span>
          </button>
          {/* 动画演示已禁用 */}
          {/*
          <button
            onClick={() => setView('animation')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'animation'
                ? 'bg-amber-500/20 text-amber-400'
                : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`
            }`}
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">动画演示</span>
          </button>
          */}
          <button
            onClick={() => setView('typing')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'typing'
                ? 'bg-cyan-500/20 text-cyan-400'
                : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden sm:inline">跟打练习</span>
          </button>
        </nav>
      </div>
    </header>
  );
}



// Lesson View Component
function LessonView({
  lesson,
  onComplete,
  isDarkMode,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onStartPractice
}: {
  lesson: Lesson;
  onComplete: () => void;
  isDarkMode: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onStartPractice?: () => void;
}) {
  const renderContent = (content: string) => {
    const parts = content.split(/(```c[\s\S]*?```|\*\*.*?\*\*)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('```c')) {
        const code = part.replace(/```c\n?/, '').replace(/```$/, '');
        return <CodeBlock key={idx} code={code.trim()} />;
      } else if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-emerald-400">{part.slice(2, -2)}</strong>;
      } else {
        return <span key={idx} className="whitespace-pre-wrap">{part}</span>;
      }
    });
  };

  return (
    <div className="animate-fadeIn">
      <div className={`glass rounded-2xl p-6 sm:p-8 ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>知识讲解</p>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{lesson.title}</h2>
          </div>
        </div>

        <div className={`prose prose-invert max-w-none leading-relaxed mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {renderContent(lesson.content)}
        </div>

        <div className={`bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mb-6 ${isDarkMode ? '' : 'bg-emerald-50'}`}>
          <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            关键要点
          </h3>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, idx) => (
              <li key={idx} className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onStartPractice || onComplete}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:scale-[1.02]"
          >
            <Play className="w-5 h-5" />
            开始练习
          </button>
        </div>

        {/* 上一页/下一页导航 */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all ${isDarkMode ? 'glass text-slate-300 hover:bg-slate-800' : 'bg-white/60 border border-slate-200 text-slate-600 hover:bg-white/80'}`}
          >
            <ChevronLeft className="w-4 h-4" />
            上一页
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all ${isDarkMode ? 'glass text-slate-300 hover:bg-slate-800' : 'bg-white/60 border border-slate-200 text-slate-600 hover:bg-white/80'}`}
          >
            下一页
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Order Type Question Component
function OrderQuestion({
  question,
  onAnswer,
  showResult,
  isCorrect,
  isDarkMode
}: {
  question: Question;
  onAnswer: (answers: string[], correct: boolean) => void;
  showResult: boolean;
  isCorrect: boolean;
  isDarkMode: boolean;
}) {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const lines = question.codeLines || [];
  const correctOrder = question.correctOrder || [];

  useEffect(() => {
    setSelectedOrder([]);
  }, [question.id]);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    if (selectedOrder.includes(idx)) return;
    setSelectedOrder([...selectedOrder, idx]);
  };

  const handleUndo = () => {
    if (showResult) return;
    setSelectedOrder(selectedOrder.slice(0, -1));
  };

  const handleReset = () => {
    if (showResult) return;
    setSelectedOrder([]);
  };

  const handleSubmit = () => {
    if (showResult) return;
    const correct = JSON.stringify(selectedOrder) === JSON.stringify(correctOrder);
    onAnswer(selectedOrder.map(String), correct);
  };

  const availableLines = lines.map((_, i) => i).filter(i => !selectedOrder.includes(i));

  return (
    <div className="space-y-4">
      {/* Selected lines (built program) */}
      <div className="order-result-area">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            你组装的程序 ({selectedOrder.length}/{lines.length})
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              disabled={selectedOrder.length === 0 || showResult}
              className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400 hover:text-white disabled:opacity-30 transition-all flex items-center gap-1"
            >
              <Undo2 className="w-3 h-3" /> 撤销
            </button>
            <button
              onClick={handleReset}
              disabled={selectedOrder.length === 0 || showResult}
              className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400 hover:text-white disabled:opacity-30 transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> 重置
            </button>
          </div>
        </div>
        <div className="code-block min-h-[120px]">
          <pre>
            {selectedOrder.length === 0 ? (
              <code className="text-slate-600 italic">👆 点击下方代码行，按正确顺序组装程序</code>
            ) : (
              selectedOrder.map((lineIdx, i) => {
                const isWrong = showResult && correctOrder[i] !== lineIdx;
                const isRight = showResult && correctOrder[i] === lineIdx;
                return (
                  <div key={i} className={`flex items-center gap-2 ${isWrong ? 'bg-red-500/10 -mx-4 px-4 rounded' : ''} ${isRight ? 'bg-emerald-500/10 -mx-4 px-4 rounded' : ''}`}>
                    <span className={`text-xs font-mono w-5 ${isRight ? 'text-emerald-400' : isWrong ? 'text-red-400' : 'text-slate-600'}`}>{i + 1}</span>
                    <code className={`${isWrong ? 'text-red-300' : isRight ? 'text-emerald-300' : ''}`}>{lines[lineIdx]}</code>
                    {isRight && <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                    {isWrong && <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />}
                  </div>
                );
              })
            )}
          </pre>
        </div>
      </div>

      {/* Available lines */}
      {!showResult && (
        <div>
          <span className="text-sm text-slate-500 mb-2 block flex items-center gap-2">
            <Shuffle className="w-4 h-4" />
            可选代码行（点击选择）
          </span>
          <div className="space-y-2">
            {availableLines.map(idx => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="order-line-btn"
              >
                <code className="font-mono text-sm">{lines[idx]}</code>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show correct answer if wrong */}
      {showResult && !isCorrect && (
        <div className="mt-4">
          <span className="text-sm text-emerald-400 mb-2 block">✅ 正确顺序：</span>
          <div className="code-block">
            <pre>
              {correctOrder.map((lineIdx, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400/50 w-5">{i + 1}</span>
                  <code className="text-emerald-300">{lines[lineIdx]}</code>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {/* Show program execution result if correct */}
      {showResult && isCorrect && question.correctOutput && (
        <div className="mt-4">
          <span className="text-sm text-emerald-400 mb-2 block flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            程序运行结果：
          </span>
          <div className={`rounded-lg p-4 font-mono text-sm border ${isDarkMode ? 'bg-slate-800 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
            <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
              <span>$ gcc program.c -o program</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
              <span>$ ./program</span>
            </div>
            <div className="text-lg font-semibold">{question.correctOutput}</div>
          </div>
        </div>
      )}

      {/* Submit */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selectedOrder.length !== lines.length}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-5 h-5" />
          提交排列
        </button>
      )}
    </div>
  );
}

// Question Component
function QuestionView({
  question,
  onAnswer,
  showResult,
  isCorrect,
  userAnswers,
  isDarkMode,
  isBookmarked,
  onToggleBookmark,
  onNext,
  onPrev
}: {
  question: Question;
  onAnswer: (answers: string[], correct: boolean) => void;
  showResult: boolean;
  isCorrect: boolean;
  userAnswers: string[];
  isDarkMode: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const [inputs, setInputs] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showVizModal, setShowVizModal] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
  const soundPlayedRef = useRef(false);
  
  const { playCorrect, playWrong, playClick } = useSoundEffects();
  const { stats, recordAnswer } = useUserStats();

  useEffect(() => {
    if (question.type === 'fill' || question.type === 'multi-fill') {
      setInputs(new Array(question.blanks?.length || 0).fill(''));
    } else if (question.type === 'output') {
      setInputs(['']);
    } else if (question.type === 'debug') {
      setInputs(['']);
    } else if (question.type === 'choice' || question.type === 'multi-choice') {
      setInputs(['']);
    }
    setShowHint(false);
    soundPlayedRef.current = false;
  }, [question]);

  useEffect(() => {
    if (showResult) {
      setInputs(userAnswers);
    }
  }, [showResult, userAnswers, question.type]);

  useEffect(() => {
    if (showResult && !soundPlayedRef.current) {
      soundPlayedRef.current = true;
      if (isCorrect) {
        playCorrect();
        recordAnswer(true, question.chapter);
      } else {
        playWrong();
        recordAnswer(false, question.chapter);
      }
    }
  }, [showResult, isCorrect, playCorrect, playWrong, recordAnswer, question.chapter]);

  useKeyboardShortcuts({
    onSubmit: () => {
      if (!showResult) {
        handleSubmit();
      }
    },
    onNext: () => {
      if (showResult && onNext) {
        playClick();
        onNext();
      }
    },
    onPrev: () => {
      if (onPrev) {
        playClick();
        onPrev();
      }
    },
    onHint: () => {
      if (!showResult) {
        setShowHint(h => !h);
      }
    }
  });

  const handleSubmit = useCallback(() => {
    if (showResult) return;

    let correct = false;

    // 规范化用户输入：将中文符号转换为英文符号
    const normalizeInput = (input: string) => {
      return input
        .replace(/≠/g, '!=')   // 不等于符号
        .replace(/≤/g, '<=')   // 小于等于
        .replace(/≥/g, '>=')   // 大于等于
        .replace(/×/g, '*')    // 乘号
        .replace(/÷/g, '/')    // 除号
        .replace(/，/g, ',')   // 中文逗号
        .replace(/。/g, '.')   // 中文句号
        .replace(/；/g, ';')   // 中文分号
        .replace(/（/g, '(')   // 中文左括号
        .replace(/）/g, ')')   // 中文右括号
        .replace(/【/g, '[')   // 中文左方括号
        .replace(/】/g, ']')   // 中文右方括号
        .replace(/｛/g, '{')   // 中文左花括号
        .replace(/｝/g, '}');  // 中文右花括号
    };

    if (question.type === 'fill' || question.type === 'multi-fill') {
      correct = inputs.every((input, idx) => {
        const blank = question.blanks?.[idx];
        if (!blank) return false;
        const answers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
        const userInput = normalizeInput(input.trim());
        return answers.some(ans => 
          blank.caseSensitive === false 
            ? ans.toLowerCase() === userInput.toLowerCase()
            : ans === userInput
        );
      });
    } else if (question.type === 'output') {
      const userOutput = inputs[0].trim();
      const expected = question.correctOutput?.trim() || '';
      const normalizeOutput = (s: string) => {
        return s
          .replace(/\r\n/g, '\n')
          .replace(/\s+$/gm, '')
          .replace(/\n+/g, '\n')
          .trim();
      };
      correct = normalizeOutput(userOutput) === normalizeOutput(expected);
    } else if (question.type === 'debug') {
      const userLine = parseInt(inputs[0]);
      correct = userLine === question.bugLine;
    } else if (question.type === 'choice' || question.type === 'multi-choice') {
      const userAnswer = inputs[0].trim().toUpperCase();
      const correctAnswer = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer.map(a => a.toUpperCase())
        : question.correctAnswer?.toUpperCase();
      
      if (question.multiCorrect) {
        const userAnswers = userAnswer.split(',').map(s => s.trim()).sort();
        const correctAnswers = (Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]).sort();
        correct = userAnswers.length === correctAnswers.length && 
                  userAnswers.every((a, i) => a === correctAnswers[i]);
      } else {
        correct = userAnswer === correctAnswer;
      }
    }

    onAnswer(inputs, correct);
  }, [showResult, inputs, question, onAnswer]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    // Tab键：在输出预测题中允许输入\t，其他题切换到下一个输入框
    if (e.key === 'Tab') {
      if (question.type === 'output') {
        // 输出预测题：插入Tab字符而不是切换焦点
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const newValue = inputs[idx].substring(0, start) + '\t' + inputs[idx].substring(end);
        const newInputs = [...inputs];
        newInputs[idx] = newValue;
        setInputs(newInputs);
        // 设置光标位置在插入的Tab之后
        setTimeout(() => {
          input.selectionStart = input.selectionEnd = start + 1;
        }, 0);
      } else {
        // 其他题型：Tab切换到下一个输入框
        e.preventDefault();
        if (idx < inputs.length - 1) {
          inputRefs.current[idx + 1]?.focus();
        }
      }
      return;
    }
    
    // Enter键：提交或切换到下一个
    if (e.key === 'Enter' && !e.shiftKey) {
      if (question.type !== 'output') {
        e.preventDefault();
        if (idx < inputs.length - 1) {
          inputRefs.current[idx + 1]?.focus();
        } else {
          handleSubmit();
        }
      }
    }
  };

  const getGenericHint = (type: string): string => {
    const hints: Record<string, string> = {
      fill: '仔细阅读代码，思考空白处应该填入什么关键字或语法。注意C语言的语法规则和命名规范。',
      'multi-fill': '逐个分析每个空白处，注意变量类型、关键字拼写和语法结构。',
      output: '像编译器一样执行代码：跟踪每个变量的值变化，注意printf的格式符和输出顺序。',
      debug: '检查常见错误：缺少分号、括号不匹配、变量未初始化、类型不匹配、数组越界等。',
      order: '思考程序的执行顺序：头文件 → 宏定义 → 全局变量 → main函数 → 函数定义。'
    };
    return hints[type] || '仔细阅读题目，理解代码逻辑后再作答。';
  };

  const renderTypeIcon = () => {
    switch (question.type) {
      case 'fill': 
      case 'multi-fill':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'output':
        return <Terminal className="w-5 h-5 text-green-400" />;
      case 'debug':
        return <Bug className="w-5 h-5 text-red-400" />;
      case 'order':
        return <Shuffle className="w-5 h-5 text-amber-400" />;
      case 'choice':
      case 'multi-choice':
        return <CheckCircle className="w-5 h-5 text-cyan-400" />;
      default:
        return <Brain className="w-5 h-5 text-purple-400" />;
    }
  };

  const renderTypeBadge = () => {
    const badges: Record<string, { label: string; color: string }> = {
      fill: { label: '代码填空', color: 'badge-info' },
      'multi-fill': { label: '代码填空', color: 'badge-info' },
      output: { label: '输出预测', color: 'badge-success' },
      debug: { label: 'Debug找错', color: 'badge-error' },
      order: { label: '代码排序', color: 'badge-warning' },
      choice: { label: '选择题', color: 'badge-info' },
      'multi-choice': { label: '多选题', color: 'badge-warning' }
    };
    const badge = badges[question.type] || { label: '练习', color: 'badge-info' };
    return <span className={`badge ${badge.color}`}>{badge.label}</span>;
  };

  const renderQuestion = () => {
    // Choice type - render as multiple choice with clickable options
    if (question.type === 'choice' || question.type === 'multi-choice') {
      return (
        <div className="space-y-4">
          {question.code && (
            <div className="code-block mb-4">
              <pre className="whitespace-pre-wrap text-sm">{question.code}</pre>
            </div>
          )}
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isSelected = inputs[0]?.toUpperCase() === option.id.toUpperCase();
              const showCorrect = showResult && (question.type === 'choice' 
                ? option.id.toUpperCase() === (question.correctAnswer as string)?.toUpperCase()
                : (question.correctAnswer as string[])?.map(a => a.toUpperCase()).includes(option.id.toUpperCase())
              );
              const showWrong = showResult && isSelected && !showCorrect;
              
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    const selectedAnswer = option.id.toUpperCase();
                    const correctAnswer = question.correctAnswer?.toString().toUpperCase() || '';
                    const isAnswerCorrect = selectedAnswer === correctAnswer;
                    setInputs([option.id]);
                    onAnswer([option.id], isAnswerCorrect);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    showCorrect 
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : showWrong
                        ? 'border-red-500 bg-red-500/20 text-red-300'
                        : isSelected
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                          : isDarkMode
                            ? 'border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/10'
                            : 'border-slate-300 hover:border-cyan-500 hover:bg-cyan-50'
                  }`}
                >
                  <span className="font-mono font-bold mr-3">{option.id}.</span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
              <p className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                {isCorrect ? '✅ 回答正确！' : `❌ 正确答案: ${question.correctAnswer}`}
              </p>
            </div>
          )}
        </div>
      );
    }

    // Order type is handled separately
    if (question.type === 'order') {
      return (
        <OrderQuestion
          question={question}
          onAnswer={onAnswer}
          showResult={showResult}
          isCorrect={isCorrect}
          isDarkMode={isDarkMode}
        />
      );
    }

    if (question.type === 'fill' || question.type === 'multi-fill') {
      const codeWithBlanks = question.code || '';
      const parts = codeWithBlanks.split(/(___①|___②|___③)/g);
      let blankIdx = 0;

      return (
        <div className="code-block">
          <pre className="whitespace-pre-wrap">
            {parts.map((part, idx) => {
              if (part.match(/___[①②③]/)) {
                const currentBlankIdx = blankIdx++;
                const blank = question.blanks?.[currentBlankIdx];
                const isThisCorrect = showResult && (() => {
                  if (!blank) return false;
                  const answers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
                  return answers.some(ans => 
                    blank.caseSensitive === false 
                      ? ans.toLowerCase() === inputs[currentBlankIdx]?.trim().toLowerCase()
                      : ans === inputs[currentBlankIdx]?.trim()
                  );
                })();
                const isThisWrong = showResult && !isThisCorrect;

                return (
                  <span key={idx} className="inline-block mx-1 align-middle">
                    <input
                      ref={(el) => { inputRefs.current[currentBlankIdx] = el; }}
                      type="text"
                      value={inputs[currentBlankIdx] || ''}
                      onChange={(e) => {
                        const newInputs = [...inputs];
                        newInputs[currentBlankIdx] = e.target.value;
                        setInputs(newInputs);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, currentBlankIdx)}
                      placeholder={showHint ? blank?.hint : '___'}
                      disabled={showResult}
                      className={`inline-input ${isThisCorrect ? 'correct' : ''} ${isThisWrong ? 'wrong' : ''}`}
                      style={{ width: `${Math.max(60, (inputs[currentBlankIdx]?.length || 3) * 12)}px` }}
                    />
                    {showResult && isThisWrong && blank && (
                      <span className="text-emerald-400 ml-1 text-sm">
                        ({Array.isArray(blank.answer) ? blank.answer[0] : blank.answer})
                      </span>
                    )}
                  </span>
                );
              }
              return <code key={idx}>{part}</code>;
            })}
          </pre>
        </div>
      );
    }

    if (question.type === 'output') {
      return (
        <>
          <CodeBlock code={question.code || ''} />
          <div className="mt-4">
            <label className="block text-sm text-slate-400 mb-2">
              输入程序的输出结果：
            </label>
            <textarea
              ref={(el) => { inputRefs.current[0] = el; }}
              value={inputs[0] || ''}
              onChange={(e) => setInputs([e.target.value])}
              placeholder="在此输入输出结果..."
              disabled={showResult}
              rows={3}
              className={`output-input ${showResult && isCorrect ? 'correct' : ''} ${showResult && !isCorrect ? 'wrong' : ''}`}
            />
            {showResult && !isCorrect && (
              <div className="mt-2 text-sm">
                <span className="text-red-400">你的答案：</span>
                <code className="ml-2 text-red-300">{inputs[0] || '(空)'}</code>
                <br />
                <span className="text-emerald-400">正确答案：</span>
                <code className="ml-2 text-emerald-300 whitespace-pre">{question.correctOutput}</code>
              </div>
            )}
          </div>
        </>
      );
    }

    if (question.type === 'debug') {
      return (
        <>
          <CodeBlock code={question.code || ''} highlightLine={showResult ? question.bugLine : undefined} />
          <div className="mt-4">
            <label className="block text-sm text-slate-400 mb-2">
              <AlertTriangle className="w-4 h-4 inline mr-1 text-red-400" />
              输入有错误的行号：
            </label>
            <input
              ref={(el) => { inputRefs.current[0] = el; }}
              type="number"
              value={inputs[0] || ''}
              onChange={(e) => setInputs([e.target.value])}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              placeholder="行号（如：3）"
              disabled={showResult}
              className={`debug-input ${showResult && isCorrect ? 'correct' : ''} ${showResult && !isCorrect ? 'wrong' : ''}`}
            />
            {showResult && (
              <div className="mt-3 p-3 rounded-lg bg-slate-800/50">
                <p className="text-sm text-slate-400 mb-2">正确修复：</p>
                <CodeBlock code={question.bugFix || ''} />
              </div>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  const getDifficultyStars = () => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={i < question.difficulty ? 'text-yellow-400' : 'text-slate-600'}>★</span>
    ));
  };

  // Render visualization for question
  const renderVisualization = () => {
    if (!question.visualization) return null;
    
    const { type, data } = question.visualization;
    
    if (type === 'memory') {
      return (
        <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <span>🎯</span> {data.title}
          </h4>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.description}
          </p>
          
          {/* Memory blocks visualization */}
          <div className="space-y-2 mb-4">
            {data.memoryBlocks?.map((block: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <span className={`text-xs font-mono w-20 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {block.address}
                </span>
                <div className={`px-3 py-1.5 rounded text-xs font-mono ${
                  block.color === 'blue' ? (isDarkMode ? 'bg-blue-900/50 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700 border border-blue-300') :
                  block.color === 'green' ? (isDarkMode ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-green-100 text-green-700 border border-green-300') :
                  (isDarkMode ? 'bg-slate-700 text-slate-400 border border-slate-600' : 'bg-slate-200 text-slate-600 border border-slate-300')
                }`}>
                  {block.value}
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  → {block.label}
                </span>
              </div>
            ))}
          </div>
          
          {/* Pointer info */}
          {data.pointerInfo && (
            <div className={`p-3 rounded text-xs ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>{data.pointerInfo.from}</span>
                <span className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>───→</span>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>{data.pointerInfo.to}</span>
              </div>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{data.pointerInfo.description}</p>
            </div>
          )}
          
          {data.note && (
            <p className={`mt-3 text-xs italic ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              💡 {data.note}
            </p>
          )}
        </div>
      );
    }
    
    if (type === 'array') {
      return (
        <div className={`mt-4 p-3 rounded-lg border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <span>🎯</span> {data.title}
          </h4>
          
          {/* 紧凑的数组可视化 - 横向排列所有步骤 */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {data.steps?.map((step: any, idx: number) => (
                <div key={idx} className={`flex flex-col items-center p-2 rounded ${isDarkMode ? 'bg-slate-700/30' : 'bg-white'} ${step.i >= step.array?.length - 1 ? 'border border-red-500/30' : ''}`}>
                  {/* 步骤标题 */}
                  <p className={`text-[10px] mb-1 text-center whitespace-nowrap ${step.i >= step.array?.length - 1 ? 'text-red-400' : (isDarkMode ? 'text-slate-400' : 'text-slate-600')}`}>
                    i={step.i}
                  </p>
                  {/* 数组格子 */}
                  <div className="flex gap-0.5">
                    {step.array?.map((char: string, charIdx: number) => (
                      <div
                        key={charIdx}
                        className={`w-10 h-8 flex items-center justify-center text-[10px] font-mono rounded ${
                          charIdx === step.i ? (isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white') :
                          charIdx === step.j ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') :
                          charIdx >= step.array?.length - 1 && char === '危险!' ? (isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white') :
                          (isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600')
                        }`}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                  {/* 状态指示 */}
                  <div className="mt-1 text-[10px]">
                    {step.i >= step.array?.length - 1 ? (
                      <span className="text-red-400">✗ 越界</span>
                    ) : (
                      <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 说明文字 */}
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.description}
          </p>
          
          {data.note && (
            <p className={`mt-2 text-xs italic ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              💡 {data.note}
            </p>
          )}
        </div>
      );
    }
    
    if (type === 'pointer') {
      return (
        <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <span>🎯</span> {data.title}
          </h4>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.description}
          </p>
          
          {/* Pointer steps visualization */}
          <div className="space-y-3">
            {data.steps?.map((step: any, idx: number) => (
              <div key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-slate-700/50' : 'bg-white'}`}>
                <p className={`text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  步骤 {idx + 1}: {step.action}
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className={`p-2 rounded ${isDarkMode ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                    <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>prev</span>
                    <div className="font-mono mt-1">{step.prev}</div>
                  </div>
                  <div className={`p-2 rounded ${isDarkMode ? 'bg-emerald-900/30 border border-emerald-700' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>curr</span>
                    <div className="font-mono mt-1">{step.curr}</div>
                  </div>
                  <div className={`p-2 rounded ${isDarkMode ? 'bg-amber-900/30 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                    <span className={isDarkMode ? 'text-amber-400' : 'text-amber-600'}>next</span>
                    <div className="font-mono mt-1">{step.next}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {data.note && (
            <p className={`mt-3 text-xs italic ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              💡 {data.note}
            </p>
          )}
        </div>
      );
    }

    if (type === 'flow') {
      return (
        <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <span>🎯</span> {data.title}
          </h4>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.description}
          </p>
          
          {/* Flow steps visualization */}
          <div className="space-y-2">
            {data.steps?.map((step: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded text-xs font-mono ${isDarkMode ? 'bg-blue-900/50 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700 border border-blue-300'}`}>
                  {step.from}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-lg ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>→</span>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{step.action}</span>
                </div>
                <div className={`px-3 py-1.5 rounded text-xs font-mono ${isDarkMode ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'}`}>
                  {step.to}
                </div>
              </div>
            ))}
          </div>
          
          {data.note && (
            <p className={`mt-3 text-xs italic ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              💡 {data.note}
            </p>
          )}
        </div>
      );
    }
    
    return null;
  };

  const vizData = vizMap[question.id];

  // ===== Reference Sidebar (always shown) =====
  const chapterName = getChapterById(question.chapter)?.name ?? '当前章节';
  const modeLabelMap: Record<Question['type'], string> = {
    fill: '代码填空（手打关键字）',
    'multi-fill': '代码填空（多处手打）',
    output: '输出预测（像编译器一样心算）',
    debug: 'Debug找错（定位错误行号）',
    order: '代码排序（搭建程序骨架）',
    choice: '选择题（基础知识测试）',
    'multi-choice': '多选题（多个正确答案）'
  };
  const modeLabel = modeLabelMap[question.type] ?? '练习';

  const baseText = [
    question.title,
    question.description ?? '',
    question.code ?? '',
    question.bugFix ?? '',
    question.codeLines?.join('\n') ?? '',
    question.correctOutput ?? ''
  ].join('\n');

  const derived = deriveVocabularyFromText(baseText, 14);
  const mergedVocabulary = mergeVocabulary(question.vocabulary, derived);

  // focus points & mistakes
  const focusPoints: string[] = [chapterName];
  if (question.type === 'fill' || question.type === 'multi-fill') focusPoints.push('拼写与语法肌肉记忆');
  if (question.type === 'output') focusPoints.push('执行顺序/输出细节');
  if (question.type === 'debug') focusPoints.push('定位错误行');
  if (question.type === 'order') focusPoints.push('程序结构骨架');

  const mistakes: string[] = [];
  if (question.type === 'fill' || question.type === 'multi-fill') {
    mistakes.push('只输入空格对应的关键字/符号，不要把整行抄进去。');
    mistakes.push('注意大小写与多余空格（除非题目提示不区分大小写）。');
  }
  if (question.type === 'output') {
    mistakes.push('输出要“完全一致”：空格、换行都算。多行输出请按实际换行输入。');
  }
  if (question.type === 'debug') {
    mistakes.push('输入左侧行号栏的数字（不是代码里的数字）。');
  }
  if (baseText.includes('scanf')) {
    mistakes.push('scanf 读取变量时常常漏写 & 取地址符。');
  }
  if (baseText.includes('==') || baseText.includes(' = ')) {
    mistakes.push('注意：== 是“比较”，= 是“赋值”。');
  }
  if (baseText.includes('\\n')) {
    mistakes.push('含 \\n 时：输出会换行，答案中也要体现换行。');
  }

  const tips: string[] = [];
  if (question.type === 'fill' || question.type === 'multi-fill') {
    tips.push('目标：把缺失的关键字/符号“敲出来”。这会强迫你记住正确拼写。');
    tips.push('如果一时想不起来，可以先点“显示提示”，但提交前建议自己再默写一遍。');
  }
  if (question.type === 'output') {
    tips.push('像人脑编译器一样：按顺序执行每一行，跟踪变量变化，再写出最终输出。');
    tips.push('建议先在脑中/纸上画一个小表格：变量名 → 当前值。');
  }
  if (question.type === 'debug') {
    tips.push('先看编译器最在意的：缺分号、括号不配对、格式符与类型不匹配、scanf漏& 等。');
    tips.push('本题只需输入“最关键的错误行号”。');
  }
  if (question.type === 'order') {
    tips.push('先找骨架：#include → main → 声明变量 → 逻辑/循环 → printf → return → }');
  }

  return (
    <div className="animate-fadeIn grid gap-6 lg:grid-cols-12">
      {/* Reference Sidebar */}
      <div className="lg:col-span-4 order-1">
        <ReferenceSidebar
          modeLabel={modeLabel}
          focusPoints={focusPoints}
          mistakes={mistakes}
          vocabulary={mergedVocabulary}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Main Question Area */}
      <div className="space-y-4 lg:col-span-8 order-2">
        <div className={`glass rounded-2xl p-6 sm:p-8 ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
          {/* Question Header */}
          <div className="flex items-start gap-3 mb-6">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-slate-100'}`}>
              {renderTypeIcon()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {renderTypeBadge()}
                <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>难度: {getDifficultyStars()}</span>
              </div>
              <h3 className={`text-lg sm:text-xl font-medium leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {question.title}
              </h3>
              {question.description && (
                <p className={isDarkMode ? 'text-slate-400 text-sm mt-1' : 'text-slate-500 text-sm mt-1'}>{question.description}</p>
              )}
            </div>
            {/* Bookmark Button */}
            <button
              onClick={onToggleBookmark}
              className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                isBookmarked
                  ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                  : isDarkMode
                    ? 'bg-slate-700/50 text-slate-400 hover:text-yellow-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-400 hover:text-yellow-500 hover:bg-slate-200'
              }`}
              title={isBookmarked ? '取消收藏' : '收藏此题'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>

          {/* Visualization (if available, shown before the question) */}
          {vizData && (
            <div className="mb-6">
              <Visualization data={vizData} />
            </div>
          )}

          {/* Question-specific visualization (for beginners) */}
          {question.visualization && (
            <div className="mb-6">
              {renderVisualization()}
            </div>
          )}

          {/* Question Content */}
          <div className="mb-6">
            {renderQuestion()}
          </div>

          {/* Hint Toggle (for all question types before submission) */}
          {!showResult && (
            <div className="mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className={`text-sm flex items-center gap-1 mb-2 transition-colors ${isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'}`}
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? '隐藏提示' : '💡 显示提示'}
                </button>
                {/* 动画演示按钮 - 仅针对有可视化的题目 */}
                {question.visualization && (
                  <button
                    onClick={() => setShowVizModal(true)}
                    className={`text-sm flex items-center gap-1 mb-2 transition-colors ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
                  >
                    <Play className="w-4 h-4" />
                    🎬 动画演示
                  </button>
                )}
              </div>
              {showHint && (
                <div className={`p-3 rounded-lg border animate-fadeIn ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                  <p className="text-sm">{question.hint || getGenericHint(question.type)}</p>
                </div>
              )}
            </div>
          )}

          {/* Submit Button (not for order type, it has its own) */}
          {!showResult && question.type !== 'order' && question.type !== 'choice' && question.type !== 'multi-choice' && (
            <button
              onClick={handleSubmit}
              disabled={question.type !== 'output' && inputs.every(i => !i.trim())}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5" />
              提交答案
            </button>
          )}

          {/* Result */}
          {showResult && (
            <div className="animate-fadeIn space-y-4">
              <div className={`rounded-xl p-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-400 font-medium">✨ 完全正确！</p>
                        <p className="text-sm text-emerald-400/70">你的代码思维很棒！</p>
                      </div>
                      <StreakDisplay currentStreak={stats.currentStreak} isDarkMode={isDarkMode} />
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-red-400 font-medium">还需要再想想</p>
                        <p className="text-sm text-red-400/70">看看解析，理解错误原因</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Explanation */}
              <div className={`rounded-xl bg-blue-500/5 border border-blue-500/10 p-4 ${isDarkMode ? '' : 'bg-blue-50'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">详细解析</span>
                </div>
                <p className={`leading-relaxed whitespace-pre-line ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {question.explanation}
                </p>
              </div>

              {/* Code Analyzer - 代码逐行解析和内存可视化 */}
              {question.code && (
                <>
                  {/* 增强版内存可视化 - 步骤状态（优先显示） */}
                  <EnhancedMemoryViz 
                    steps={generateStepsFromCode(question.code)} 
                    isDarkMode={isDarkMode}
                  />
                  
                  {/* 原始代码分析器 */}
                  {question.lineAnalysis && question.lineAnalysis.length > 0 && (
                    <CodeAnalyzer
                      code={question.code}
                      lines={question.lineAnalysis}
                      memoryCells={question.memoryViz?.cells || []}
                      knowledgePoints={question.knowledgePoints || []}
                      hint={question.hint}
                      showAnalysis={true}
                    />
                  )}
                </>
              )}

              {/* Knowledge Points & Common Mistakes */}
              {(question.knowledgePoints?.length || question.commonMistakes?.length || question.relatedConcepts?.length) ? (
                <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-slate-50 border border-slate-200'}`}>
                  {/* Knowledge Points */}
                  {question.knowledgePoints && question.knowledgePoints.length > 0 && (
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>📚 知识点</h4>
                      <div className="flex flex-wrap gap-2">
                        {question.knowledgePoints.map((point, idx) => (
                          <span key={idx} className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {question.commonMistakes && question.commonMistakes.length > 0 && (
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>⚠️ 常见错误</h4>
                      <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {question.commonMistakes.map((mistake, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Related Concepts */}
                  {question.relatedConcepts && question.relatedConcepts.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>🔗 相关概念</h4>
                      <div className="flex flex-wrap gap-2">
                        {question.relatedConcepts.map((concept, idx) => (
                          <span key={idx} className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Deep Understanding Panel - 深入理解面板 */}
              <DeepUnderstandingPanel
                question={question}
                isCorrect={isCorrect}
                userAnswers={userAnswers}
                isDarkMode={isDarkMode}
              />
            </div>
          )}
        </div>
      </div>

      {/* HTML Visualization Modal */}
      {showVizModal && question.visualization?.type === 'html' && (
        <HTMLVizModal
          file={question.visualization?.file || ''}
          onClose={() => setShowVizModal(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Code Visualizer Modal - 已禁用 */}
      {/*
      {showVizModal && (() => {
        const qid = typeof question.id === 'string' ? parseInt(question.id, 10) : question.id;
        const isRealExam = typeof qid === 'number' && qid >= 9001 && qid <= 9407;
        const isSupportedPractice = [2003, 1010, 1011, 1057, 1058, 1017, 1018, 1025, 1026, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10012].includes(qid as number);
        return isRealExam || isSupportedPractice;
      })() && (
        <CodeVisualizer
          questionId={String(qid)}
          onClose={() => setShowVizModal(false)}
        />
      )}
      */}
    </div>
  );
}

// HTML Visualization Modal Component - 处理 iframe 全屏
function HTMLVizModal({
  file,
  onClose,
  isDarkMode
}: {
  file: string;
  onClose: () => void;
  isDarkMode: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 处理来自 iframe 的全屏请求
      if (event.data?.type === 'viz-fullscreen-request') {
        const container = containerRef.current;
        if (!container) return;

        if (event.data.action === 'enter') {
          // 进入全屏
          if (container.requestFullscreen) {
            container.requestFullscreen().then(() => {
              setIsFullscreen(true);
            }).catch(err => {
              console.error('Fullscreen error:', err);
            });
          }
        } else if (event.data.action === 'exit') {
          // 退出全屏
          if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
              setIsFullscreen(false);
            }).catch(err => {
              console.error('Exit fullscreen error:', err);
            });
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 监听全屏变化事件
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      // 通知 iframe 全屏状态变化
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'viz-fullscreen-change',
          isFullscreen: isCurrentlyFullscreen
        }, '*');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
    >
      <div className={`relative w-full max-w-[95vw] h-[95vh] sm:max-w-[98vw] sm:h-[98vh] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${isFullscreen ? 'max-w-none h-screen rounded-none' : ''} ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
        >
          <X className="w-5 h-5" />
        </button>
        <iframe
          ref={iframeRef}
          src={file}
          className="w-full h-full border-0"
          title="Visualization"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}

// LabQuestionView - 实验室题目详情页（完整答题功能）
function LabQuestionView({
  question,
  isDarkMode,
  onBack,
  onShowViz,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}: {
  question: any;
  isDarkMode: boolean;
  onBack: () => void;
  onShowViz: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex: number;
  totalCount: number;
}) {
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 切换题目时重置状态
  useEffect(() => {
    setInput('');
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
  }, [question.id]);

  const handleSubmit = () => {
    const normalizedInput = input.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const normalizedCorrect = question.correctOutput.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const correct = normalizedInput === normalizedCorrect;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleReset = () => {
    setInput('');
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isDarkMode
              ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          返回题目列表
        </button>
        
        {/* 题目进度指示器 */}
        <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          题目 {currentIndex + 1} / {totalCount}
        </div>
      </div>

      {/* 题目头部 */}
      <div className="flex items-start gap-3 mb-6">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
          isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
        }`}>
          <Terminal className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="badge badge-success">输出预测</span>
          </div>
          <h3 className={`text-lg sm:text-xl font-medium leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {question.title}
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {question.description}
          </p>
        </div>
      </div>

      {/* 代码块 */}
      <div className="mb-6">
        <div className={`rounded-lg p-4 font-mono text-sm overflow-x-auto ${
          isDarkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-800'
        }`}>
          <pre>{question.code}</pre>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="mb-4">
        <label className={`block text-sm mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          输入程序的输出结果：
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={showResult}
          placeholder="在此输入输出结果..."
          rows={3}
          className={`w-full px-4 py-3 rounded-lg font-mono text-sm resize-none transition-all ${
            isDarkMode
              ? 'bg-slate-900 border-slate-700 text-slate-200 placeholder-slate-600 focus:border-emerald-500'
              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
          } border-2 focus:outline-none disabled:opacity-50`}
        />
      </div>

      {/* 提示按钮 */}
      {!showResult && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className={`text-sm flex items-center gap-1 mb-2 transition-colors ${
              isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? '隐藏提示' : '💡 显示提示'}
          </button>
          {showHint && (
            <div className={`p-3 rounded-lg border animate-fadeIn ${
              isDarkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* 结果显示 */}
      {showResult && (
        <div className={`rounded-xl p-4 mb-4 ${
          isCorrect 
            ? 'bg-emerald-500/10 border border-emerald-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-emerald-400">回答正确！</div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {question.explanation}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-red-400">回答错误</div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    正确答案是：{question.correctOutput}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 按钮组 */}
      <div className="flex flex-wrap gap-3">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-5 h-5" />
            提交答案
          </button>
        ) : (
          <button
            onClick={handleReset}
            className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
            重新答题
          </button>
        )}
        
        <button
          onClick={onShowViz}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isDarkMode
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30'
          }`}
        >
          <Play className="w-5 h-5" />
          🎬 动画演示
        </button>
      </div>

      {/* 上一题/下一题导航 */}
      <div className="flex justify-between mt-6 pt-4 border-t border-slate-700/30">
        <button
          onClick={onPrev}
          disabled={!onPrev}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            onPrev
              ? (isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700')
              : 'opacity-50 cursor-not-allowed text-slate-500'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          上一题
        </button>
        
        <button
          onClick={onNext}
          disabled={!onNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            onNext
              ? (isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700')
              : 'opacity-50 cursor-not-allowed text-slate-500'
          }`}
        >
          下一题
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Lab View - 互动实验室
function LabView({
  onBack,
  isDarkMode
}: {
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'bits' | 'struct' | 'pointer' | 'stack' | 'cow' | 'runner' | 'animation'>('pointer');
  const [selectedVizDemo, setSelectedVizDemo] = useState<string | null>(null);
  const [selectedVizQuestionIndex, setSelectedVizQuestionIndex] = useState<number | null>(null);

  // 实验室动画演示题目列表
  const vizQuestions = [
    {
      id: 2003,
      title: 'uint8_t 计数器溢出',
      description: '计数器溢出回绕',
      code: `#include <stdio.h>\n#include <stdint.h>\n\nint main(void)\n{\n    uint8_t rx_count = 0;\n    uint8_t packet_seq = 254;\n\n    for (uint8_t i = 0; i < 3; i++) {\n        rx_count++;\n        packet_seq++;\n    }\n\n    printf("rx_count: %u\\n", rx_count);\n    printf("packet_seq: %u\\n", packet_seq);\n\n    return 0;\n}`,
      correctOutput: 'rx_count: 3\npacket_seq: 1',
      explanation: 'uint8_t范围0~255，255+1溢出回绕到0。packet_seq: 254→255→0→1。协议包序号常用uint8_t循环。',
      vizId: 'uint8-overflow'
    },
    {
      id: 2004,
      title: '指针基础-声明与初始化',
      description: '指针变量声明和基本操作',
      code: `#include <stdio.h>\n#include <stdint.h>\n\nint main(void)\n{\n    uint8_t value = 100;\n    uint8_t *ptr = &value;\n    \n    printf("value = %u\\n", value);\n    printf("*ptr = %u\\n", *ptr);\n    printf("&value = %p\\n", (void*)&value);\n    printf("ptr = %p\\n", (void*)ptr);\n    \n    return 0;\n}`,
      correctOutput: 'value = 100\n*ptr = 100',
      explanation: 'ptr存储value的地址，*ptr解引用得到value的值。&value和ptr的值相同，都指向value的内存地址。',
      vizId: 'pointer-basic'
    },
    {
      id: 3005,
      title: '指针运算-不同类型',
      description: 'uint8_t/uint16_t/uint32_t指针步长对比',
      code: `#include <stdio.h>\n#include <stdint.h>\n\nint main(void)\n{\n    uint8_t arr8[4] = {1, 2, 3, 4};\n    uint16_t arr16[4] = {100, 200, 300, 400};\n    uint32_t arr32[4] = {1000, 2000, 3000, 4000};\n\n    uint8_t *p8 = arr8;\n    uint16_t *p16 = arr16;\n    uint32_t *p32 = arr32;\n\n    printf("uint8_t: %u, %u\\n", *p8, *(p8+1));\n    printf("uint16_t: %u, %u\\n", *p16, *(p16+1));\n    printf("uint32_t: %u, %u\\n", *p32, *(p32+1));\n\n    return 0;\n}`,
      correctOutput: 'uint8_t: 1, 2\nuint16_t: 100, 200\nuint32_t: 1000, 2000',
      explanation: '指针+1移动的字节数取决于类型大小。uint8_t*移动1字节，uint16_t*移动2字节，uint32_t*移动4字节。',
      vizId: 'pointer-types'
    },
    {
      id: 1050,
      title: '带参宏的陷阱',
      description: '宏的副作用 - 难度 ★★★',
      code: `#include <stdio.h>\n#include <stdint.h>\n\n#define SQUARE(x)  ((x) * (x))\n\nint main(void)\n{\n    uint8_t a = 5;\n    printf("SQUARE(%u) = %u\\n", a, SQUARE(a));\n\n    uint8_t b = 3;\n    printf("SQUARE(%u++) = %u\\n", b, SQUARE(b++));\n    printf("b after = %u\\n", b);\n\n    return 0;\n}`,
      correctOutput: 'SQUARE(5) = 25\nSQUARE(3++) = 12\nb after = 5',
      explanation: 'SQUARE(b++)展开为((b++)*(b++))，b++执行两次，结果是未定义行为。宏是文本替换，参数有副作用时要小心。',
      vizId: 'macro-side-effect'
    },
    {
      id: 247,
      title: '创建线程',
      description: 'pthread_create 和 pthread_join 演示',
      code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>

void *thread_func(void *arg)
{
    uint8_t *value = (uint8_t*)arg;
    printf("Thread received: %u\\n", *value);
    return NULL;
}

int main(void)
{
    pthread_t thread;
    uint8_t data = 42;

    pthread_create(&thread, NULL, thread_func, &data);
    pthread_join(thread, NULL);

    printf("Thread completed\\n");
    return 0;
}`,
      correctOutput: 'Thread received: 42\nThread completed',
      explanation: 'pthread_create创建线程，参数：(线程ID, 属性, 函数, 参数)。pthread_join等待线程结束。',
      vizId: 'pthread-create'
    }
  ];

  const tabs = [
    { id: 'pointer', label: '🎯 指针与内存', color: 'emerald' },
    { id: 'stack', label: '📚 函数栈帧', color: 'blue' },
    { id: 'cow', label: '🔄 COW机制', color: 'amber' },
    { id: 'bits', label: '🔌 位运算', color: 'purple' },
    { id: 'struct', label: '📦 内存对齐', color: 'indigo' },
    { id: 'runner', label: '⚡ 代码运行', color: 'cyan' },
    { id: 'animation', label: '🎬 动画演示', color: 'pink' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* 头部 */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isDarkMode
              ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
              : 'bg-white hover:bg-slate-50 text-slate-600 shadow-sm'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          返回
        </button>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          🧪 互动实验室
        </h2>
      </div>

      {/* 标签切换 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const activeClass = isActive ? ({
            pointer: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30',
            stack: 'bg-blue-600 text-white shadow-lg shadow-blue-500/30',
            cow: 'bg-amber-600 text-white shadow-lg shadow-amber-500/30',
            bits: 'bg-purple-600 text-white shadow-lg shadow-purple-500/30',
            struct: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30',
            animation: 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
          }[tab.id] || 'bg-purple-600') : (isDarkMode ? 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50' : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm');
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeClass}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 可视化区域 */}
      <div className="py-4">
        {activeTab === 'pointer' && <PointerSandbox />}
        {activeTab === 'stack' && <StackFrameViz />}
        {activeTab === 'cow' && <COWMemoryViz />}
        {activeTab === 'bits' && <BitSwitchGame />}
        {activeTab === 'struct' && <StructPackerGame />}
        {activeTab === 'runner' && <CodeRunner />}
        {activeTab === 'animation' && selectedVizQuestionIndex === null && (
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              🎬 代码执行动画演示
            </h3>
            <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              选择下面的题目，进入详情页后点击"动画演示"按钮观看动态演示
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vizQuestions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedVizQuestionIndex(index)}
                  className={`p-4 rounded-lg text-left transition-all ${
                    isDarkMode 
                      ? 'bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600' 
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div className="text-2xl mb-2">{index === 0 ? '🔢' : '👉'}</div>
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {q.title}
                  </div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {q.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 题目详情页 - 完整答题页面 */}
        {activeTab === 'animation' && selectedVizQuestionIndex !== null && (
          <LabQuestionView
            question={vizQuestions[selectedVizQuestionIndex]}
            isDarkMode={isDarkMode}
            onBack={() => setSelectedVizQuestionIndex(null)}
            onShowViz={() => setSelectedVizDemo(vizQuestions[selectedVizQuestionIndex].vizId)}
            onPrev={selectedVizQuestionIndex > 0 ? () => setSelectedVizQuestionIndex(selectedVizQuestionIndex - 1) : undefined}
            onNext={selectedVizQuestionIndex < vizQuestions.length - 1 ? () => setSelectedVizQuestionIndex(selectedVizQuestionIndex + 1) : undefined}
            currentIndex={selectedVizQuestionIndex}
            totalCount={vizQuestions.length}
          />
        )}
      </div>

      {/* 说明 */}
      <div className={`mt-8 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'} border border-slate-200/20`}>
        <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          💡 互动实验室使用指南
        </h3>
        <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <li>• <strong>🎯 指针与内存</strong>：可视化指针、地址、解引用、多级指针，理解指针运算和危险操作</li>
          <li>• <strong>📚 函数栈帧</strong>：观察函数调用时栈的变化，理解递归调用栈、局部变量生命周期</li>
          <li>• <strong>🔄 COW机制</strong>：理解fork的写时复制原理，观察页表和物理页的关系变化</li>
          <li>• <strong>🔌 位运算</strong>：通过开关理解二进制、十六进制转换</li>
          <li>• <strong>📦 内存对齐</strong>：拖拽字段观察结构体内存布局和填充字节</li>
          <li>• <strong>⚡ 代码运行</strong>：在线编译运行C代码，检测内存错误</li>
          <li>• <strong>🎬 动画演示</strong>：可视化代码执行过程，深入理解C语言陷阱和难点</li>
        </ul>
      </div>

      {/* 溢出可视化 Modal */}
      {selectedVizDemo && (
        <CodeVisualizer
          questionId={selectedVizDemo}
          onClose={() => setSelectedVizDemo(null)}
        />
      )}
    </div>
  );
}

// AnimationDemoView - 动画演示展示
function AnimationDemoView({
  onBack
}: {
  onBack: () => void;
}) {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  // 可视化题型数据
  const demoList = [
    { id: 'uint8-overflow', title: 'uint8_t 计数器溢出', description: '无符号8位整数溢出回绕演示', icon: '🔢' },
    { id: 'int8-overflow', title: 'int8_t 温度值溢出', description: '有符号8位整数溢出演示', icon: '🌡️' },
    { id: 'signed-unsigned-compare', title: '有符号无符号比较陷阱', description: '隐式类型转换导致的比较错误', icon: '⚠️' },
    { id: 'bit-set-register', title: '设置寄存器位', description: '使用位或运算设置GPIO寄存器', icon: '🔌' },
    { id: 'bit-clear-register', title: '清除寄存器位', description: '使用位与运算清除寄存器位', icon: '🧹' },
    { id: 'switch-case-command', title: 'switch-case 命令分发', description: '理解 switch 语句的命令分发逻辑', icon: '🔀' },
    { id: 'array-sum-loop', title: '数组求和循环', description: '观察循环中数组元素的累加过程', icon: '➕' },
    { id: 'while-timeout-wait', title: 'while 超时等待', description: '嵌入式 while 循环超时等待实现', icon: '⏱️' },
    { id: 'pass-by-value', title: '值传递 vs 指针传递', description: '理解 C 语言的值传递和指针传递', icon: '📤' },
    { id: 'bit-macro', title: '位运算宏陷阱', description: '宏定义中的位运算注意事项', icon: '⚡' },
    { id: 'macro-side-effect', title: '宏副作用陷阱', description: '表达式求值顺序导致的隐藏问题', icon: '💥' },
    { id: 'device-status-check', title: '设备状态检查', description: '位运算在嵌入式设备状态检查中的应用', icon: '📟' },
    // Level 1 可视化
    { id: 'level1-register-print', title: '打印寄存器值', description: '%08X格式化输出演示', icon: '📋' },
    { id: 'level1-sensor-data', title: '打印传感器数据', description: '有符号/无符号格式化输出', icon: '🌡️' },
    { id: 'level1-switch-command', title: 'switch-case命令分发', description: '协议命令解析流程', icon: '🔀' },
    { id: 'level1-while-timeout', title: 'while超时等待', description: '嵌入式超时检测模式', icon: '⏱️' },
    { id: 'level1-function-return', title: '函数调用与返回值', description: '错误码返回值规范', icon: '📞' },
    { id: 'level1-bit-set', title: '设置寄存器位', description: '|=位或运算设置位', icon: '🔧' },
    { id: 'level1-bit-clear', title: '清除寄存器位', description: '&=~位与运算清除位', icon: '🧹' },
    { id: 'level1-bit-macro', title: 'BIT宏定义', description: '位操作宏的使用', icon: '⚡' },
    { id: 'level1-array-sum', title: 'for循环数组求和', description: '循环遍历数组累加', icon: '➕' },
    { id: 'level1-string-length', title: '字符串长度计算', description: '\\0结束符和字符串遍历', icon: '📝' },
    { id: 'level1-for-loop', title: 'for循环计数', description: 'for循环执行流程', icon: '🔄' },
    { id: 'level1-if-else-branch', title: 'if-else分支', description: '条件分支执行流程', icon: '🔀' },
    { id: 'level1-array-init', title: '数组初始化', description: '部分初始化自动填0', icon: '📦' },
    { id: 'level1-pointer-basic', title: '指针基础', description: '&取地址和*解引用', icon: '📍' },
    { id: 'level1-do-while', title: 'do-while循环', description: '先执行后判断至少一次', icon: '🔄' },
    { id: 'level1-break-continue', title: 'break与continue', description: '跳出和跳过循环', icon: '⏭️' },
    { id: 'level1-nested-loop', title: '嵌套循环', description: '外层内层循环执行', icon: '🔂' },
    { id: 'level1-printf-format', title: 'printf格式符', description: 'd/u/f/c/s格式符', icon: '📋' },
    { id: 'level1-operator-precedence', title: '运算符优先级', description: '先乘除后加减', icon: '➕' },
    { id: 'level1-logical-operator', title: '逻辑运算符', description: '!非 &&与 ||或', icon: '🔬' },
    { id: 'level1-sizeof-type', title: 'sizeof类型大小', description: '各类型字节大小', icon: '📏' },
    { id: 'level1-ternary-operator', title: '三目运算符', description: '条件?真值:假值', icon: '❓' },
    { id: 'level1-modulo-operator', title: '取模运算', description: 'a%b求余数', icon: '➗' },
    { id: 'level1-shift-operator', title: '位移运算', description: '<<左移 >>右移', icon: '⬅️' },
    { id: 'level1-increment-decrement', title: '递增递减运算', description: '前++后++的区别', icon: '➕' },
    { id: 'level1-constant-define', title: '常量定义', description: '#define宏定义', icon: '📌' },
    { id: 'level1-multi-dimensional-array', title: '二维数组', description: 'matrix[行][列]', icon: '📊' },
    { id: 'level1-string-array', title: '字符数组', description: '字符串\\0结尾', icon: '🔤' },
    { id: 'level1-function-param-pass', title: '函数参数传递', description: '值传递vs指针传递', icon: '📤' },
    { id: 'level1-global-local-var', title: '全局与局部变量', description: '作用域规则', icon: '🌍' },
    { id: 'level1-static-var', title: 'static静态变量', description: '只初始化一次', icon: '🔒' },
    { id: 'level1-goto-statement', title: 'goto语句', description: '跳转语句', icon: '⏩' },
    { id: 'level1-bitwise-and-or', title: '位与/位或', description: '& | ^位运算', icon: '🔗' },
    { id: 'level1-comma-operator', title: '逗号运算符', description: '从左到右取最后值', icon: '🔥' },
    { id: 'level1-type-cast', title: '类型转换', description: '自动vs强制转换', icon: '🔄' },
    { id: 'level1-enum-const', title: '枚举类型', description: '常量整数值', icon: '📋' },
    { id: 'level1-typedef', title: 'typedef类型定义', description: '为类型起别名', icon: '📝' },
    { id: 'level1-struct-basic', title: '结构体基础', description: '不同类型数据集合', icon: '🏗️' },
    { id: 'level1-union-basic', title: '联合体基础', description: '共享内存', icon: '🔗' },
    { id: 'level1-sizeof-array', title: 'sizeof数组', description: '数组总字节数', icon: '📏' },
    { id: 'level1-array-pointer', title: '数组与指针', description: '数组名=首地址', icon: '📍' },
    { id: 'level1-string-functions', title: '字符串函数', description: 'strcpy/strcat', icon: '📝' },
    { id: 'level1-recursion', title: '递归函数', description: '函数调用自身', icon: '🔄' },
    { id: 'level1-variable-arguments', title: '可变参数', description: 'va_list用法', icon: '📊' },
    { id: 'level1-function-pointer', title: '函数指针', description: '指向函数的指针', icon: '📍' },
    { id: 'level1-const-pointer', title: 'const指针', description: 'const位置含义', icon: '🔒' },
    { id: 'level1-memcpy-memset', title: '内存操作函数', description: 'memset/memcpy', icon: '💾' },
    { id: 'level1-bit-field', title: '位域', description: '按位定义字段', icon: '📊' },
    { id: 'level1-volatile-keyword', title: 'volatile关键字', description: '防止编译器优化', icon: '🔄' },
    { id: 'level1-preprocessor-conditional', title: '条件编译', description: '#ifdef/#if', icon: '🔨' },
    { id: 'level1-inline-function', title: '内联函数', description: 'inline编译时展开', icon: '⚡' },
    { id: 'level1-hex-dec-conversion', title: '进制转换', description: '十进制转十六进制', icon: '🔢' },
    { id: 'level1-ascii-table', title: 'ASCII表', description: '字符对应数字编码', icon: '🔤' },
    { id: 'level1-boolean-logic', title: '布尔逻辑', description: 'true/false逻辑运算', icon: '🔬' },
    { id: 'level1-auto-register-static', title: '存储类别', description: 'auto/register/static', icon: '📦' },
    { id: 'level1-floating-point', title: '浮点数', description: 'float和double', icon: '🔵' },
    { id: 'level1-uchar-ushort', title: '无符号类型', description: 'uint8_t/uint16_t', icon: '🔢' },
    { id: 'level1-schar-sshort', title: '有符号类型', description: 'int8_t/int16_t', icon: '🔢' },
    { id: 'level1-varargs-sum', title: '可变参数求和', description: 'va_list用法', icon: '➕' },
    { id: 'level1-sizeof-pointer', title: '指针大小', description: '指针类型大小', icon: '📏' },
    { id: 'level1-void-pointer', title: 'void指针', description: '通用指针类型', icon: '📍' },
    { id: 'level1-null-pointer', title: '空指针', description: 'NULL指针', icon: '❌' },
    { id: 'level1-pointer-arithmetic', title: '指针运算', description: '指针算术运算', icon: '➕' },
  ];

  // 处理选择可视化
  const handleSelectDemo = (demoId: string) => {
    try {
      setSelectedDemo(demoId);
    } catch (error) {
      console.error('加载可视化失败:', error);
      alert('该可视化暂时不可用，请尝试其他题型');
      setSelectedDemo(null);
    }
  };

  // 处理关闭可视化
  const handleCloseVisualization = () => {
    setSelectedDemo(null);
  };

  // 如果选择了可视化题，显示 CodeVisualizer
  if (selectedDemo) {
    return (
      <div className="animate-fadeIn">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleCloseVisualization}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            返回列表
          </button>
          <h2 className="text-2xl font-bold text-white">
            🎬 {demoList.find(d => d.id === selectedDemo)?.title || '动画演示'}
          </h2>
        </div>
        <div className="bg-slate-900 rounded-xl overflow-hidden" style={{ minHeight: '600px' }}>
          <CodeVisualizer
            questionId={selectedDemo}
            onClose={handleCloseVisualization}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* 头部 */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          返回
        </button>
        <h2 className="text-2xl font-bold text-white">
          🎬 动画演示
        </h2>
      </div>

      {/* 说明文字 */}
      <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <p className="text-amber-200 text-sm">
          📺 这里收集了所有已完成的动画演示题型，点击即可观看代码执行过程的动态演示。
          通过可视化方式深入理解 C 语言的底层原理。
        </p>
      </div>

      {/* 题型网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoList.map((demo) => (
          <button
            key={demo.id}
            onClick={() => handleSelectDemo(demo.id)}
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-amber-500/30 transition-all text-left group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{demo.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                  {demo.title}
                </h3>
                <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                  {demo.description}
                </p>
              </div>
              <Play className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* 空状态提示 */}
      {demoList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">暂无动画演示题型</p>
          <p className="text-slate-500 text-sm mt-2">敬请期待更多内容</p>
        </div>
      )}
    </div>
  );
}
function HomeView({
  progress,
  onStartChapter,
  onReview,
  onViewBookmarks,
  onStartTyping,
  isDarkMode
}: {
  progress: Progress;
  onStartChapter: (chapterId: string) => void;
  onReview: () => void;
  onViewBookmarks: () => void;
  onStartTyping: () => void;
  isDarkMode: boolean;
}) {
  const completedCount = progress.completed.length;
  const correctCount = progress.correct.length;
  const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;
  const [modeFilter, setModeFilter] = useState<'all' | QuestionMode>('all');

  const filteredChapters = modeFilter === 'all' 
    ? chapters 
    : chapters.filter(ch => ch.mode === modeFilter);

  return (
    <div className="animate-fadeIn">
      {/* Hero section */}
      <div className="text-center mb-10 pt-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
          <Brain className="w-4 h-4 text-emerald-400" />
          <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>输入式答题 · 拒绝无脑选择</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          C语言<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">代码思维</span>训练
        </h1>
        <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          亲手敲代码，像编译器一样思考
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div className={`glass rounded-xl p-4 text-center ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
          <Target className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{completedCount}</p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>已完成</p>
        </div>
        <div className={`glass rounded-xl p-4 text-center ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{correctCount}</p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>答对</p>
        </div>
        <div className={`glass rounded-xl p-4 text-center ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
          <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{accuracy}%</p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>正确率</p>
        </div>
        <div className={`glass rounded-xl p-4 text-center ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
          <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{progress.wrong.length}</p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>待攻克</p>
        </div>
        <button
          onClick={onViewBookmarks}
          className={`glass rounded-xl p-4 text-center transition-all hover:scale-105 ${isDarkMode ? 'hover:bg-yellow-500/10' : 'bg-white/60 border-slate-200 hover:bg-yellow-50'}`}
        >
          <Bookmark className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{progress.bookmarked.length}</p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>已收藏</p>
        </button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6">
        {progress.wrong.length > 0 && (
          <button
            onClick={onReview}
            className={`flex-1 py-4 px-6 rounded-xl text-orange-400 font-medium flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20' : 'bg-orange-50 border border-orange-200 hover:bg-orange-100'}`}
          >
            <RotateCcw className="w-5 h-5" />
            复习错题（{progress.wrong.length}道）
          </button>
        )}
        {progress.bookmarked.length > 0 && (
          <button
            onClick={onViewBookmarks}
            className={`flex-1 py-4 px-6 rounded-xl text-yellow-400 font-medium flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20' : 'bg-yellow-50 border border-yellow-200 hover:bg-yellow-100'}`}
          >
            <Bookmark className="w-5 h-5" />
            查看收藏（{progress.bookmarked.length}道）
          </button>
        )}
      </div>

      {/* Chapters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <BookOpen className="w-5 h-5 text-emerald-400" />
            学习章节
          </h2>
          {/* Mode Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setModeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                modeFilter === 'all'
                  ? isDarkMode 
                    ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                    : 'bg-slate-600/20 text-slate-800 border border-slate-600/30'
                  : isDarkMode 
                    ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setModeFilter('real')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                modeFilter === 'real'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : isDarkMode 
                    ? 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10' 
                    : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Target className="w-4 h-4" />
              真题
            </button>
            <button
              onClick={() => setModeFilter('practice')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                modeFilter === 'practice'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : isDarkMode 
                    ? 'text-slate-500 hover:text-blue-400 hover:bg-blue-500/10' 
                    : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Zap className="w-4 h-4" />
              测试
            </button>
          </div>
        </div>
        <div className="grid gap-4">
          {filteredChapters.map((chapter) => {
            const chapterQuestions = getQuestionsByChapter(chapter.id);
            const chapterCompleted = chapterQuestions.filter(q => progress.completed.includes(q.id)).length;
            const chapterCorrect = chapterQuestions.filter(q => progress.correct.includes(q.id)).length;
            const chapterProgress = chapterQuestions.length > 0 ? (chapterCompleted / chapterQuestions.length) * 100 : 0;

            return (
              <button
                key={chapter.id}
                onClick={() => onStartChapter(chapter.id)}
                className={`chapter-card glass rounded-xl p-5 text-left group ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-3xl">
                    {chapter.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold group-hover:text-emerald-400 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {chapter.name}
                      </h3>
                      {chapter.mode && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          chapter.mode === 'real' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {chapter.mode === 'real' ? '真题' : '测试'}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{chapter.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden max-w-48">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${chapterProgress}%` }}
                        />
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {chapterCorrect}/{chapterQuestions.length}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 group-hover:text-emerald-400 transition-colors ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Training modes */}
      <div className={`mt-8 p-6 glass rounded-xl ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          <Zap className="w-5 h-5 text-yellow-400" />
          四大训练模式
        </h3>
        <div className="grid sm:grid-cols-5 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-500/5 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
            <Code2 className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className={`font-medium text-blue-400 mb-1`}>代码填空</h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>亲手输入关键字，强化记忆</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-500/5 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
            <Terminal className="w-6 h-6 text-green-400 mb-2" />
            <h4 className={`font-medium text-green-400 mb-1`}>输出预测</h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>读懂代码逻辑，预测运行结果</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-500/5 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
            <Bug className="w-6 h-6 text-red-400 mb-2" />
            <h4 className={`font-medium text-red-400 mb-1`}>Debug找错</h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>像编译器一样找Bug</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
            <Shuffle className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className={`font-medium text-amber-400 mb-1`}>代码排序</h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>理解程序结构，排列代码</p>
          </div>
          <button
            onClick={onStartTyping}
            className={`p-4 rounded-lg transition-all hover:scale-105 ${isDarkMode ? 'bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10' : 'bg-cyan-50 border border-cyan-200 hover:bg-cyan-100'}`}
          >
            <Keyboard className="w-6 h-6 text-cyan-400 mb-2" />
            <h4 className={`font-medium text-cyan-400 mb-1`}>代码跟打</h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>看着代码练习敲写</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Stats View
function StatsView({ progress, onReset, isDarkMode }: { progress: Progress; onReset: () => void; isDarkMode: boolean }) {
  const accuracy = progress.completed.length > 0
    ? Math.round((progress.correct.length / progress.completed.length) * 100)
    : 0;

  const chapterStats = chapters.map(chapter => {
    const chapterQuestions = getQuestionsByChapter(chapter.id);
    const completed = chapterQuestions.filter(q => progress.completed.includes(q.id)).length;
    const correct = chapterQuestions.filter(q => progress.correct.includes(q.id)).length;
    return {
      ...chapter,
      total: chapterQuestions.length,
      completed,
      correct,
      accuracy: completed > 0 ? Math.round((correct / completed) * 100) : 0
    };
  });

  const { stats } = useUserStats();

  return (
    <div className="animate-fadeIn">
      <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
        <Trophy className="w-6 h-6 text-yellow-400" />
        训练统计
      </h2>

      {/* Stats Panel - 详细统计 */}
      <div className="mb-6">
        <StatsPanel stats={stats} isDarkMode={isDarkMode} />
      </div>

      {/* Achievements Panel - 成就系统 */}
      <div className="mb-6">
        <AchievementsPanel achievements={stats.achievements} isDarkMode={isDarkMode} />
      </div>

      {/* Overall stats */}
      <div className={`glass rounded-2xl p-6 mb-6 ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>总体进度</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">{progress.completed.length}</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>已完成</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">{progress.correct.length}</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>答对</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{progress.wrong.length}</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>答错</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>正确率</span>
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{accuracy}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chapter breakdown */}
      <div className={`glass rounded-2xl p-6 mb-6 ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>章节详情</h3>
        <div className="space-y-4">
          {chapterStats.map(chapter => (
            <div key={chapter.id} className="flex items-center gap-4">
              <span className="text-2xl">{chapter.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDarkMode ? 'text-white' : 'text-slate-800'}>{chapter.name}</span>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    {chapter.correct}/{chapter.total} ({chapter.accuracy}%)
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${(chapter.correct / chapter.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className={`w-full py-3 px-6 rounded-xl text-red-400 font-medium transition-all ${isDarkMode ? 'bg-red-500/10 border border-red-500/30 hover:bg-red-500/20' : 'bg-red-50 border border-red-200 hover:bg-red-100'}`}
      >
        重置所有进度
      </button>
    </div>
  );
}

// Training View
function TrainingView({
  chapter,
  progress,
  setProgress,
  onBack,
  isDarkMode,
  setView
}: {
  chapter: Chapter;
  progress: Progress;
  setProgress: (p: Progress) => void;
  onBack: () => void;
  isDarkMode: boolean;
  setView: (v: string) => void;
}) {
  const [showLesson, setShowLesson] = useState(true);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answersMap, setAnswersMap] = useState<Record<number, { answers: string[], isCorrect: boolean, showResult: boolean }>>({});

  const chapterQuestions = getQuestionsByChapter(chapter.id);
  const currentLesson = chapter.lessons[lessonIndex];
  const currentQuestion = chapterQuestions[questionIndex];

  useEffect(() => {
    const firstUnanswered = chapterQuestions.findIndex(q => !progress.completed.includes(q.id));
    if (firstUnanswered !== -1) {
      setQuestionIndex(firstUnanswered);
    }
  }, []);

  const handleLessonComplete = () => {
    if (lessonIndex < chapter.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      setShowLesson(false);
    }
  };

  const goToPrevLesson = () => {
    if (lessonIndex > 0) {
      setLessonIndex(lessonIndex - 1);
    }
  };

  const goToNextLesson = () => {
    if (lessonIndex < chapter.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      setShowLesson(false);
    }
  };

  const goToPractice = () => {
    setShowLesson(false);
  };

  const goToNext = () => {
    if (questionIndex < chapterQuestions.length - 1) {
      const nextIndex = questionIndex + 1;
      const savedAnswer = answersMap[nextIndex];
      
      setQuestionIndex(nextIndex);
      
      if (savedAnswer) {
        setUserAnswers(savedAnswer.answers);
        setIsCorrect(savedAnswer.isCorrect);
        setShowResult(savedAnswer.showResult);
      } else {
        setShowResult(false);
        setUserAnswers([]);
        setIsCorrect(false);
      }
    }
  };

  const handleAnswer = useCallback((answers: string[], correct: boolean) => {
    setUserAnswers(answers);
    setIsCorrect(correct);
    setShowResult(true);

    setAnswersMap(prev => ({
      ...prev,
      [questionIndex]: { answers, isCorrect: correct, showResult: true }
    }));

    const qId = currentQuestion.id;
    const newProgress = {
      ...progress,
      completed: [...new Set([...progress.completed, qId])],
      correct: correct
        ? [...new Set([...progress.correct, qId])]
        : progress.correct.filter(id => id !== qId),
      wrong: !correct
        ? [...new Set([...progress.wrong, qId])]
        : progress.wrong.filter(id => id !== qId),
      bookmarked: !correct && !progress.bookmarked.includes(qId)
        ? [...progress.bookmarked, qId]
        : progress.bookmarked,
      attempts: {
        ...progress.attempts,
        [qId]: (progress.attempts[qId] || 0) + 1
      }
    };

    setProgress(newProgress);

    // 答对后自动进入下一题
    if (correct && questionIndex < chapterQuestions.length - 1) {
      setTimeout(() => {
        goToNext();
      }, 1500);
    }
  }, [currentQuestion, progress, setProgress, questionIndex, chapterQuestions.length, goToNext]);

  const goToPrev = () => {
    if (questionIndex > 0) {
      const prevIndex = questionIndex - 1;
      const savedAnswer = answersMap[prevIndex];
      
      setQuestionIndex(prevIndex);
      
      if (savedAnswer) {
        setUserAnswers(savedAnswer.answers);
        setIsCorrect(savedAnswer.isCorrect);
        setShowResult(savedAnswer.showResult);
      } else {
        setShowResult(false);
        setUserAnswers([]);
        setIsCorrect(false);
      }
    }
  };

  const toggleBookmark = useCallback(() => {
    const qId = currentQuestion.id;
    const isCurrentlyBookmarked = progress.bookmarked.includes(qId);
    const newProgress = {
      ...progress,
      bookmarked: isCurrentlyBookmarked
        ? progress.bookmarked.filter(id => id !== qId)
        : [...progress.bookmarked, qId]
    };
    setProgress(newProgress);
  }, [currentQuestion, progress, setProgress]);

  const progressPercent = ((questionIndex + 1) / chapterQuestions.length) * 100;

  return (
    <div className="animate-fadeIn">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>返回</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{chapter.icon}</span>
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{chapter.name}</span>
        </div>
      </div>

      {showLesson && currentLesson ? (
        <LessonView 
          lesson={currentLesson} 
          onComplete={handleLessonComplete} 
          isDarkMode={isDarkMode}
          onPrev={goToPrevLesson}
          onNext={goToNextLesson}
          hasPrev={lessonIndex > 0}
          hasNext={lessonIndex < chapter.lessons.length - 1}
          onStartPractice={goToPractice}
        />
      ) : currentQuestion ? (
        <>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>练习进度</span>
              <span className="text-emerald-400 font-medium">{questionIndex + 1} / {chapterQuestions.length}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full progress-bar rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Navigation buttons - always visible */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={goToPrev}
              disabled={questionIndex === 0}
              className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all ${isDarkMode ? 'glass glass-hover text-white' : 'bg-white/60 border border-slate-200 text-slate-800 hover:bg-white/80'}`}
            >
              <ChevronLeft className="w-4 h-4" />
              上一题
            </button>
            <button
              onClick={goToNext}
              disabled={questionIndex === chapterQuestions.length - 1}
              className={`flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium flex items-center justify-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/25 transition-all`}
            >
              下一题
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Question */}
          <QuestionView
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
            isCorrect={isCorrect}
            userAnswers={userAnswers}
            isDarkMode={isDarkMode}
            isBookmarked={progress.bookmarked.includes(currentQuestion.id)}
            onToggleBookmark={toggleBookmark}
            onNext={goToNext}
            onPrev={goToPrev}
          />

          {/* Completion message */}
          {questionIndex === chapterQuestions.length - 1 && showResult && (
            <div className={`mt-4 glass rounded-xl p-4 text-center animate-fadeIn ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
              <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>🎉 章节完成！</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400 mb-3' : 'text-slate-600 mb-3'}`}>
                你已完成 {chapter.name} 的所有练习
              </p>
              <button
                onClick={onBack}
                className="py-2 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                返回首页
              </button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

// Review View
function ReviewView({
  progress,
  setProgress,
  onBack,
  isDarkMode
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const wrongQuestions = questions.filter(q => progress.wrong.includes(q.id));
  const currentQuestion = wrongQuestions[questionIndex];

  if (wrongQuestions.length === 0) {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>太棒了！</h2>
        <p className={isDarkMode ? 'text-slate-400 mb-6' : 'text-slate-600 mb-6'}>没有需要复习的错题</p>
        <button
          onClick={onBack}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium"
        >
          返回首页
        </button>
      </div>
    );
  }

  const handleAnswer = useCallback((answers: string[], correct: boolean) => {
    setUserAnswers(answers);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const qId = currentQuestion.id;
      const newProgress = {
        ...progress,
        correct: [...new Set([...progress.correct, qId])],
        wrong: progress.wrong.filter(id => id !== qId)
      };
      setProgress(newProgress);

      setTimeout(() => {
        if (questionIndex < wrongQuestions.length - 1) {
          setQuestionIndex(questionIndex + 1);
          setShowResult(false);
          setUserAnswers([]);
        } else {
          onBack();
        }
      }, 1500);
    }
  }, [currentQuestion, progress, setProgress, questionIndex, wrongQuestions.length, onBack]);

  const goToNext = () => {
    if (questionIndex < wrongQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setShowResult(false);
      setUserAnswers([]);
    } else {
      onBack();
    }
  };

  const toggleBookmark = useCallback(() => {
    const qId = currentQuestion.id;
    const isCurrentlyBookmarked = progress.bookmarked.includes(qId);
    const newProgress = {
      ...progress,
      bookmarked: isCurrentlyBookmarked
        ? progress.bookmarked.filter(id => id !== qId)
        : [...progress.bookmarked, qId]
    };
    setProgress(newProgress);
  }, [currentQuestion, progress, setProgress]);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>返回</span>
        </button>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-orange-400" />
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>错题复习</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>复习进度</span>
          <span className="text-orange-400 font-medium">{questionIndex + 1} / {wrongQuestions.length}</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${((questionIndex + 1) / wrongQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <QuestionView
        question={currentQuestion}
        onAnswer={handleAnswer}
        showResult={showResult}
        isCorrect={isCorrect}
        userAnswers={userAnswers}
        isDarkMode={isDarkMode}
        isBookmarked={progress.bookmarked.includes(currentQuestion.id)}
        onToggleBookmark={toggleBookmark}
        onNext={goToNext}
      />

      {!isCorrect && showResult && (
        <button
          onClick={goToNext}
          className="w-full mt-6 py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          {questionIndex < wrongQuestions.length - 1 ? '下一题' : '完成复习'}
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Bookmarked View - 收藏列表
function BookmarkedView({
  progress,
  setProgress,
  onBack,
  isDarkMode
}: {
  progress: Progress;
  setProgress: (p: Progress) => void;
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const bookmarkedQuestions = questions.filter(q => progress.bookmarked.includes(q.id));
  const currentQuestion = bookmarkedQuestions[questionIndex];

  if (bookmarkedQuestions.length === 0) {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <Bookmark className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>暂无收藏</h2>
        <p className={isDarkMode ? 'text-slate-400 mb-6' : 'text-slate-600 mb-6'}>在刷题时点击收藏按钮添加题目</p>
        <button
          onClick={onBack}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-medium"
        >
          返回首页
        </button>
      </div>
    );
  }

  const handleAnswer = useCallback((answers: string[], correct: boolean) => {
    setUserAnswers(answers);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct && questionIndex < bookmarkedQuestions.length - 1) {
      setTimeout(() => {
        goToNext();
      }, 1500);
    }
  }, [questionIndex, bookmarkedQuestions.length]);

  const goToNext = () => {
    if (questionIndex < bookmarkedQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setShowResult(false);
      setUserAnswers([]);
    }
  };

  const goToPrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setShowResult(false);
      setUserAnswers([]);
    }
  };

  const toggleBookmark = useCallback(() => {
    const qId = currentQuestion.id;
    const newProgress = {
      ...progress,
      bookmarked: progress.bookmarked.filter(id => id !== qId)
    };
    setProgress(newProgress);
    if (questionIndex >= newProgress.bookmarked.length && questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
    if (newProgress.bookmarked.length === 0) {
      onBack();
    }
  }, [currentQuestion, progress, setProgress, questionIndex, onBack]);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>返回</span>
        </button>
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-yellow-400" />
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>收藏题目</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>浏览进度</span>
          <span className="text-yellow-400 font-medium">{questionIndex + 1} / {bookmarkedQuestions.length}</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${((questionIndex + 1) / bookmarkedQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={goToPrev}
          disabled={questionIndex === 0}
          className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all ${isDarkMode ? 'glass glass-hover text-white' : 'bg-white/60 border border-slate-200 text-slate-800 hover:bg-white/80'}`}
        >
          <ChevronLeft className="w-4 h-4" />
          上一题
        </button>
        <button
          onClick={goToNext}
          disabled={questionIndex === bookmarkedQuestions.length - 1}
          className={`flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium flex items-center justify-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/25 transition-all`}
        >
          下一题
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <QuestionView
        question={currentQuestion}
        onAnswer={handleAnswer}
        showResult={showResult}
        isCorrect={isCorrect}
        userAnswers={userAnswers}
        isDarkMode={isDarkMode}
        isBookmarked={true}
        onToggleBookmark={toggleBookmark}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </div>
  );
}

// Projects List View
function ProjectsListView({
  onSelectProject,
  isDarkMode
}: {
  onSelectProject: (project: Project) => void;
  isDarkMode: boolean;
}) {
  const projects = getAllProjects();

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

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          项目实战
        </h2>
        <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          通过完整的项目案例学习嵌入式Linux应用开发，每个项目拆分成多个片段详细讲解
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`text-left p-5 rounded-xl transition-all hover:scale-[1.01] ${
              isDarkMode
                ? 'glass glass-hover'
                : 'bg-white/80 border border-slate-200 hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FolderOpen className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {project.name}
                  </h3>
                  <span className={`text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {getDifficultyText(project.difficulty)}
                  </span>
                </div>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>
                    <Layers className="w-3 h-3 inline mr-1" />
                    {project.fragments.length} 个片段
                  </span>
                  <span className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>
                    <Code2 className="w-3 h-3 inline mr-1" />
                    {project.totalLines} 行代码
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode
                          ? 'bg-slate-700/50 text-slate-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className={`w-6 h-6 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Main App
export function App() {
  const [view, setView] = useState('home');
  const [progress, setProgress] = useState<Progress>({
    completed: [],
    correct: [],
    wrong: [],
    attempts: {},
    bookmarked: [],
    analyzed: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [backendAlive, setBackendAlive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    loadProgressApi().then(data => {
      setProgress(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await fetch('http://localhost:3001/api/heartbeat');
        setBackendAlive(true);
      } catch {
        setBackendAlive(false);
      }
    };
    
    checkBackend();
    const heartbeat = setInterval(checkBackend, 5000);

    return () => {
      clearInterval(heartbeat);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveProgressApi(progress);
    }
  }, [progress, isLoading]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.style.background = 'linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)';
      document.body.style.color = '#e2e8f0';
    } else {
      document.body.classList.remove('dark');
      document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)';
      document.body.style.color = '#334155';
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleStartChapter = useCallback((chapterId: string) => {
    const chapter = getChapterById(chapterId);
    if (chapter) {
      setCurrentChapter(chapter);
      setView('training');
    }
  }, []);

  const handleSelectProject = useCallback((project: Project) => {
    setCurrentProject(project);
    setView('project');
  }, []);

  const handleReview = useCallback(() => {
    setView('review');
  }, []);

  const handleViewBookmarks = useCallback(() => {
    setView('bookmarked');
  }, []);

  const handleStartTyping = useCallback(() => {
    setView('typing');
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('确定要重置所有进度吗？此操作不可撤销。')) {
      setProgress({ completed: [], correct: [], wrong: [], attempts: {}, bookmarked: [], analyzed: [] });
    }
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? '' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      <Header view={view} setView={setView} progress={progress} isDarkMode={isDarkMode} toggleTheme={toggleTheme} backendAlive={backendAlive} />

      <main className={`mx-auto px-4 py-8 ${view === 'project' ? 'max-w-none h-[calc(100vh-140px)]' : 'max-w-5xl'}`}>
        {view === 'home' && (
          <HomeView
            progress={progress}
            onStartChapter={handleStartChapter}
            onReview={handleReview}
            onViewBookmarks={handleViewBookmarks}
            onStartTyping={handleStartTyping}
            isDarkMode={isDarkMode}
          />
        )}
        {view === 'stats' && (
          <StatsView progress={progress} onReset={handleReset} isDarkMode={isDarkMode} />
        )}
        {view === 'training' && currentChapter && (
          <TrainingView
            chapter={currentChapter}
            progress={progress}
            setProgress={setProgress}
            onBack={() => setView('home')}
            isDarkMode={isDarkMode}
            setView={setView}
          />
        )}
        {view === 'review' && (
          <ReviewView
            progress={progress}
            setProgress={setProgress}
            onBack={() => setView('home')}
            isDarkMode={isDarkMode}
          />
        )}
        {view === 'bookmarked' && (
          <BookmarkedView
            progress={progress}
            setProgress={setProgress}
            onBack={() => setView('home')}
            isDarkMode={isDarkMode}
          />
        )}
        {view === 'projects' && (
          <ProjectsListView
            onSelectProject={handleSelectProject}
            isDarkMode={isDarkMode}
          />
        )}
        {view === 'project' && currentProject && (
          <ProjectView
            project={currentProject}
            onBack={() => setView('projects')}
          />
        )}
        {view === 'lab' && (
          <LabView onBack={() => setView('home')} isDarkMode={isDarkMode} />
        )}
        {/* 动画演示已禁用 
        {view === 'animation' && (
          <AnimationDemoView onBack={() => setView('home')} />
        )}
        */}
        {view === 'typing' && (
          <CodeTypingPractice />
        )}
      </main>

      {view !== 'project' && (
        <footer className={`text-center py-8 text-sm ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
          <p>用 ❤️ 打造 · C语言代码思维训练器</p>
        </footer>
      )}
    </div>
  );
}
