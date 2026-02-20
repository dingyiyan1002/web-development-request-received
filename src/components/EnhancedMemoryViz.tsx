import { useState } from 'react';

export interface StepState {
  step: number;
  line: number;
  description: string;
  variables: Array<{
    name: string;
    value: string;
    binary?: string;
    decimal?: string;
    hex?: string;
    changed?: boolean;
    previousValue?: string;
  }>;
}

interface EnhancedMemoryVizProps {
  steps: StepState[];
  isDarkMode?: boolean;
}

export function EnhancedMemoryViz({ steps, isDarkMode = true }: EnhancedMemoryVizProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!steps || steps.length === 0) {
    return null;
  }

  const step = steps[currentStep];
  const totalSteps = steps.length;

  const toBinary = (val: string): string => {
    try {
      let num: number;
      if (val.startsWith('0x') || val.startsWith('0X')) {
        num = parseInt(val, 16);
      } else {
        num = parseInt(val, 10);
      }
      if (isNaN(num)) return val;
      const binary = num.toString(2).padStart(8, '0').padStart(32, '0');
      return binary.slice(-32).replace(/(\d{4})/g, '$1 ').trim();
    } catch {
      return '';
    }
  };

  const toHex = (val: string): string => {
    try {
      let num: number;
      if (val.startsWith('0x') || val.startsWith('0X')) {
        return val;
      }
      num = parseInt(val, 10);
      if (isNaN(num)) return val;
      return '0x' + num.toString(16).toUpperCase().padStart(8, '0');
    } catch {
      return val;
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-[#0d1117] border border-purple-500/30' : 'bg-white border border-purple-200'}`}>
      {/* 头部 */}
      <div className={`flex items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-purple-500/10 border-b border-purple-500/20' : 'bg-purple-50 border-b border-purple-100'}`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <span className={`font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>执行步骤可视化</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            步骤 {currentStep + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* 步骤导航 */}
      <div className="flex gap-1 px-4 py-2 overflow-x-auto">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`px-2 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              idx === currentStep
                ? 'bg-purple-500 text-white'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            第{s.line}行
          </button>
        ))}
      </div>

      {/* 当前步骤详情 */}
      <div className="p-4 space-y-4">
        {/* 步骤说明 */}
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>第{step.line}行</span>
            {step.description.includes('【重点】') && (
              <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">重点</span>
            )}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {step.description.replace(/【重点】/g, '')}
          </p>
        </div>

        {/* 变量状态表格 */}
        {step.variables.length > 0 && (
          <div className="space-y-2">
            <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>变量状态</div>
            {step.variables.map((v, idx) => {
              const binary = v.binary || toBinary(v.value);
              const hex = v.hex || toHex(v.value);
              const decimal = v.decimal || (() => {
                try {
                  if (v.value.startsWith('0x')) return parseInt(v.value, 16).toString();
                  return v.value;
                } catch { return v.value; }
              })();

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    v.changed
                      ? isDarkMode
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-green-50 border-green-200'
                      : isDarkMode
                        ? 'bg-slate-800/50 border-slate-700'
                        : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {v.name}
                    </span>
                    {v.changed && v.previousValue && (
                      <span className="text-xs text-green-400">
                        {v.previousValue} → {v.value}
                      </span>
                    )}
                  </div>

                  {/* 二进制视图 */}
                  <div className="font-mono text-xs mb-2">
                    <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>二进制: </span>
                    <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                      {binary}
                    </span>
                  </div>

                  {/* 十六进制和十进制 */}
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>十六进制: </span>
                      <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{hex}</span>
                    </div>
                    <div>
                      <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>十进制: </span>
                      <span className={isDarkMode ? 'text-orange-400' : 'text-orange-600'}>{decimal}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 导航按钮 */}
        <div className="flex justify-between pt-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentStep === 0
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ← 上一步
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep === totalSteps - 1}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentStep === totalSteps - 1
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            下一步 →
          </button>
        </div>
      </div>
    </div>
  );
}

export function generateStepsFromCode(code: string): StepState[] {
  const lines = code.split('\n');
  const steps: StepState[] = [];
  const variables: Record<string, string> = {};
  const arrays: Record<string, string[]> = {};
  let stepNum = 0;

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('#include') || trimmed.startsWith('#define')) {
      return;
    }

    let description = '';
    const stepVars: StepState['variables'] = [];

    // 数组声明 int arr[] = {1, 2, 3};
    const arrMatch = trimmed.match(/(?:int|uint32_t|char)\s+(\w+)\s*\[\s*\]?\s*=\s*\{([^}]+)\}/);
    if (arrMatch) {
      const arrName = arrMatch[1];
      const values = arrMatch[2].split(',').map(v => v.trim());
      arrays[arrName] = values;
      variables[arrName] = `[${values.join(', ')}]`;
      
      description = `${arrName} = {${values.join(', ')}}`;
      stepVars.push({
        name: arrName,
        value: `[${values.join(', ')}]`,
        changed: true
      });
    }

    // 变量声明 int a = 10; 或 uint8_t a = 0xFF;
    const declMatch = trimmed.match(/(?:int|uint32_t|uint8_t|uint16_t|int8_t|int16_t|char|short|long|float|double)\s+(\w+)\s*=\s*(.+?);?$/);
    if (declMatch && !arrMatch) {
      const varName = declMatch[1];
      let value = declMatch[2].replace(';', '').trim();
      
      if (value.startsWith('0x') || value.startsWith('0X')) {
        variables[varName] = value;
      } else if (!isNaN(parseInt(value))) {
        variables[varName] = value;
      } else if (value.startsWith('"') && value.endsWith('"')) {
        variables[varName] = value;
      } else if (value.startsWith("'") && value.endsWith("'")) {
        variables[varName] = value;
      }
      
      description = `${varName} = ${value}`;
      stepVars.push({
        name: varName,
        value: variables[varName] || value,
        changed: true
      });
    }

    // 指针声明 int *p = &a; 或 int *p = arr;
    const ptrDeclMatch = trimmed.match(/(?:int|uint32_t|char)\s*\*\s*(\w+)\s*=\s*(.+?);?$/);
    if (ptrDeclMatch && !trimmed.includes('&')) {
      const ptrName = ptrDeclMatch[1];
      const target = ptrDeclMatch[2].replace(';', '').trim();
      
      if (arrays[target]) {
        const addr = '0x' + (0x3000 + Object.keys(arrays).indexOf(target) * 16).toString(16);
        variables[ptrName] = addr;
        description = `${ptrName} = ${target} (指向数组首元素，地址 ${addr})`;
      } else {
        description = `${ptrName} = ${target}`;
        variables[ptrName] = target;
      }
      
      stepVars.push({
        name: ptrName,
        value: variables[ptrName],
        changed: true
      });
    }

    // 指针赋值 p = &a;
    const ptrMatch = trimmed.match(/^(\w+)\s*=\s*&(\w+)/);
    if (ptrMatch && !ptrDeclMatch) {
      const ptrName = ptrMatch[1];
      const targetName = ptrMatch[2];
      const targetAddr = '0x' + (0x1000 + Object.keys(variables).indexOf(targetName) * 4).toString(16);
      variables[ptrName] = targetAddr;
      
      description = `${ptrName} = &${targetName} (地址 ${targetAddr})`;
      stepVars.push({
        name: ptrName,
        value: targetAddr,
        changed: true
      });
    }

    // 数组访问赋值 arr[0] = 10;
    const arrAccessMatch = trimmed.match(/(\w+)\[(\d+)\]\s*=\s*(.+?);?$/);
    if (arrAccessMatch) {
      const arrName = arrAccessMatch[1];
      const idx = parseInt(arrAccessMatch[2]);
      const newVal = arrAccessMatch[3].replace(';', '').trim();
      
      if (arrays[arrName]) {
        const prevVal = arrays[arrName][idx] || '0';
        arrays[arrName][idx] = newVal;
        variables[arrName] = `[${arrays[arrName].join(', ')}]`;
        
        description = `${arrName}[${idx}] = ${newVal}`;
        stepVars.push({
          name: `${arrName}[${idx}]`,
          value: newVal,
          changed: true,
          previousValue: prevVal
        });
      }
    }

    // 解引用赋值 *p = 20;
    const derefMatch = trimmed.match(/^\*(\w+)\s*=\s*(.+?);?$/);
    if (derefMatch) {
      const ptrName = derefMatch[1];
      const newValue = derefMatch[2].replace(';', '').trim();
      
      description = `*${ptrName} = ${newValue} (通过指针修改值)`;
      
      // 找到被指向的变量并更新
      for (const [name, val] of Object.entries(variables)) {
        if (name !== ptrName && !val.startsWith('0x') && !val.startsWith('[')) {
          const prevVal = variables[name];
          variables[name] = newValue;
          stepVars.push({
            name,
            value: newValue,
            changed: true,
            previousValue: prevVal
          });
          break;
        }
      }
    }

    // 位操作 |=
    const orMatch = trimmed.match(/^(\w+)\s*\|\=\s*(.+?);?$/);
    if (orMatch) {
      const varName = orMatch[1];
      const operand = orMatch[2].replace(';', '').trim();
      
      const currentVal = variables[varName] || '0';
      let currentNum = 0;
      if (currentVal.startsWith('0x')) {
        currentNum = parseInt(currentVal, 16);
      } else {
        currentNum = parseInt(currentVal) || 0;
      }
      
      let operandNum = 0;
      const shiftMatch = operand.match(/\((\d+)\s*<<\s*(\d+)\)/);
      if (shiftMatch) {
        operandNum = parseInt(shiftMatch[1]) << parseInt(shiftMatch[2]);
      } else if (operand.startsWith('0x')) {
        operandNum = parseInt(operand, 16);
      } else {
        operandNum = parseInt(operand) || 0;
      }
      
      const newVal = currentNum | operandNum;
      variables[varName] = newVal.toString();
      
      description = `${varName} |= ${operand} → ${varName} = ${newVal}`;
      stepVars.push({
        name: varName,
        value: newVal.toString(),
        changed: true,
        previousValue: currentVal
      });
    }

    // 位操作 &=
    const andMatch = trimmed.match(/^(\w+)\s*&=\s*(.+?);?$/);
    if (andMatch && !orMatch) {
      const varName = andMatch[1];
      const operand = andMatch[2].replace(';', '').trim();
      
      const currentVal = variables[varName] || '0';
      let currentNum = currentVal.startsWith('0x') ? parseInt(currentVal, 16) : parseInt(currentVal) || 0;
      
      let operandNum = 0;
      const notMatch = operand.match(/~\s*\(?(\d+)\)?/);
      if (notMatch) {
        operandNum = ~parseInt(notMatch[1]);
      } else if (operand.startsWith('0x')) {
        operandNum = parseInt(operand, 16);
      } else {
        operandNum = parseInt(operand) || 0;
      }
      
      const newVal = currentNum & operandNum;
      variables[varName] = newVal.toString();
      
      description = `${varName} &= ${operand} → ${varName} = ${newVal}`;
      stepVars.push({
        name: varName,
        value: newVal.toString(),
        changed: true,
        previousValue: currentVal
      });
    }

    // 自增/自减 a++ 或 ++a
    const incMatch = trimmed.match(/^(\w+)\+\+$|^\+\+(\w+)$/);
    if (incMatch) {
      const varName = incMatch[1] || incMatch[2];
      const currentVal = variables[varName] || '0';
      const currentNum = parseInt(currentVal) || 0;
      const newVal = currentNum + 1;
      variables[varName] = newVal.toString();
      
      description = `${varName}++ → ${varName} = ${newVal}`;
      stepVars.push({
        name: varName,
        value: newVal.toString(),
        changed: true,
        previousValue: currentVal
      });
    }

    // 简单赋值 a = b + c 或 a = b * 2
    const assignMatch = trimmed.match(/^(\w+)\s*=\s*(\w+)\s*([\+\-\*\/\%])\s*(\w+|\d+);?$/);
    if (assignMatch && !declMatch && !ptrDeclMatch && !arrAccessMatch) {
      const varName = assignMatch[1];
      const left = assignMatch[2];
      const op = assignMatch[3];
      const right = assignMatch[4].replace(';', '');
      
      const leftVal = variables[left] ? parseInt(variables[left]) : parseInt(left) || 0;
      const rightVal = variables[right] ? parseInt(variables[right]) : parseInt(right) || 0;
      
      let result = 0;
      switch (op) {
        case '+': result = leftVal + rightVal; break;
        case '-': result = leftVal - rightVal; break;
        case '*': result = leftVal * rightVal; break;
        case '/': result = Math.floor(leftVal / rightVal); break;
        case '%': result = leftVal % rightVal; break;
      }
      
      const prevVal = variables[varName];
      variables[varName] = result.toString();
      
      description = `${varName} = ${left} ${op} ${right} = ${result}`;
      stepVars.push({
        name: varName,
        value: result.toString(),
        changed: true,
        previousValue: prevVal
      });
    }

    // 简单赋值 a = 10 或 a = b
    const simpleAssignMatch = trimmed.match(/^(\w+)\s*=\s*(\w+|\d+|0x[0-9a-fA-F]+);?$/);
    if (simpleAssignMatch && !declMatch && !ptrDeclMatch && !arrAccessMatch && !assignMatch) {
      const varName = simpleAssignMatch[1];
      let value = simpleAssignMatch[2].replace(';', '');
      
      // 如果右边是变量，取其值
      if (variables[value] && !value.match(/^\d/) && !value.startsWith('0x')) {
        value = variables[value];
      }
      
      const prevVal = variables[varName];
      variables[varName] = value;
      
      description = `${varName} = ${value}`;
      stepVars.push({
        name: varName,
        value: value,
        changed: true,
        previousValue: prevVal
      });
    }

    // printf 跳过，但如果有变量则显示当前状态
    if (trimmed.includes('printf')) {
      // 显示当前所有变量状态
      if (Object.keys(variables).length > 0) {
        description = '输出结果';
        for (const [name, val] of Object.entries(variables)) {
          stepVars.push({
            name,
            value: val,
            changed: false
          });
        }
      }
    }

    if (description || stepVars.length > 0) {
      steps.push({
        step: stepNum++,
        line: lineIdx + 1,
        description: description || trimmed,
        variables: stepVars
      });
    }
  });

  return steps;
}
