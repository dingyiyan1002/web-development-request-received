import { Question, CodeLineAnalysis, MemoryVisualization } from './lessons';

const DIFFICULTY_LABELS: Record<number, { text: string; class: string }> = {
  1: { text: '⭐ 基础', class: 'diff-easy' },
  2: { text: '⭐⭐ 进阶', class: 'diff-medium' },
  3: { text: '⭐⭐⭐ 困难', class: 'diff-hard' },
  4: { text: '💀 地狱', class: 'diff-hell' },
  5: { text: '💀💀 专家', class: 'diff-hell' }
};

const KNOWLEDGE_TAGS: Record<string, string[]> = {
  basics: ['基础语法', '变量声明', '数据类型'],
  variables: ['变量', '作用域', '生命周期'],
  operators: ['运算符', '位操作', '优先级'],
  control: ['控制流', '条件判断', '循环'],
  functions: ['函数', '参数传递', '返回值'],
  arrays: ['数组', '索引访问', '内存布局'],
  pointers: ['指针', '解引用', '地址操作'],
  memory: ['内存管理', '动态分配', '堆栈'],
  interview: ['面试题', '算法', '数据结构'],
  linux: ['Linux', '系统调用', '进程线程'],
  'linux-cmds': ['Linux命令', 'Shell', '文本处理'],
  embedded: ['嵌入式', '寄存器', '硬件交互'],
  cpp: ['C++', '面向对象', 'STL']
};

const COMMON_MISTAKES: Record<string, string[]> = {
  pointers: [
    '混淆*p和p：p是地址，*p是值',
    '忘记初始化指针导致野指针',
    '解引用空指针导致段错误',
    '指针运算忘记乘以sizeof(类型)'
  ],
  memory: [
    '忘记free导致内存泄漏',
    'free后继续使用悬空指针',
    '重复free同一块内存',
    'malloc返回值未检查NULL'
  ],
  arrays: [
    '数组越界访问',
    '混淆数组长度和最大下标',
    '忘记字符串结尾的\\0',
    'sizeof(指针)不等于数组大小'
  ],
  functions: [
    '忘记函数返回值',
    '参数类型不匹配',
    '递归没有终止条件',
    '返回局部变量地址'
  ]
};

const RELATED_CONCEPTS: Record<string, string[]> = {
  pointers: ['指针运算', '多级指针', '函数指针', 'const指针', 'void指针'],
  memory: ['内存对齐', '内存池', '内存屏障', 'DMA', '缓存一致性'],
  arrays: ['多维数组', '变长数组', '柔性数组', '字符串操作'],
  functions: ['递归', '回调函数', '可变参数', '内联函数', '尾递归优化']
};

export function enhanceQuestionTo369Format(q: Question): Question {
  // 总是增强题目，确保所有题目都有完整数据
  const enhanced: Question = { ...q };

  enhanced.knowledgePoints = generateKnowledgePoints(q);
  
  enhanced.hint = generateSmartHint(q);
  
  enhanced.commonMistakes = COMMON_MISTAKES[q.chapter] || [];
  
  enhanced.relatedConcepts = RELATED_CONCEPTS[q.chapter] || [];
  
  if (q.code) {
    enhanced.lineAnalysis = generateDetailedLineAnalysis(q.code, q.chapter);
  }
  
  if (q.code && shouldHaveMemoryViz(q)) {
    enhanced.memoryViz = generateDetailedMemoryViz(q.code, q.chapter);
  }

  return enhanced;
}

function generateKnowledgePoints(q: Question): string[] {
  const basePoints = KNOWLEDGE_TAGS[q.chapter] || ['编程基础'];
  const points: string[] = [...basePoints];
  
  if (q.code) {
    const code = q.code;
    
    if (code.includes('printf')) points.push('格式化输出');
    if (code.includes('scanf')) points.push('格式化输入');
    if (code.includes('malloc')) points.push('动态内存分配');
    if (code.includes('free')) points.push('内存释放');
    if (code.includes('struct')) points.push('结构体');
    if (code.includes('union')) points.push('联合体');
    if (code.includes('enum')) points.push('枚举');
    if (code.includes('typedef')) points.push('类型定义');
    if (code.includes('const')) points.push('const修饰符');
    if (code.includes('static')) points.push('static修饰符');
    if (code.includes('volatile')) points.push('volatile修饰符');
    if (code.includes('fork')) points.push('进程创建');
    if (code.includes('pthread')) points.push('多线程');
    if (code.includes('socket')) points.push('网络编程');
    if (code.includes('class')) points.push('类');
    if (code.includes('template')) points.push('模板');
    if (code.includes('virtual')) points.push('虚函数');
    if (code.includes('override')) points.push('重写');
    if (/\*\s*\w+/.test(code)) points.push('指针操作');
    if (/&\s*\w+/.test(code)) points.push('取地址');
    if (/<<|>>/.test(code)) points.push('位运算');
    if (/&&|\|\|/.test(code)) points.push('逻辑运算');
  }
  
  return [...new Set(points)].slice(0, 5);
}

function generateSmartHint(q: Question): string {
  if (q.type === 'fill' && q.blanks && q.blanks.length > 0) {
    const hint = q.blanks[0].hint;
    if (hint && hint.length > 0) {
      return hint;
    }
  }
  
  if (q.type === 'output') {
    const hints = [
      '仔细分析代码的执行流程，注意变量的变化过程',
      '追踪每个变量的值变化，特别注意指针解引用',
      '按行执行代码，记录每步后变量的状态',
      '注意运算符优先级和结合性',
      '检查是否有边界条件或特殊情况'
    ];
    
    if (q.code) {
      if (q.code.includes('*')) {
        return '追踪指针的指向关系，*p就是p指向的值';
      }
      if (q.code.includes('&')) {
        return '&是取地址，返回变量的内存地址';
      }
      if (q.code.includes('malloc')) {
        return 'malloc在堆区分配内存，返回指针';
      }
      if (q.code.includes('for') || q.code.includes('while')) {
        return '逐步追踪循环变量的变化';
      }
    }
    
    return hints[Math.floor(Math.random() * hints.length)];
  }
  
  if (q.type === 'debug') {
    return '找出代码中的错误行，思考正确写法应该是什么';
  }
  
  return '仔细阅读代码，理解其执行逻辑';
}

function shouldHaveMemoryViz(q: Question): boolean {
  if (!q.code) return false;
  
  // 所有输出预测题都生成内存可视化
  if (q.type === 'output') return true;
  
  const vizChapters = ['pointers', 'memory', 'arrays'];
  if (vizChapters.includes(q.chapter)) return true;
  
  if (q.code.includes('*') || q.code.includes('&') || q.code.includes('malloc') || q.code.includes('struct')) {
    return true;
  }
  
  return false;
}

function generateDetailedLineAnalysis(code: string, chapter: string): CodeLineAnalysis[] {
  const lines = code.split('\n');
  const analysis: CodeLineAnalysis[] = [];
  
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      analysis.push({ num: i + 1, explanation: '空行' });
      return;
    }
    
    const result = analyzeLineDetailed(trimmed, chapter, i + 1);
    analysis.push({
      num: i + 1,
      explanation: result.explanation,
      memoryChange: result.memoryChange,
      highlight: result.highlight
    });
  });
  
  return analysis;
}

function analyzeLineDetailed(line: string, _chapter: string, _lineNum: number): { explanation: string; memoryChange?: string; highlight?: boolean } {
  if (line.startsWith('//')) {
    return { explanation: `注释：${line.slice(2).trim()}` };
  }
  
  if (line.startsWith('/*') || line.endsWith('*/')) {
    return { explanation: `多行注释` };
  }
  
  if (line.startsWith('#include')) {
    return { explanation: `包含头文件：引入标准库或自定义头文件` };
  }
  
  if (line.startsWith('#define')) {
    const match = line.match(/#define\s+(\w+)\s+(.+)/);
    if (match) {
      return { explanation: `宏定义：${match[1]} = ${match[2]}` };
    }
    return { explanation: `宏定义` };
  }
  
  if (/^(int|char|short|long|float|double|void)\s+(\w+)\s*\(/.test(line)) {
    const match = line.match(/^(int|char|short|long|float|double|void)\s+(\w+)\s*\(/);
    if (match) {
      return { explanation: `函数定义：返回${match[1]}类型的函数 ${match[2]}()` };
    }
  }
  
  if (/^(uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t|size_t)\s+(\w+)\s*=\s*(.+)/.test(line)) {
    const match = line.match(/^(uint\d+_t|int\d+_t|size_t)\s+(\w+)\s*=\s*(.+)/);
    if (match) {
      return {
        explanation: `声明${match[1]}类型变量 ${match[2]}，初始值为 ${match[3].replace(';', '')}。嵌入式常用类型，明确位宽。`,
        memoryChange: `${match[2]} = ${match[3].replace(';', '')}`
      };
    }
  }
  
  if (/^(int|char|short|long)\s+(\w+)\s*=\s*(\d+)/.test(line)) {
    const match = line.match(/^(int|char|short|long)\s+(\w+)\s*=\s*(\d+)/);
    if (match) {
      const bytes = match[1] === 'char' ? 1 : match[1] === 'short' ? 2 : match[1] === 'long' ? 8 : 4;
      return {
        explanation: `声明${match[1]}型变量 ${match[2]}，初始值 ${match[3]}。占用${bytes}字节内存。`,
        memoryChange: `${match[2]} = ${match[3]}`
      };
    }
  }
  
  if (/^(int|char|uint32_t)\s*\*\s*(\w+)\s*=\s*&(\w+)/.test(line)) {
    const match = line.match(/^(int|char|uint32_t)\s*\*\s*(\w+)\s*=\s*&(\w+)/);
    if (match) {
      return {
        explanation: `【重点】声明指针 ${match[2]}，指向变量 ${match[3]}。${match[2]}存储的是${match[3]}的内存地址。`,
        memoryChange: `${match[2]} = &${match[3]}`,
        highlight: true
      };
    }
  }
  
  if (/^(int|char|uint32_t)\s*\*\s*(\w+)\s*=\s*(\w+)/.test(line)) {
    const match = line.match(/^(int|char|uint32_t)\s*\*\s*(\w+)\s*=\s*(\w+)/);
    if (match) {
      return {
        explanation: `声明指针 ${match[2]}，指向数组 ${match[3]} 的首元素。数组名就是首元素地址。`,
        memoryChange: `${match[2]} = ${match[3]}`
      };
    }
  }
  
  if (/\*(\w+)\s*=\s*(.+)/.test(line) && !line.includes('int *') && !line.includes('char *') && !line.includes('uint32_t *')) {
    const match = line.match(/\*(\w+)\s*=\s*(.+)/);
    if (match) {
      return {
        explanation: `【重点】解引用指针 ${match[1]}，修改其指向的内存为 ${match[2].replace(';', '')}。这是指针的核心用途——间接修改。`,
        memoryChange: `*${match[1]} = ${match[2].replace(';', '')}`,
        highlight: true
      };
    }
  }
  
  if (/printf\s*\(/.test(line)) {
    const formatMatch = line.match(/printf\s*\(\s*"([^"]*)"/);
    if (formatMatch) {
      const format = formatMatch[1];
      const hasPercent = format.includes('%');
      return { 
        explanation: `格式化输出：${hasPercent ? '按格式输出变量值' : `输出字符串 "${format}"`}` 
      };
    }
    return { explanation: '格式化输出：将数据按指定格式打印到标准输出' };
  }
  
  if (/scanf\s*\(/.test(line)) {
    return { explanation: '格式化输入：从标准输入读取数据，参数必须传地址(&变量)' };
  }
  
  if (/malloc\s*\(/.test(line)) {
    const match = line.match(/malloc\s*\(\s*(\d+)\s*\)/);
    if (match) {
      return {
        explanation: `【重点】动态分配 ${match[1]} 字节堆内存，返回指针。必须检查返回值是否为NULL！`,
        memoryChange: '堆区分配内存',
        highlight: true
      };
    }
    return { explanation: '动态分配堆内存，返回void*指针' };
  }
  
  if (/free\s*\(/.test(line)) {
    const match = line.match(/free\s*\(\s*(\w+)\s*\)/);
    if (match) {
      return {
        explanation: `【重点】释放指针 ${match[1]} 指向的堆内存。释放后应将指针置NULL避免悬空指针！`,
        memoryChange: '释放堆内存',
        highlight: true
      };
    }
    return { explanation: '释放动态分配的内存' };
  }
  
  if (/return\s+/.test(line)) {
    const match = line.match(/return\s+(.+);/);
    if (match) {
      return { explanation: `函数返回值：${match[1]}` };
    }
    return { explanation: '函数返回' };
  }
  
  if (/if\s*\(/.test(line)) {
    const condMatch = line.match(/if\s*\(\s*(.+)\s*\)/);
    if (condMatch) {
      return { explanation: `条件判断：如果 ${condMatch[1]} 为真，执行代码块` };
    }
    return { explanation: '条件判断' };
  }
  
  if (/else\s*if/.test(line)) {
    return { explanation: '否则如果：继续条件判断' };
  }
  
  if (/else\s*{/.test(line)) {
    return { explanation: '否则分支：当所有if条件都不满足时执行' };
  }
  
  if (/for\s*\(/.test(line)) {
    return { explanation: 'for循环：初始化 → 条件判断 → 循环体 → 迭代' };
  }
  
  if (/while\s*\(/.test(line)) {
    const condMatch = line.match(/while\s*\(\s*(.+)\s*\)/);
    if (condMatch) {
      return { explanation: `while循环：当 ${condMatch[1]} 为真时重复执行` };
    }
    return { explanation: 'while循环' };
  }
  
  if (/do\s*{/.test(line)) {
    return { explanation: 'do-while循环：先执行一次，再判断条件' };
  }
  
  if (/switch\s*\(/.test(line)) {
    return { explanation: 'switch分支：根据值选择执行路径' };
  }
  
  if (/case\s+/.test(line)) {
    const match = line.match(/case\s+(.+):/);
    if (match) {
      return { explanation: `case分支：当值为 ${match[1]} 时执行` };
    }
    return { explanation: 'case分支' };
  }
  
  if (/break;/.test(line)) {
    return { explanation: '跳出循环或switch' };
  }
  
  if (/continue;/.test(line)) {
    return { explanation: '跳过本次循环，继续下一次迭代' };
  }
  
  if (/(\w+)\+\+/.test(line) || /\+\+(\w+)/.test(line)) {
    const match = line.match(/(\w+)\+\+/) || line.match(/\+\+(\w+)/);
    if (match) {
      const isPrefix = line.includes('++' + match[1]);
      return { 
        explanation: `自增运算：${match[1]} ${isPrefix ? '先加1再使用' : '先使用再加1'}` 
      };
    }
  }
  
  if (/(\w+)--/.test(line) || /--(\w+)/.test(line)) {
    const match = line.match(/(\w+)--/) || line.match(/--(\w+)/);
    if (match) {
      const isPrefix = line.includes('--' + match[1]);
      return { 
        explanation: `自减运算：${match[1]} ${isPrefix ? '先减1再使用' : '先使用再减1'}` 
      };
    }
  }
  
  if (/<<|>>/.test(line)) {
    return { explanation: '位移运算：嵌入式常用，用于位操作和快速乘除' };
  }
  
  if (/&=.*~/.test(line)) {
    return { 
      explanation: '【重点】位清零操作：嵌入式常用，清除特定位',
      highlight: true
    };
  }
  
  if (/\|=/.test(line)) {
    return { 
      explanation: '【重点】位置位操作：嵌入式常用，设置特定位',
      highlight: true
    };
  }
  
  if (/^struct\s+\w+/.test(line)) {
    return { explanation: '结构体定义：将多个变量组合成一个整体' };
  }
  
  if (/^typedef\s+struct/.test(line)) {
    return { explanation: '类型定义：为结构体创建别名' };
  }
  
  if (/->/.test(line)) {
    const match = line.match(/(\w+)->(\w+)/);
    if (match) {
      return { explanation: `结构体指针成员访问：${match[1]}->${match[2]} 等价于 (*${match[1]}).${match[2]}` };
    }
  }
  
  return { explanation: `执行：${line}` };
}

function generateDetailedMemoryViz(code: string, _chapter: string): MemoryVisualization {
  const cells: MemoryVisualization['cells'] = [];
  let varAddr = 0x1000;
  let ptrAddr = 0x2000;
  let arrAddr = 0x3000;
  
  const intVarMatches = code.matchAll(/(?:int|uint32_t|int32_t)\s+(\w+)\s*=\s*(\d+|0x[0-9a-fA-F]+)/g);
  for (const match of intVarMatches) {
    cells.push({
      name: match[1],
      address: `0x${varAddr.toString(16)}`,
      value: match[2],
      type: 'variable'
    });
    varAddr += 4;
  }
  
  const charVarMatches = code.matchAll(/char\s+(\w+)\s*=\s*['"](.+)['"]/g);
  for (const match of charVarMatches) {
    cells.push({
      name: match[1],
      address: `0x${varAddr.toString(16)}`,
      value: `'${match[2]}'`,
      type: 'variable'
    });
    varAddr += 1;
  }
  
  const ptrMatches = code.matchAll(/(?:int|char|uint32_t)\s*\*\s*(\w+)\s*=\s*&(\w+)/g);
  for (const match of ptrMatches) {
    const targetCell = cells.find(c => c.name === match[2]);
    cells.push({
      name: match[1],
      address: `0x${ptrAddr.toString(16)}`,
      value: targetCell?.address || '0x1000',
      type: 'pointer',
      pointsTo: match[2]
    });
    ptrAddr += 8;
  }
  
  const arrMatches = code.matchAll(/(?:int|uint32_t)\s+(\w+)\s*\[\s*\]?\s*=\s*\{([^}]+)\}/g);
  for (const match of arrMatches) {
    const values = match[2].split(',').map(v => v.trim());
    values.forEach((val, i) => {
      cells.push({
        name: `${match[1]}[${i}]`,
        address: `0x${arrAddr.toString(16)}`,
        value: val,
        type: 'array'
      });
      arrAddr += 4;
    });
  }
  
  const structMatches = code.matchAll(/struct\s*\{[^}]+\}\s+(\w+)\s*=\s*\{([^}]+)\}/g);
  for (const match of structMatches) {
    const values = match[2].split(',').map(v => v.trim());
    values.forEach((val, i) => {
      cells.push({
        name: `${match[1]}.${['field' + i]}`,
        address: `0x${varAddr.toString(16)}`,
        value: val,
        type: 'struct'
      });
      varAddr += 4;
    });
  }
  
  return { cells };
}

export function enhanceAllQuestions(questions: Question[]): Question[] {
  return questions.map(q => enhanceQuestionTo369Format(q));
}

export function getDifficultyLabel(difficulty: number): { text: string; class: string } {
  return DIFFICULTY_LABELS[difficulty] || DIFFICULTY_LABELS[1];
}
