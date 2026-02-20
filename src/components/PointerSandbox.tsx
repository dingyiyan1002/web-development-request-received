import { useState, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, Info, Bug, StepForward, ChevronRight, Gauge, Pause } from 'lucide-react';

type MemoryCell = {
  address: number;
  value: number | null;
  isPointer: boolean;
  pointsTo: number | null;
  variableName: string | null;
  isValid: boolean;
  isFreed: boolean;
  region: 'stack' | 'heap';
};

type Operation = {
  lineIndex: number;
  originalLine: number;
  code: string;
  description: string;
  memoryAfter: MemoryCell[];
  consoleOutput: string[];
  error?: string;
  warning?: string;
};

type Breakpoint = Set<number>;

const STACK_START = 0x7FFF0000;
const HEAP_START = 0x1000;
const STACK_SIZE = 8;
const HEAP_SIZE = 8;

const INITIAL_MEMORY = (): MemoryCell[] => {
  const memory: MemoryCell[] = [];
  for (let i = 0; i < STACK_SIZE; i++) {
    memory.push({
      address: STACK_START - i * 4,
      value: null,
      isPointer: false,
      pointsTo: null,
      variableName: null,
      isValid: true,
      isFreed: false,
      region: 'stack',
    });
  }
  for (let i = 0; i < HEAP_SIZE; i++) {
    memory.push({
      address: HEAP_START + i * 4,
      value: null,
      isPointer: false,
      pointsTo: null,
      variableName: null,
      isValid: true,
      isFreed: false,
      region: 'heap',
    });
  }
  return memory;
};

export function PointerSandbox() {
  const [code, setCode] = useState(`int main() {
    int a = 100;
    int *p = &a;
    printf("%d", *p);
    *p = 200;
    return 0;
}`);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [memory, setMemory] = useState<MemoryCell[]>(INITIAL_MEMORY());
  const [operations, setOperations] = useState<Operation[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [breakpoints, setBreakpoints] = useState<Breakpoint>(new Set());
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [speed, setSpeed] = useState(800);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speedOptions = [
    { label: '慢速', value: 1500, desc: '1.5秒/步' },
    { label: '正常', value: 800, desc: '0.8秒/步' },
    { label: '快速', value: 400, desc: '0.4秒/步' },
    { label: '极速', value: 150, desc: '0.15秒/步' },
  ];

  const examples = [
    {
      name: '基础指针',
      description: '声明变量、创建指针、解引用操作',
      code: `int main() {
    int a = 100;
    int *p = &a;
    printf("%d", *p);
    *p = 200;
    return 0;
}`,
    },
    {
      name: '野指针',
      description: '使用未初始化的指针会导致未定义行为',
      code: `int main() {
    int *p;
    printf("%d", *p);
    return 0;
}`,
    },
    {
      name: 'Use-After-Free',
      description: '释放内存后继续访问是严重错误',
      code: `int main() {
    int *p = malloc(4);
    *p = 42;
    free(p);
    printf("%d", *p);
    return 0;
}`,
    },
    {
      name: '数组与指针',
      description: '数组名是指向首元素的指针',
      code: `int main() {
    int arr[3] = {10, 20, 30};
    int *p = arr;
    printf("%d", *p);
    printf("%d", *(p + 1));
    return 0;
}`,
    },
    {
      name: '多级指针',
      description: '指向指针的指针',
      code: `int main() {
    int x = 42;
    int *p = &x;
    int **pp = &p;
    printf("%d", **pp);
    return 0;
}`,
    },
    {
      name: '内存泄漏',
      description: '分配内存但未释放',
      code: `int main() {
    int *p = malloc(4);
    *p = 100;
    return 0;
}`,
    },
    {
      name: '数组越界',
      description: '访问数组边界外的内存',
      code: `int main() {
    int arr[3] = {1, 2, 3};
    printf("%d", arr[5]);
    return 0;
}`,
    },
    {
      name: '双重释放',
      description: '同一块内存释放两次',
      code: `int main() {
    int *p = malloc(4);
    free(p);
    free(p);
    return 0;
}`,
    },
  ];

  const parseAndExecute = (sourceCode: string): Operation[] => {
    const allLines = sourceCode.split('\n');
    const ops: Operation[] = [];
    let currentMemory = JSON.parse(JSON.stringify(INITIAL_MEMORY()));
    let stackPointer = 0;
    let heapPointer = 0;
    const variables: Record<string, { address: number; type: 'int' | 'pointer'; isArray?: boolean; size?: number }> = {};
    let accumulatedConsole: string[] = [];

    for (let lineNum = 0; lineNum < allLines.length; lineNum++) {
      const rawLine = allLines[lineNum];
      const line = rawLine.trim();
      
      if (!line || line.startsWith('//') || line === '{' || line === '}') {
        continue;
      }

      let description = '';
      let errorMsg = '';
      let warningMsg = '';
      let stepConsole: string[] = [];

      try {
        if (line.startsWith('printf')) {
          const printfMatch = line.match(/printf\s*\(\s*"%d"\s*,\s*(.+)\s*\)\s*;/);
          if (printfMatch) {
            const expr = printfMatch[1].trim();
            
            if (expr.startsWith('**')) {
              const ptrName = expr.substring(2);
              if (!variables[ptrName]) {
                errorMsg = `错误：指针 ${ptrName} 未定义`;
              } else {
                const ptrCell = currentMemory.find((m: MemoryCell) => m.variableName === ptrName);
                if (ptrCell && ptrCell.pointsTo) {
                  const midCell = currentMemory.find((m: MemoryCell) => m.address === ptrCell.pointsTo);
                  if (midCell && midCell.pointsTo) {
                    const targetCell = currentMemory.find((m: MemoryCell) => m.address === midCell.pointsTo);
                    if (targetCell && targetCell.value !== null) {
                      stepConsole.push(targetCell.value.toString());
                      description = `打印 **${ptrName} = ${targetCell.value}`;
                    }
                  }
                }
              }
            }
            else if (expr.startsWith('*') && !expr.includes('[')) {
              let ptrName = expr.substring(1);
              let offset = 0;
              
              const ptrArithMatch = expr.match(/\*\((\w+)\s*\+\s*(\d+)\)/);
              if (ptrArithMatch) {
                ptrName = ptrArithMatch[1];
                offset = parseInt(ptrArithMatch[2]);
              }
              
              if (!variables[ptrName]) {
                errorMsg = `错误：指针 ${ptrName} 未定义`;
              } else if (variables[ptrName].type !== 'pointer') {
                errorMsg = `错误：${ptrName} 不是指针`;
              } else {
                const ptrCell = currentMemory.find((m: MemoryCell) => m.variableName === ptrName);
                if (ptrCell) {
                  if (ptrCell.pointsTo === null || ptrCell.pointsTo === undefined) {
                    errorMsg = `错误：指针 ${ptrName} 未初始化（野指针）`;
                  } else {
                    const targetAddr = ptrCell.pointsTo - offset * 4;
                    const targetCell = currentMemory.find((m: MemoryCell) => m.address === targetAddr);
                    if (targetCell) {
                      if (targetCell.isFreed) {
                        errorMsg = `严重错误：读取已释放内存 (Use-After-Free)`;
                      } else if (targetCell.value !== null) {
                        stepConsole.push(targetCell.value.toString());
                        if (offset > 0) {
                          description = `打印 *(${ptrName} + ${offset}) = ${targetCell.value}`;
                        } else {
                          description = `打印 *${ptrName} = ${targetCell.value}`;
                        }
                      }
                    }
                  }
                }
              }
            }
            else if (expr.includes('[')) {
              const arrMatch = expr.match(/(\w+)\[(\d+)\]/);
              if (arrMatch) {
                const arrName = arrMatch[1];
                const index = parseInt(arrMatch[2]);
                if (variables[arrName]) {
                  const varInfo = variables[arrName];
                  if (varInfo.isArray && varInfo.size && index >= varInfo.size) {
                    errorMsg = `严重错误：数组越界访问 ${arrName}[${index}]，数组大小为 ${varInfo.size}`;
                  } else {
                    const baseAddr = varInfo.address;
                    const targetAddr = baseAddr + index * 4;
                    const cell = currentMemory.find((m: MemoryCell) => m.address === targetAddr);
                    if (cell && cell.value !== null) {
                      stepConsole.push(cell.value.toString());
                      description = `打印 ${arrName}[${index}] = ${cell.value}`;
                    }
                  }
                }
              }
            }
            else if (variables[expr]) {
              const cell = currentMemory.find((m: MemoryCell) => m.variableName === expr);
              if (cell && cell.value !== null) {
                stepConsole.push(cell.value.toString());
                description = `打印 ${expr} = ${cell.value}`;
              }
            }
          }
        }
        else if (line.startsWith('free')) {
          const freeMatch = line.match(/free\s*\(\s*(\w+)\s*\)\s*;/);
          if (freeMatch) {
            const ptrName = freeMatch[1];
            if (!variables[ptrName]) {
              errorMsg = `错误：指针 ${ptrName} 未定义`;
            } else {
              const ptrCell = currentMemory.find((m: MemoryCell) => m.variableName === ptrName);
              if (ptrCell && ptrCell.pointsTo) {
                const targetCell = currentMemory.find((m: MemoryCell) => m.address === ptrCell.pointsTo);
                if (targetCell) {
                  if (targetCell.isFreed) {
                    errorMsg = `严重错误：双重释放 (Double Free)`;
                  } else {
                    targetCell.isFreed = true;
                    targetCell.value = null;
                    description = `释放 ${ptrName} 指向的内存`;
                    warningMsg = '警告：该内存已被释放，后续访问将导致错误';
                  }
                }
              }
            }
          }
        }
        else {
          const arrMatch = line.match(/int\s+(\w+)\[(\d+)\]\s*=\s*\{(.+)\};/);
          if (arrMatch) {
            const varName = arrMatch[1];
            const size = parseInt(arrMatch[2]);
            const values = arrMatch[3].split(',').map(v => parseInt(v.trim()));
            
            if (variables[varName]) {
              errorMsg = `错误：变量 ${varName} 已定义`;
            } else if (stackPointer + size > STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else {
              const baseAddr = currentMemory[stackPointer].address;
              for (let j = 0; j < size; j++) {
                currentMemory[stackPointer] = {
                  ...currentMemory[stackPointer],
                  value: values[j] || 0,
                  variableName: j === 0 ? varName : `${varName}[${j}]`,
                  isPointer: false,
                };
                stackPointer++;
              }
              variables[varName] = { 
                address: baseAddr, 
                type: 'int',
                isArray: true,
                size: size,
              };
              description = `在栈上分配数组 ${varName}[${size}]`;
            }
          }

          if (!arrMatch) {
            const arrDeclMatch = line.match(/int\s+(\w+)\[(\d+)\];/);
            if (arrDeclMatch) {
              const varName = arrDeclMatch[1];
              const size = parseInt(arrDeclMatch[2]);
              
              if (variables[varName]) {
                errorMsg = `错误：变量 ${varName} 已定义`;
              } else if (stackPointer + size > STACK_SIZE) {
                errorMsg = '错误：栈空间不足';
              } else {
                const baseAddr = currentMemory[stackPointer].address;
                for (let j = 0; j < size; j++) {
                  currentMemory[stackPointer] = {
                    ...currentMemory[stackPointer],
                    value: null,
                    variableName: j === 0 ? varName : `${varName}[${j}]`,
                    isPointer: false,
                  };
                  stackPointer++;
                }
                variables[varName] = { 
                  address: baseAddr, 
                  type: 'int',
                  isArray: true,
                  size: size,
                };
                description = `在栈上分配数组 ${varName}[${size}]（未初始化）`;
              }
            }
          }

          const intMatch = line.match(/int\s+(\w+)\s*=\s*(\d+);/);
          if (intMatch && !line.includes('[') && !line.includes('*')) {
            const varName = intMatch[1];
            const value = parseInt(intMatch[2]);
            
            if (variables[varName]) {
              errorMsg = `错误：变量 ${varName} 已定义`;
            } else if (stackPointer >= STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else {
              currentMemory[stackPointer] = {
                ...currentMemory[stackPointer],
                value,
                isPointer: false,
                variableName: varName,
              };
              variables[varName] = { address: currentMemory[stackPointer].address, type: 'int' };
              stackPointer++;
              description = `在栈上分配 ${varName} = ${value}`;
            }
          }

          const ptrMatch = line.match(/int\s*\*\s*(\w+)\s*=\s*&(\w+);/);
          if (ptrMatch) {
            const ptrName = ptrMatch[1];
            const targetName = ptrMatch[2];
            
            if (variables[ptrName]) {
              errorMsg = `错误：变量 ${ptrName} 已定义`;
            } else if (!variables[targetName]) {
              errorMsg = `错误：变量 ${targetName} 未定义`;
            } else if (stackPointer >= STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else {
              const targetAddr = variables[targetName].address;
              currentMemory[stackPointer] = {
                ...currentMemory[stackPointer],
                value: targetAddr,
                isPointer: true,
                pointsTo: targetAddr,
                variableName: ptrName,
              };
              variables[ptrName] = { address: currentMemory[stackPointer].address, type: 'pointer' };
              stackPointer++;
              description = `指针 ${ptrName} 指向 ${targetName} (0x${targetAddr.toString(16).toUpperCase()})`;
            }
          }

          const doublePtrMatch = line.match(/int\s*\*\*\s*(\w+)\s*=\s*&(\w+);/);
          if (doublePtrMatch) {
            const ptrName = doublePtrMatch[1];
            const targetName = doublePtrMatch[2];
            
            if (variables[ptrName]) {
              errorMsg = `错误：变量 ${ptrName} 已定义`;
            } else if (!variables[targetName]) {
              errorMsg = `错误：变量 ${targetName} 未定义`;
            } else if (variables[targetName].type !== 'pointer') {
              errorMsg = `错误：${targetName} 不是指针，无法取址`;
            } else if (stackPointer >= STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else {
              const targetAddr = variables[targetName].address;
              currentMemory[stackPointer] = {
                ...currentMemory[stackPointer],
                value: targetAddr,
                isPointer: true,
                pointsTo: targetAddr,
                variableName: ptrName,
              };
              variables[ptrName] = { address: currentMemory[stackPointer].address, type: 'pointer' };
              stackPointer++;
              description = `二级指针 ${ptrName} 指向 ${targetName} (0x${targetAddr.toString(16).toUpperCase()})`;
            }
          }

          const ptrDeclOnlyMatch = line.match(/int\s*\*\s*(\w+);/);
          if (ptrDeclOnlyMatch && !ptrMatch && !doublePtrMatch && !line.includes('=')) {
            const ptrName = ptrDeclOnlyMatch[1];
            
            if (variables[ptrName]) {
              errorMsg = `错误：变量 ${ptrName} 已定义`;
            } else if (stackPointer >= STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else {
              currentMemory[stackPointer] = {
                ...currentMemory[stackPointer],
                value: null,
                isPointer: true,
                pointsTo: null,
                variableName: ptrName,
              };
              variables[ptrName] = { address: currentMemory[stackPointer].address, type: 'pointer' };
              stackPointer++;
              description = `声明指针 ${ptrName}（未初始化）`;
              warningMsg = '警告：指针未初始化，使用前必须赋值';
            }
          }

          const ptrMallocMatch = line.match(/int\s*\*\s*(\w+)\s*=\s*malloc\((\d+)\);/);
          if (ptrMallocMatch) {
            const ptrName = ptrMallocMatch[1];
            const size = parseInt(ptrMallocMatch[2]);
            
            if (variables[ptrName]) {
              errorMsg = `错误：变量 ${ptrName} 已定义`;
            } else if (stackPointer >= STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else if (heapPointer >= HEAP_SIZE) {
              errorMsg = '错误：堆空间不足';
            } else {
              const heapAddr = HEAP_START + heapPointer * 4;
              currentMemory[STACK_SIZE + heapPointer] = {
                ...currentMemory[STACK_SIZE + heapPointer],
                address: heapAddr,
                value: 0,
                isPointer: false,
                variableName: `heap_${ptrName}`,
                region: 'heap',
              };
              
              currentMemory[stackPointer] = {
                ...currentMemory[stackPointer],
                value: heapAddr,
                isPointer: true,
                pointsTo: heapAddr,
                variableName: ptrName,
              };
              variables[ptrName] = { address: currentMemory[stackPointer].address, type: 'pointer' };
              stackPointer++;
              heapPointer++;
              description = `声明指针 ${ptrName} 并从堆分配 ${size} 字节 (0x${heapAddr.toString(16).toUpperCase()})`;
            }
          }

          const mallocMatch = line.match(/(\w+)\s*=\s*malloc\((\d+)\);/);
          if (mallocMatch && !ptrMallocMatch) {
            const ptrName = mallocMatch[1];
            const size = parseInt(mallocMatch[2]);
            
            if (!variables[ptrName]) {
              errorMsg = `错误：指针 ${ptrName} 未声明`;
            } else if (heapPointer >= HEAP_SIZE) {
              errorMsg = '错误：堆空间不足';
            } else {
              const heapAddr = HEAP_START + heapPointer * 4;
              currentMemory[STACK_SIZE + heapPointer] = {
                ...currentMemory[STACK_SIZE + heapPointer],
                address: heapAddr,
                value: 0,
                isPointer: false,
                variableName: `heap_${ptrName}`,
                region: 'heap',
              };
              
              const ptrCell = currentMemory.find((m: MemoryCell) => m.variableName === ptrName);
              if (ptrCell) {
                ptrCell.value = heapAddr;
                ptrCell.pointsTo = heapAddr;
              }
              heapPointer++;
              description = `从堆分配 ${size} 字节给 ${ptrName} (0x${heapAddr.toString(16).toUpperCase()})`;
            }
          }

          const derefMatch = line.match(/\*(\w+)\s*=\s*(\d+);/);
          if (derefMatch) {
            const ptrName = derefMatch[1];
            const value = parseInt(derefMatch[2]);
            
            if (!variables[ptrName]) {
              errorMsg = `错误：指针 ${ptrName} 未定义`;
            } else if (variables[ptrName].type !== 'pointer') {
              errorMsg = `错误：${ptrName} 不是指针`;
            } else {
              const ptrCell = currentMemory.find((m: MemoryCell) => m.variableName === ptrName);
              if (ptrCell) {
                if (ptrCell.pointsTo === null || ptrCell.pointsTo === undefined) {
                  errorMsg = `错误：指针 ${ptrName} 未初始化（野指针）`;
                } else {
                  const targetCell = currentMemory.find((m: MemoryCell) => m.address === ptrCell.pointsTo);
                  if (targetCell) {
                    if (targetCell.isFreed) {
                      errorMsg = `严重错误：写入已释放内存 (Use-After-Free)`;
                    } else {
                      targetCell.value = value;
                      description = `通过 ${ptrName} 写入值 ${value}`;
                    }
                  }
                }
              }
            }
          }

          const ptrReassignMatch = line.match(/(\w+)\s*=\s*&(\w+);/);
          if (ptrReassignMatch && !line.includes('int')) {
            const ptrName = ptrReassignMatch[1];
            const targetName = ptrReassignMatch[2];
            
            if (!variables[ptrName]) {
              errorMsg = `错误：变量 ${ptrName} 未定义`;
            } else if (variables[ptrName].type !== 'pointer') {
              errorMsg = `错误：${ptrName} 不是指针`;
            } else if (!variables[targetName]) {
              errorMsg = `错误：变量 ${targetName} 未定义`;
            } else {
              const ptrCell = currentMemory.find((m: MemoryCell) => m.variableName === ptrName);
              const targetAddr = variables[targetName].address;
              if (ptrCell) {
                ptrCell.value = targetAddr;
                ptrCell.pointsTo = targetAddr;
                description = `指针 ${ptrName} 现在指向 ${targetName}`;
              }
            }
          }

          const ptrArrMatch = line.match(/int\s*\*\s*(\w+)\s*=\s*(\w+);/);
          if (ptrArrMatch && !ptrMatch && !doublePtrMatch) {
            const ptrName = ptrArrMatch[1];
            const arrName = ptrArrMatch[2];
            
            if (variables[ptrName]) {
              errorMsg = `错误：变量 ${ptrName} 已定义`;
            } else if (!variables[arrName]) {
              errorMsg = `错误：数组 ${arrName} 未定义`;
            } else if (stackPointer >= STACK_SIZE) {
              errorMsg = '错误：栈空间不足';
            } else {
              const targetAddr = variables[arrName].address;
              currentMemory[stackPointer] = {
                ...currentMemory[stackPointer],
                value: targetAddr,
                isPointer: true,
                pointsTo: targetAddr,
                variableName: ptrName,
              };
              variables[ptrName] = { address: currentMemory[stackPointer].address, type: 'pointer' };
              stackPointer++;
              description = `指针 ${ptrName} 指向数组 ${arrName}`;
            }
          }

          if (line.includes('return')) {
            description = '函数返回';
          }
        }

        if (!description && !errorMsg) {
          description = '执行: ' + line.substring(0, 30);
        }

      } catch (e) {
        errorMsg = `执行错误: ${e}`;
      }

      accumulatedConsole = [...accumulatedConsole, ...stepConsole];

      ops.push({
        lineIndex: ops.length,
        originalLine: lineNum,
        code: line,
        description,
        memoryAfter: JSON.parse(JSON.stringify(currentMemory)),
        consoleOutput: [...accumulatedConsole],
        error: errorMsg,
        warning: warningMsg,
      });

      if (errorMsg) break;
    }

    return ops;
  };

  const runCode = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      setIsRunning(false);
      return;
    }
    
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    
    if (currentStep >= 0 && currentStep < operations.length - 1) {
      setIsRunning(true);
      let step = currentStep + 1;
      const ops = operations;
      
      const executeStep = () => {
        if (step >= ops.length) {
          setIsRunning(false);
          return;
        }
        
        const op = ops[step];
        setCurrentStep(step);
        setMemory(op.memoryAfter);
        setConsoleOutput(op.consoleOutput);
        
        if (op.error) {
          setIsRunning(false);
          return;
        }
        
        step++;
        
        if (step < ops.length) {
          intervalRef.current = setTimeout(executeStep, speed);
        } else {
          setIsRunning(false);
        }
      };
      
      executeStep();
      return;
    }
    
    setIsRunning(true);
    setCurrentStep(-1);
    setConsoleOutput([]);
    setMemory(INITIAL_MEMORY());
    
    const ops = parseAndExecute(code);
    setOperations(ops);
    
    if (ops.length === 0) {
      setIsRunning(false);
      return;
    }

    let step = 0;
    
    const executeStep = () => {
      if (step >= ops.length) {
        setIsRunning(false);
        return;
      }
      
      const op = ops[step];
      setCurrentStep(step);
      setMemory(op.memoryAfter);
      setConsoleOutput(op.consoleOutput);
      
      if (op.error) {
        setIsRunning(false);
        return;
      }
      
      step++;
      
      if (step < ops.length) {
        intervalRef.current = setTimeout(executeStep, speed);
      } else {
        setIsRunning(false);
      }
    };
    
    executeStep();
  };

  const reset = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    setCurrentStep(-1);
    setMemory(INITIAL_MEMORY());
    setOperations([]);
    setConsoleOutput([]);
    setIsRunning(false);
  };

  const stepForward = () => {
    if (operations.length === 0) {
      const ops = parseAndExecute(code);
      setOperations(ops);
      if (ops.length > 0) {
        setCurrentStep(0);
        setMemory(ops[0].memoryAfter);
        setConsoleOutput(ops[0].consoleOutput);
      }
      return;
    }
    
    if (currentStep < operations.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMemory(operations[next].memoryAfter);
      setConsoleOutput(operations[next].consoleOutput);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setMemory(operations[prev].memoryAfter);
      setConsoleOutput(operations[prev].consoleOutput);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
      setMemory(INITIAL_MEMORY());
      setConsoleOutput([]);
    }
  };

  const toggleBreakpoint = (lineNum: number) => {
    const newBreakpoints = new Set(breakpoints);
    if (newBreakpoints.has(lineNum)) {
      newBreakpoints.delete(lineNum);
    } else {
      newBreakpoints.add(lineNum);
    }
    setBreakpoints(newBreakpoints);
  };

  const loadExample = (example: typeof examples[0]) => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    setCode(example.code);
    setCurrentStep(-1);
    setMemory(INITIAL_MEMORY());
    setOperations([]);
    setConsoleOutput([]);
    setIsRunning(false);
  };

  const stackMemory = memory.filter(m => m.region === 'stack');
  const heapMemory = memory.filter(m => m.region === 'heap');
  const currentOp = currentStep >= 0 ? operations[currentStep] : null;

  const codeLines = code.split('\n');

  return (
    <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-emerald-400" />
            指针调试器
          </h3>
          <p className="text-slate-400 text-sm">输入C代码，观察内存变化，检测内存错误</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                speed !== 800 ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
              title="调整执行速度"
            >
              <Gauge className="w-4 h-4" />
              {speedOptions.find(o => o.value === speed)?.label || '速度'}
            </button>
            {showSpeedMenu && (
              <div className="absolute top-full right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 min-w-[140px]">
                {speedOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSpeed(opt.value);
                      setShowSpeedMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${
                      speed === opt.value ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-slate-500 text-xs ml-2">{opt.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? '暂停' : '运行'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-3 bg-slate-900/50 border-r border-slate-800 p-4 space-y-4 max-h-[600px] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">示例代码</h4>
            <div className="space-y-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(ex)}
                  disabled={isRunning}
                  className="w-full text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-all disabled:opacity-50 group"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">{ex.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ex.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-5 p-4 space-y-4">
          {currentOp && (
            <div className={`p-3 rounded-lg border ${
              currentOp.error ? 'bg-red-900/20 border-red-500/30' :
              currentOp.warning ? 'bg-amber-900/20 border-amber-500/30' :
              'bg-emerald-900/20 border-emerald-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {currentOp.error ? <AlertTriangle className="w-4 h-4 text-red-400" /> :
                 currentOp.warning ? <AlertTriangle className="w-4 h-4 text-amber-400" /> :
                 <Info className="w-4 h-4 text-emerald-400" />}
                <span className="text-xs font-medium text-slate-400">步骤 {currentStep + 1}/{operations.length}</span>
              </div>
              <p className={`text-sm font-medium ${
                currentOp.error ? 'text-red-200' :
                currentOp.warning ? 'text-amber-200' :
                'text-emerald-200'
              }`}>
                {currentOp.error || currentOp.warning || currentOp.description}
              </p>
            </div>
          )}
          
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-xs text-slate-500">代码编辑器</span>
              <div className="flex gap-1">
                <button
                  onClick={stepBackward}
                  disabled={currentStep < 0 || isRunning}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                  title="上一步"
                >
                  <StepForward className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={stepForward}
                  disabled={isRunning}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                  title="下一步"
                >
                  <StepForward className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setOperations([]);
                  setCurrentStep(-1);
                }}
                disabled={isRunning}
                className="w-full h-48 p-4 pl-12 bg-slate-950 text-slate-300 font-mono text-sm resize-none focus:outline-none disabled:opacity-50"
                spellCheck={false}
              />
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-900/50 border-r border-slate-800 flex flex-col">
                {codeLines.map((_, i) => {
                  const isActive = currentOp && currentOp.originalLine === i;
                  const hasBreakpoint = breakpoints.has(i);
                  return (
                    <div
                      key={i}
                      onClick={() => toggleBreakpoint(i)}
                      className={`h-6 flex items-center justify-center text-xs cursor-pointer transition-colors ${
                        isActive ? 'bg-emerald-500/30 text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      {hasBreakpoint ? (
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-400">栈区 (Stack)</span>
                <span className="text-[10px] text-slate-500">高地址 → 低地址</span>
              </div>
              <div className="space-y-1">
                {stackMemory.map((cell) => (
                  <div
                    key={cell.address}
                    onClick={() => setSelectedCell(memory.indexOf(cell))}
                    className={`
                      flex items-center gap-2 p-2 rounded border text-xs cursor-pointer transition-all
                      ${cell.variableName 
                        ? cell.isPointer ? 'bg-amber-900/30 border-amber-500/50' : 'bg-blue-900/30 border-blue-500/50'
                        : 'bg-slate-800/50 border-slate-700'
                      }
                      ${selectedCell === memory.indexOf(cell) ? 'ring-1 ring-emerald-400' : ''}
                    `}
                  >
                    <span className="text-slate-500 font-mono w-16">0x{cell.address.toString(16).slice(-4).toUpperCase()}</span>
                    {cell.variableName && (
                      <span className="text-emerald-400 w-16 truncate">{cell.variableName}</span>
                    )}
                    <span className={`font-mono ml-auto ${cell.isPointer ? 'text-amber-400' : 'text-blue-300'}`}>
                      {cell.isPointer 
                        ? (cell.value ? `→0x${cell.value.toString(16).slice(-4).toUpperCase()}` : 'null')
                        : (cell.value !== null ? cell.value : '-')
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400">堆区 (Heap)</span>
                <span className="text-[10px] text-slate-500">低地址 → 高地址</span>
              </div>
              <div className="space-y-1">
                {heapMemory.map((cell) => (
                  <div
                    key={cell.address}
                    onClick={() => setSelectedCell(memory.indexOf(cell))}
                    className={`
                      flex items-center gap-2 p-2 rounded border text-xs cursor-pointer transition-all
                      ${cell.variableName 
                        ? cell.isFreed ? 'bg-red-900/30 border-red-500/50' : 'bg-purple-900/30 border-purple-500/50'
                        : 'bg-slate-800/50 border-slate-700'
                      }
                      ${selectedCell === memory.indexOf(cell) ? 'ring-1 ring-emerald-400' : ''}
                    `}
                  >
                    <span className="text-slate-500 font-mono w-16">0x{cell.address.toString(16).slice(-4).toUpperCase()}</span>
                    {cell.variableName && (
                      <span className="text-emerald-400 w-16 truncate">{cell.variableName}</span>
                    )}
                    <span className={`font-mono ml-auto ${cell.isFreed ? 'text-red-400 line-through' : 'text-purple-300'}`}>
                      {cell.value !== null ? cell.value : '-'}
                    </span>
                    {cell.isFreed && <span className="text-[8px] text-red-500">FREED</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-slate-900/50 border-l border-slate-800 p-4 space-y-4">
          <div className="bg-black rounded-xl p-3 border border-slate-800">
            <div className="text-xs text-slate-600 mb-2 flex items-center gap-2">
              <span>控制台输出</span>
              {consoleOutput.length > 0 && (
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px]">
                  {consoleOutput.length} 行
                </span>
              )}
            </div>
            <div className="font-mono text-sm min-h-[60px] max-h-[100px] overflow-y-auto">
              {currentOp?.error ? (
                <div className="text-red-400 border-l-2 border-red-500/50 pl-2 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{currentOp.error}</span>
                </div>
              ) : consoleOutput.length > 0 ? (
                consoleOutput.map((line, i) => (
                  <div key={i} className="text-green-400 border-l-2 border-green-500/30 pl-2">{line}</div>
                ))
              ) : (
                <span className="text-slate-700">_</span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">变量监视</h4>
            <div className="space-y-1">
              {memory.filter(m => m.variableName && !m.variableName.startsWith('heap_')).map((cell, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800/30 rounded text-xs">
                  <span className="text-emerald-400">{cell.variableName}</span>
                  <span className="text-slate-500 font-mono">0x{cell.address.toString(16).slice(-4).toUpperCase()}</span>
                  <span className={`font-mono ${cell.isPointer ? 'text-amber-400' : 'text-blue-300'}`}>
                    {cell.isPointer ? (cell.value ? 'ptr' : 'null') : cell.value}
                  </span>
                </div>
              ))}
              {memory.filter(m => m.variableName && !m.variableName.startsWith('heap_')).length === 0 && (
                <div className="text-slate-600 text-xs italic">暂无变量</div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">调用栈</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded text-xs">
                <span className="text-slate-500">#0</span>
                <span className="text-blue-400">main()</span>
              </div>
            </div>
          </div>

          {selectedCell !== null && memory[selectedCell].variableName && (
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
              <h4 className="text-xs font-bold text-white mb-2">内存详情</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">变量:</span>
                  <span className="text-emerald-400">{memory[selectedCell].variableName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">地址:</span>
                  <span className="font-mono text-slate-300">
                    0x{memory[selectedCell].address.toString(16).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">区域:</span>
                  <span className={memory[selectedCell].region === 'stack' ? 'text-blue-400' : 'text-purple-400'}>
                    {memory[selectedCell].region === 'stack' ? '栈' : '堆'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">类型:</span>
                  <span className={memory[selectedCell].isPointer ? 'text-amber-400' : 'text-blue-400'}>
                    {memory[selectedCell].isPointer ? 'int*' : 'int'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">值:</span>
                  <span className="font-mono text-white">
                    {memory[selectedCell].isPointer 
                      ? `0x${(memory[selectedCell].value || 0).toString(16).toUpperCase()}`
                      : memory[selectedCell].value
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">图例</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded bg-blue-500/50"></span>
                栈变量
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded bg-purple-500/50"></span>
                堆内存
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded bg-amber-500/50"></span>
                指针
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded bg-red-500/50"></span>
                已释放
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
