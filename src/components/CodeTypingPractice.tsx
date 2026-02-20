import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  RotateCcw, Play, Pause, Trophy, Clock, Zap,
  AlertCircle, CheckCircle2, ChevronDown, Keyboard,
  Target, TrendingUp
} from 'lucide-react';

const PRESET_CODES = [
  {
    name: 'Hello World',
    difficulty: '入门',
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  {
    name: '变量与运算',
    difficulty: '入门',
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int sum = a + b;
    printf("Sum = %d\\n", sum);
    return 0;
}`,
  },
  {
    name: 'for 循环',
    difficulty: '基础',
    code: `#include <stdio.h>

int main() {
    for (int i = 0; i < 10; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
  },
  {
    name: '函数定义',
    difficulty: '基础',
    code: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 5);
    printf("3 + 5 = %d\\n", result);
    return 0;
}`,
  },
  {
    name: '数组与遍历',
    difficulty: '基础',
    code: `#include <stdio.h>

int main() {
    int arr[] = {5, 3, 8, 1, 9, 2, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
  },
  {
    name: '指针基础',
    difficulty: '中级',
    code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After: x=%d, y=%d\\n", x, y);
    return 0;
}`,
  },
  {
    name: '字符串操作',
    difficulty: '中级',
    code: `#include <stdio.h>
#include <string.h>

int my_strlen(const char *s) {
    int len = 0;
    while (s[len] != '\\0') {
        len++;
    }
    return len;
}

int main() {
    char str[] = "Hello";
    printf("Length: %d\\n", my_strlen(str));
    return 0;
}`,
  },
  {
    name: '结构体',
    difficulty: '中级',
    code: `#include <stdio.h>

typedef struct {
    char name[50];
    int age;
    float score;
} Student;

void print_student(Student s) {
    printf("Name: %s\\n", s.name);
    printf("Age: %d\\n", s.age);
    printf("Score: %.1f\\n", s.score);
}

int main() {
    Student s = {"Alice", 20, 95.5};
    print_student(s);
    return 0;
}`,
  },
  {
    name: '链表创建',
    difficulty: '高级',
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *create_node(int data) {
    Node *node = malloc(sizeof(Node));
    node->data = data;
    node->next = NULL;
    return node;
}

void print_list(Node *head) {
    Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void free_list(Node *head) {
    while (head != NULL) {
        Node *temp = head;
        head = head->next;
        free(temp);
    }
}

int main() {
    Node *head = create_node(1);
    head->next = create_node(2);
    head->next->next = create_node(3);

    print_list(head);
    free_list(head);
    return 0;
}`,
  },
  {
    name: '冒泡排序',
    difficulty: '高级',
    code: `#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    bubble_sort(arr, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
  },
];

class TypeSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3;
  private soundType: 'mechanical' | 'typewriter' | 'soft' | 'bubble' = 'mechanical';

  init() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(v: boolean) { this.enabled = v; }
  setVolume(v: number) { this.volume = Math.max(0, Math.min(1, v)); }
  setSoundType(t: 'mechanical' | 'typewriter' | 'soft' | 'bubble') { this.soundType = t; }

  playKey() {
    if (!this.enabled || !this.ctx) return;
    const sounds = {
      mechanical: () => this.playMechanical(300 + Math.random() * 200, 0.04),
      typewriter: () => this.playTypewriter(),
      soft: () => this.playSoft(600 + Math.random() * 200),
      bubble: () => this.playBubble(),
    };
    sounds[this.soundType]();
  }

  playEnter() {
    if (!this.enabled || !this.ctx) return;
    const sounds = {
      mechanical: () => this.playMechanical(200, 0.08),
      typewriter: () => { this.playTypewriter(); setTimeout(() => this.playDing(), 50); },
      soft: () => this.playSoft(400),
      bubble: () => { this.playBubble(); this.playBubble(); },
    };
    sounds[this.soundType]();
  }

  playBackspace() {
    if (!this.enabled || !this.ctx) return;
    this.playNoise(0.02, 150);
  }

  playError() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  playComplete() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  private playMechanical(freq: number, duration: number) {
    const ctx = this.ctx!;
    this.playNoise(duration * 0.6, freq);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(this.volume * 0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  private playTypewriter() {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(this.volume * 0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  private playSoft(freq: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(this.volume * 0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  }

  private playBubble() {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    const baseFreq = 400 + Math.random() * 300;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }

  private playDing() {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 2000;
    gain.gain.setValueAtTime(this.volume * 0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }

  private playNoise(duration: number, filterFreq: number) {
    const ctx = this.ctx!;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 1;
    const gain = ctx.createGain();
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + duration);
  }
}

const soundEngine = new TypeSoundEngine();

interface TypingRecord {
  id: string;
  date: string;
  codeName: string;
  codeLength: number;
  cpm: number;
  accuracy: number;
  elapsed: number;
  totalErrors: number;
  perfectRun: boolean;
}

interface TypingStats {
  totalSessions: number;
  totalChars: number;
  totalTime: number;
  bestCpm: number;
  avgCpm: number;
  avgAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  todaySessions: number;
  records: TypingRecord[];
}

const STORAGE_KEY = 'c-typing-practice-records';

function loadStats(): TypingStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    totalSessions: 0, totalChars: 0, totalTime: 0,
    bestCpm: 0, avgCpm: 0, avgAccuracy: 0,
    currentStreak: 0, longestStreak: 0, todaySessions: 0,
    records: [],
  };
}

function saveRecord(record: TypingRecord): TypingStats {
  const stats = loadStats();
  stats.records.unshift(record);
  if (stats.records.length > 100) stats.records = stats.records.slice(0, 100);

  stats.totalSessions++;
  stats.totalChars += record.codeLength;
  stats.totalTime += record.elapsed;
  if (record.cpm > stats.bestCpm) stats.bestCpm = record.cpm;

  const recent = stats.records.slice(0, 20);
  stats.avgCpm = Math.round(recent.reduce((s, r) => s + r.cpm, 0) / recent.length);
  stats.avgAccuracy = Math.round(recent.reduce((s, r) => s + r.accuracy, 0) / recent.length);

  const today = new Date().toDateString();
  const todayRecords = stats.records.filter(r => new Date(r.date).toDateString() === today);
  stats.todaySessions = todayRecords.length;

  const days = new Set(stats.records.map(r => new Date(r.date).toDateString()));
  let streak = 0;
  const d = new Date();
  while (days.has(d.toDateString())) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  stats.currentStreak = streak;
  if (streak > stats.longestStreak) stats.longestStreak = streak;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats;
}

function getPersonalBest(codeName: string): TypingRecord | null {
  const stats = loadStats();
  const records = stats.records.filter(r => r.codeName === codeName);
  if (records.length === 0) return null;
  return records.length === 0 ? null : records.reduce((best, r) => r.cpm > best.cpm ? r : best);
}

const C_KW = new Set(['auto','break','case','const','continue','default','do','else','enum','extern','for','goto','if','register','return','sizeof','static','struct','switch','typedef','union','volatile','while','inline','restrict','int','char','float','double','void','short','long','unsigned','signed','size_t','FILE','NULL','EOF','true','false','include','define','ifndef','ifdef','endif','pragma']);

function getCharClass(code: string, index: number): string {
  const before = code.substring(0, index + 1);
  const lastLineCommentStart = before.lastIndexOf('//');
  if (lastLineCommentStart >= 0) {
    const newlineAfterComment = code.indexOf('\n', lastLineCommentStart);
    if (newlineAfterComment === -1 || index <= newlineAfterComment) {
      const lineStart = before.lastIndexOf('\n', lastLineCommentStart);
      if (lineStart < lastLineCommentStart) {
        return 'text-slate-500 italic';
      }
    }
  }
  
  let inString = false;
  let stringChar = '';
  for (let i = 0; i < index; i++) {
    if (code[i] === '\\' && i + 1 < code.length) { i++; continue; }
    if (!inString && (code[i] === '"' || code[i] === "'")) {
      inString = true;
      stringChar = code[i];
    } else if (inString && code[i] === stringChar) {
      inString = false;
    }
  }
  if (inString || code[index] === '"' || code[index] === "'") {
    return 'text-green-400';
  }
  
  const lineStart = code.lastIndexOf('\n', index - 1) + 1;
  const lineText = code.substring(lineStart);
  if (lineText.trimStart().startsWith('#')) {
    return 'text-amber-400';
  }
  
  if (/[0-9]/.test(code[index])) {
    return 'text-orange-300';
  }
  
  if (/[a-zA-Z_]/.test(code[index])) {
    let wordStart = index;
    while (wordStart > 0 && /[a-zA-Z0-9_]/.test(code[wordStart - 1])) wordStart--;
    let wordEnd = index;
    while (wordEnd < code.length - 1 && /[a-zA-Z0-9_]/.test(code[wordEnd + 1])) wordEnd++;
    const word = code.substring(wordStart, wordEnd + 1);
    
    if (C_KW.has(word)) {
      if (['int','char','float','double','void','short','long','unsigned','signed','size_t','FILE'].includes(word)) {
        return 'text-cyan-300';
      }
      if (['NULL','EOF','true','false'].includes(word)) {
        return 'text-orange-400 font-semibold';
      }
      if (['include','define','ifndef','ifdef','endif','pragma'].includes(word)) {
        return 'text-amber-400';
      }
      return 'text-purple-400 font-semibold';
    }
    
    let afterWord = wordEnd + 1;
    while (afterWord < code.length && code[afterWord] === ' ') afterWord++;
    if (afterWord < code.length && code[afterWord] === '(') {
      return 'text-blue-400';
    }
    
    return 'text-slate-200';
  }
  
  if ('+-*/%=<>&|^!~?:'.includes(code[index])) {
    return 'text-sky-300';
  }
  
  if ('(){}[];,.'.includes(code[index])) {
    return 'text-slate-400';
  }
  
  return 'text-slate-200';
}

interface CodeTypingPracticeProps {
  onClose?: () => void;
  initialCode?: string;
  initialCodeName?: string;
  autoStart?: boolean;
  memorizeMode?: boolean;
  memorizeDuration?: number;
}

export function CodeTypingPractice({
  onClose,
  initialCode,
  initialCodeName = '章节代码',
  autoStart = false,
  memorizeMode = false,
  memorizeDuration = 10
}: CodeTypingPracticeProps) {
  const [targetCode, setTargetCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showPresets, setShowPresets] = useState(!initialCode);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundType, setSoundType] = useState<'mechanical' | 'typewriter' | 'soft' | 'bubble'>('mechanical');
  const [soundVolume, setSoundVolume] = useState(0.3);
  const [showSoundSettings, setShowSoundSettings] = useState(false);
  const [typingStats, setTypingStats] = useState<TypingStats>(loadStats());
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPresetName, setSelectedPresetName] = useState('');
  const [isMemorizeMode, setIsMemorizeMode] = useState(false);
  const [memorizeTime, setMemorizeTime] = useState(10);
  const [memorizeCountdown, setMemorizeCountdown] = useState(0);
  const [memorizeStarted, setMemorizeStarted] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | '入门' | '基础' | '中级' | '高级'>('all');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const codeDisplayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const currentIndex = userInput.length;
  const isFinished = currentIndex >= targetCode.length && targetCode.length > 0;
  const isStarted = startTime !== null;

  useEffect(() => {
    if (initialCode) {
      const processed = initialCode.replace(/\t/g, '    ');
      setTargetCode(processed);
      setSelectedPresetName(initialCodeName);
      if (!autoStart) {
        setShowPresets(false);
      }
      if (memorizeMode) {
        setMemorizeTime(memorizeDuration);
        setMemorizeCountdown(memorizeDuration);
        setMemorizeStarted(true);
        setIsMemorizeMode(true);
      }
    }
  }, [initialCode, initialCodeName, autoStart, memorizeMode, memorizeDuration]);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isFinished && !endTime) {
      setEndTime(Date.now());

      const record: TypingRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        codeName: selectedPresetName || '自定义代码',
        codeLength: targetCode.length,
        cpm: stats.cpm,
        accuracy: stats.accuracy,
        elapsed: stats.elapsed,
        totalErrors: totalErrors,
        perfectRun: stats.accuracy === 100 && totalErrors === 0,
      };
      const newStats = saveRecord(record);
      setTypingStats(newStats);

      if (stats.accuracy === 100 && totalErrors === 0) {
        soundEngine.playComplete();
      }
    }
  }, [isFinished, endTime]);

  useEffect(() => {
    if (targetCode && containerRef.current) {
      containerRef.current.focus();
    }
  }, [targetCode]);

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
    soundEngine.setSoundType(soundType);
    soundEngine.setVolume(soundVolume);
  }, [soundEnabled, soundType, soundVolume]);

  useEffect(() => {
    if (memorizeStarted && memorizeCountdown > 0) {
      const timer = setTimeout(() => setMemorizeCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (memorizeStarted && memorizeCountdown === 0 && isMemorizeMode) {
      setMemorizeStarted(false);
      setIsMemorizeMode(false);
    }
  }, [memorizeStarted, memorizeCountdown, isMemorizeMode]);

  const stats = useMemo(() => {
    if (!startTime) return { wpm: 0, cpm: 0, accuracy: 100, elapsed: 0 };
    
    const now = endTime || Date.now();
    const elapsedMs = now - startTime;
    const elapsedMin = elapsedMs / 60000;
    const elapsedSec = elapsedMs / 1000;
    
    const correctChars = userInput.split('').filter((ch, i) => ch === targetCode[i]).length;
    const cpm = elapsedMin > 0 ? Math.round(correctChars / elapsedMin) : 0;
    const wpm = Math.round(cpm / 5);
    const accuracy = currentIndex > 0 ? Math.round((correctChars / currentIndex) * 100) : 100;
    
    return { wpm, cpm, accuracy, elapsed: Math.round(elapsedSec) };
  }, [startTime, endTime, userInput, targetCode, currentIndex]);

  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (!startTime || isFinished || isPaused) return;
    const timer = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(timer);
  }, [startTime, isFinished, isPaused]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isFinished || isPaused || isComposing) return;
    if (isMemorizeMode && memorizeCountdown > 0) return;

    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape',
         'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
         'Home', 'End', 'PageUp', 'PageDown',
         'Insert', 'Delete', 'F1', 'F2', 'F3', 'F4', 'F5',
         'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(e.key)) {
      return;
    }

    e.preventDefault();

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (e.key === 'Backspace') {
      soundEngine.init();
      soundEngine.playBackspace();
      setUserInput(prev => prev.slice(0, -1));
      return;
    }

    if (e.key === 'Tab') {
      soundEngine.init();
      soundEngine.playKey();
      const remaining = targetCode.substring(currentIndex);
      const spacesMatch = remaining.match(/^( {1,4})/);
      if (spacesMatch) {
        setUserInput(prev => prev + spacesMatch[1]);
      } else {
        setUserInput(prev => prev + '    ');
      }
      return;
    }

    if (e.key === 'Enter') {
      soundEngine.init();
      soundEngine.playEnter();
      if (currentIndex < targetCode.length && targetCode[currentIndex] === '\n') {
        setUserInput(prev => prev + '\n');
      } else {
        setUserInput(prev => prev + '\n');
      }
      return;
    }

    if (e.key.length === 1) {
      soundEngine.init();
      const expectedChar = targetCode[currentIndex];
      if (e.key !== expectedChar) {
        soundEngine.playError();
        setTotalErrors(prev => prev + 1);
      } else {
        soundEngine.playKey();
      }
      setUserInput(prev => prev + e.key);
    }
  }, [isFinished, isPaused, isComposing, startTime, targetCode, currentIndex]);

  const selectPreset = useCallback((code: string, name: string = '自定义代码', startMemorize: boolean = false) => {
    const processedCode = code.replace(/\t/g, '    ');
    setTargetCode(processedCode);
    setSelectedPresetName(name);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setTotalErrors(0);
    setShowPresets(false);
    setIsPaused(false);

    if (startMemorize && !isStarted) {
      setIsMemorizeMode(true);
      setMemorizeCountdown(memorizeTime);
      setMemorizeStarted(true);
    } else {
      setIsMemorizeMode(false);
    }
  }, [memorizeTime, isStarted]);

  const useCustomCode = useCallback(() => {
    if (!customCode.trim()) return;
    selectPreset(customCode);
    setShowCustomInput(false);
    setCustomCode('');
  }, [customCode, selectPreset]);

  const restart = useCallback(() => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setTotalErrors(0);
    setIsPaused(false);
    containerRef.current?.focus();
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}分${s}秒` : `${s}秒`;
  };

  const renderCode = useMemo(() => {
    if (!targetCode) return null;

    const elements: JSX.Element[] = [];
    let lineNum = 1;

    elements.push(
      <span key={`ln-${lineNum}`} className="inline-block w-8 text-right mr-4 text-slate-700 select-none text-xs">
        {lineNum}
      </span>
    );

    for (let i = 0; i < targetCode.length; i++) {
      const char = targetCode[i];
      let displayChar = char;
      let className = '';
      let isCurrentCursor = i === currentIndex;

      if (i < userInput.length) {
        if (userInput[i] === targetCode[i]) {
          className = getCharClass(targetCode, i);
        } else {
          className = 'bg-red-500/30 text-red-300';
          displayChar = userInput[i] === '\n' ? '↵' : userInput[i];
        }
      } else if (isCurrentCursor) {
        className = 'text-slate-500 border-l-2 border-cyan-400 animate-pulse';
      } else {
        className = 'text-slate-700';
      }

      if (char === '\n') {
        if (isCurrentCursor) {
          elements.push(
            <span key={`cursor-${i}`} ref={cursorRef} className="border-l-2 border-cyan-400 animate-pulse">
              {' '}
            </span>
          );
        }
        elements.push(<br key={`br-${i}`} />);
        lineNum++;
        elements.push(
          <span key={`ln-${lineNum}`} className="inline-block w-8 text-right mr-4 text-slate-700 select-none text-xs">
            {lineNum}
          </span>
        );
      } else {
        elements.push(
          <span
            key={i}
            ref={isCurrentCursor ? cursorRef : undefined}
            className={className}
          >
            {displayChar === ' ' ? '\u00A0' : displayChar}
          </span>
        );
      }
    }

    if (currentIndex === targetCode.length && !isFinished) {
      elements.push(
        <span key="cursor-end" ref={cursorRef} className="border-l-2 border-cyan-400 animate-pulse">
          {'\u00A0'}
        </span>
      );
    }

    return elements;
  }, [targetCode, userInput, currentIndex, isFinished]);

  const progress = targetCode.length > 0 ? (currentIndex / targetCode.length) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-3">
          <Keyboard className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold text-white">代码跟打练习</span>
          {targetCode && (
            <span className="text-xs text-slate-400">
              {currentIndex} / {targetCode.length} 字符
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300"
          >
            📊 历史记录
          </button>
          <div className="relative">
            <button
              onClick={() => {
                if (!soundEnabled) {
                  soundEngine.init();
                }
                setShowSoundSettings(!showSoundSettings);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300"
            >
              {soundEnabled ? '🔊' : '🔇'} 音效
            </button>

            {showSoundSettings && (
              <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 z-50 w-64">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-300">打字音效</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-10 h-5 rounded-full transition-colors ${soundEnabled ? 'bg-cyan-500' : 'bg-slate-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {soundEnabled && (
                  <>
                    <div className="mb-3">
                      <span className="text-xs text-slate-400 block mb-1.5">音色</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'mechanical' as const, name: '机械键盘', emoji: '⌨️' },
                          { id: 'typewriter' as const, name: '打字机', emoji: '🖨️' },
                          { id: 'soft' as const, name: '轻柔', emoji: '🔔' },
                          { id: 'bubble' as const, name: '气泡', emoji: '💧' },
                        ].map(s => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSoundType(s.id);
                              soundEngine.init();
                              soundEngine.setSoundType(s.id);
                              soundEngine.playKey();
                            }}
                            className={`p-2 rounded-lg text-xs text-center transition-colors ${
                              soundType === s.id
                                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                                : 'bg-slate-700 border border-slate-600 text-slate-400 hover:bg-slate-600'
                            }`}
                          >
                            {s.emoji} {s.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-1.5">音量</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">🔈</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={soundVolume * 100}
                          onChange={(e) => setSoundVolume(Number(e.target.value) / 100)}
                          className="flex-1 accent-cyan-500 h-1"
                        />
                        <span className="text-xs text-slate-500">🔊</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {showSoundSettings && (
            <div className="fixed inset-0 z-40" onClick={() => setShowSoundSettings(false)} />
          )}
          {targetCode && (
            <>
              <button
                onClick={restart}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重新开始
              </button>
              <button
                onClick={() => { setShowPresets(true); setTargetCode(''); }}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300"
              >
                换一段
              </button>
            </>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-slate-700 rounded">
              ✕
            </button>
          )}
        </div>
      </div>

      {targetCode && (
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {targetCode && isStarted && (
        <div className="flex items-center gap-6 px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">{formatTime(stats.elapsed)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">{stats.cpm} 字符/分</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-green-400" />
            <span className={stats.accuracy >= 95 ? 'text-green-400' : stats.accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'}>
              {stats.accuracy}% 正确率
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-slate-300">{totalErrors} 次错误</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {showPresets ? (
          <div className="p-6 overflow-auto h-full">
            <h2 className="text-lg font-semibold mb-1">选择练习代码</h2>
            <p className="text-sm text-slate-400 mb-4">选择一段代码开始跟打练习，或者粘贴自己的代码</p>

            <div className="flex flex-wrap gap-3 mb-4 p-4 bg-slate-800 rounded-xl border border-slate-700">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-slate-400 block mb-1.5">难度筛选</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as typeof difficultyFilter)}
                  className="w-full bg-slate-900 text-slate-200 text-sm p-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">全部难度</option>
                  <option value="入门">入门</option>
                  <option value="基础">基础</option>
                  <option value="中级">中级</option>
                  <option value="高级">高级</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-slate-400 block mb-1.5">默写模式</label>
                <select
                  value={memorizeTime}
                  onChange={(e) => setMemorizeTime(Number(e.target.value))}
                  className="w-full bg-slate-900 text-slate-200 text-sm p-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                >
                  <option value={0}>关闭</option>
                  <option value={5}>5秒</option>
                  <option value={10}>10秒</option>
                  <option value={15}>15秒</option>
                  <option value={20}>20秒</option>
                  <option value={30}>30秒</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="w-full mb-4 p-3 border-2 border-dashed border-slate-600 hover:border-cyan-500 rounded-xl text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              📋 粘贴自定义代码
            </button>

            {showCustomInput && (
              <div className="mb-4 p-4 bg-slate-800 rounded-xl border border-slate-700">
                <textarea
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="在此粘贴你要练习的C代码..."
                  className="w-full h-40 bg-slate-900 text-slate-200 font-mono text-sm p-3 rounded-lg border border-slate-700 focus:border-cyan-500 focus:outline-none resize-none mb-2"
                  spellCheck={false}
                />
                <button
                  onClick={useCustomCode}
                  disabled={!customCode.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 rounded-lg text-white text-sm font-medium"
                >
                  开始练习
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRESET_CODES.filter(p => difficultyFilter === 'all' || p.difficulty === difficultyFilter).map((preset, index) => {
                const pb = getPersonalBest(preset.name);
                return (
                <button
                  key={index}
                  onClick={() => selectPreset(preset.code, preset.name, memorizeTime > 0)}
                  className="text-left p-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {preset.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {pb && <span className="text-xs text-amber-400">🏆{pb.cpm}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        preset.difficulty === '入门' ? 'bg-green-500/10 text-green-400' :
                        preset.difficulty === '基础' ? 'bg-blue-500/10 text-blue-400' :
                        preset.difficulty === '中级' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {preset.difficulty}
                      </span>
                    </div>
                  </div>
                  <pre className="text-xs text-slate-500 font-mono overflow-hidden" style={{ maxHeight: '60px' }}>
                    {preset.code.substring(0, 120)}...
                  </pre>
                  <div className="text-xs text-slate-600 mt-2">
                    {preset.code.length} 字符 · {preset.code.split('\n').length} 行
                  </div>
                </button>)})}
            </div>
          </div>
        ) : isFinished ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-slate-800 rounded-2xl border border-slate-700 max-w-md">
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">练习完成！</h2>
              <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                <div className="p-3 bg-slate-900 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-400">{stats.cpm}</div>
                  <div className="text-xs text-slate-400">字符/分钟</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <div className={`text-2xl font-bold ${stats.accuracy >= 95 ? 'text-green-400' : stats.accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {stats.accuracy}%
                  </div>
                  <div className="text-xs text-slate-400">正确率</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <div className="text-2xl font-bold text-slate-200">{formatTime(stats.elapsed)}</div>
                  <div className="text-xs text-slate-400">用时</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <div className="text-2xl font-bold text-red-400">{totalErrors}</div>
                  <div className="text-xs text-slate-400">总错误数</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={restart} className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm font-medium">
                  再练一次
                </button>
                <button onClick={() => { setShowPresets(true); setTargetCode(''); }} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-sm font-medium">
                  换一段
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="h-full overflow-auto p-6 focus:outline-none cursor-text"
            style={{ caretColor: 'transparent' }}
          >
            {isMemorizeMode && memorizeCountdown > 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-8xl font-bold text-cyan-400 mb-4">{memorizeCountdown}</div>
                <div className="text-xl text-slate-300 mb-2">默写模式</div>
                <div className="text-sm text-slate-500">记住代码后开始默写</div>
              </div>
            ) : !isStarted ? (
              <div className="text-center text-slate-500 text-sm mb-4 py-2 bg-slate-800/50 rounded-lg">
                💡 点击此区域，然后开始打字（请切换到英文输入法）
              </div>
            ) : null}
            <pre
              ref={codeDisplayRef}
              className="font-mono leading-7 text-base select-none"
              style={{ tabSize: 4 }}
            >
              {renderCode}
            </pre>
          </div>
        )}
      </div>

      {showHistory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                📊 练习历史
              </h2>
              <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 p-4 border-b border-slate-700">
              <div className="bg-slate-900 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-cyan-400">{typingStats.totalSessions}</div>
                <div className="text-xs text-slate-500">总练习次数</div>
              </div>
              <div className="bg-slate-900 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-green-400">{typingStats.bestCpm}</div>
                <div className="text-xs text-slate-500">最高速度</div>
              </div>
              <div className="bg-slate-900 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-amber-400">{typingStats.avgCpm}</div>
                <div className="text-xs text-slate-500">平均速度</div>
              </div>
              <div className="bg-slate-900 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-purple-400">{typingStats.avgAccuracy}%</div>
                <div className="text-xs text-slate-500">平均正确率</div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {typingStats.records.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  暂无练习记录，开始你的第一次练习吧！
                </div>
              ) : (
                <div className="space-y-2">
                  {typingStats.records.slice(0, 20).map((record, i) => (
                    <div
                      key={record.id}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        record.perfectRun ? 'bg-green-500/5 border border-green-500/20' : 'bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-600">{i + 1}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-200">{record.codeName}</span>
                            {record.perfectRun && <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">满分</span>}
                          </div>
                          <div className="text-xs text-slate-500">
                            {new Date(record.date).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-400">{record.cpm} 字符/分</span>
                        <span className={record.accuracy >= 95 ? 'text-green-400' : record.accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                          {record.accuracy}%
                        </span>
                        <span className="text-slate-500">{formatTime(record.elapsed)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
