// index.ts - 可视化数据导出
import { VisualizationData } from '../types';
import { uint8OverflowData } from './uint8-overflow';
import { int8OverflowData } from './int8-overflow';
import { signedUnsignedCompareData } from './signed-unsigned-compare';
import { bitSetRegisterData } from './bit-set-register';
import { bitClearRegisterData } from './bit-clear-register';
import { deviceStatusData } from './device-status-check';
import { switchCaseData } from './switch-case-command';
import { arraySumLoopData } from './array-sum-loop';
import { whileTimeoutData } from './while-timeout-wait';
import { passByValueData } from './pass-by-value';
import { bitMacroData } from './bit-macro';
import { macroSideEffectData } from './macro-side-effect';
import { pointerBasicData } from './pointer-basic';
import { pointerTypesData } from './pointer-types';
import { pthreadCreateData } from './pthread-create';
import { level1RegisterPrintData } from './level1-register-print';
import { level1SensorDataData } from './level1-sensor-data';
import { level1SwitchCommandData } from './level1-switch-command';
import { level1WhileTimeoutData } from './level1-while-timeout';
import { level1FunctionReturnData } from './level1-function-return';
import { level1BitSetData } from './level1-bit-set';
import { level1BitClearData } from './level1-bit-clear';
import { level1BitMacroData } from './level1-bit-macro';
import { level1ArraySumData } from './level1-array-sum';
import { level1StringLengthData } from './level1-string-length';
import { level1ForLoopData } from './level1-for-loop';
import { level1IfElseBranchData } from './level1-if-else-branch';
import { level1ArrayInitData } from './level1-array-init';
import { level1PointerBasicData } from './level1-pointer-basic';
import { level1DoWhileData } from './level1-do-while';
import { level1BreakContinueData } from './level1-break-continue';
import { level1NestedLoopData } from './level1-nested-loop';
import { level1PrintfFormatData } from './level1-printf-format';
import { level1OperatorPrecedenceData } from './level1-operator-precedence';
import { level1LogicalOperatorData } from './level1-logical-operator';
import { level1SizeofTypeData } from './level1-sizeof-type';
import { level1TernaryOperatorData } from './level1-ternary-operator';
import { level1ModuloOperatorData } from './level1-modulo-operator';
import { level1ShiftOperatorData } from './level1-shift-operator';
import { level1IncrementDecrementData } from './level1-increment-decrement';
import { level1ConstantDefineData } from './level1-constant-define';
import { level1MultiDimensionalArrayData } from './level1-multi-dimensional-array';
import { level1StringArrayData } from './level1-string-array';
import { level1FunctionParamPassData } from './level1-function-param-pass';
import { level1GlobalLocalVarData } from './level1-global-local-var';
import { level1StaticVarData } from './level1-static-var';
import { level1GotoStatementData } from './level1-goto-statement';
import { level1BitwiseAndOrData } from './level1-bitwise-and-or';
import { level1CommaOperatorData } from './level1-comma-operator';
import { level1TypeCastData } from './level1-type-cast';
import { level1EnumConstData } from './level1-enum-const';
import { level1TypedefData } from './level1-typedef';
import { level1StructBasicData } from './level1-struct-basic';
import { level1UnionBasicData } from './level1-union-basic';
import { level1SizeofArrayData } from './level1-sizeof-array';
import { level1ArrayPointerData } from './level1-array-pointer';
import { level1StringFunctionsData } from './level1-string-functions';
import { level1RecursionData } from './level1-recursion';
import { level1VariableArgumentsData } from './level1-variable-arguments';
import { level1FunctionPointerData } from './level1-function-pointer';
import { level1ConstPointerData } from './level1-const-pointer';
import { level1MemcpyMemsetData } from './level1-memcpy-memset';
import { level1BitFieldData } from './level1-bit-field';
import { level1VolatileKeywordData } from './level1-volatile-keyword';
import { level1PreprocessorConditionalData } from './level1-preprocessor-conditional';
import { level1InlineFunctionData } from './level1-inline-function';
import { level1HexDecConversionData } from './level1-hex-dec-conversion';
import { level1AsciiTableData } from './level1-ascii-table';
import { level1BooleanLogicData } from './level1-boolean-logic';
import { level1AutoRegisterStaticData } from './level1-auto-register-static';
import { level1FloatingPointData } from './level1-floating-point';
import { level1UcharUshortData } from './level1-uchar-ushort';
import { level1ScharSshortData } from './level1-schar-sshort';
import { level1VarargsSumData } from './level1-varargs-sum';
import { level1SizeofPointerData } from './level1-sizeof-pointer';
import { level1VoidPointerData } from './level1-void-pointer';
import { level1NullPointerData } from './level1-null-pointer';
import { level1PointerArithmeticData } from './level1-pointer-arithmetic';

export const visualizationDataMap: Record<string, VisualizationData> = {
  // 字符串 key
  'uint8-overflow': uint8OverflowData,
  'int8-overflow': int8OverflowData,
  'signed-unsigned-compare': signedUnsignedCompareData,
  'bit-set-register': bitSetRegisterData,
  'bit-clear-register': bitClearRegisterData,
  'device-status-check': deviceStatusData,
  'switch-case-command': switchCaseData,
  'array-sum-loop': arraySumLoopData,
  'while-timeout-wait': whileTimeoutData,
  'pass-by-value': passByValueData,
  'bit-macro': bitMacroData,
  'macro-side-effect': macroSideEffectData,
  // 新增可视化数据
  'pointer-basic': pointerBasicData,
  'pointer-types': pointerTypesData,
  'pthread-create': pthreadCreateData,
  // Level 1 可视化数据
  'level1-register-print': level1RegisterPrintData,
  'level1-sensor-data': level1SensorDataData,
  'level1-switch-command': level1SwitchCommandData,
  'level1-while-timeout': level1WhileTimeoutData,
  'level1-function-return': level1FunctionReturnData,
  'level1-bit-set': level1BitSetData,
  'level1-bit-clear': level1BitClearData,
  'level1-bit-macro': level1BitMacroData,
  'level1-array-sum': level1ArraySumData,
  'level1-string-length': level1StringLengthData,
  'level1-for-loop': level1ForLoopData,
  'level1-if-else-branch': level1IfElseBranchData,
  'level1-array-init': level1ArrayInitData,
  'level1-pointer-basic': level1PointerBasicData,
  'level1-do-while': level1DoWhileData,
  'level1-break-continue': level1BreakContinueData,
  'level1-nested-loop': level1NestedLoopData,
  'level1-printf-format': level1PrintfFormatData,
  'level1-operator-precedence': level1OperatorPrecedenceData,
  'level1-logical-operator': level1LogicalOperatorData,
  'level1-sizeof-type': level1SizeofTypeData,
  'level1-ternary-operator': level1TernaryOperatorData,
  'level1-modulo-operator': level1ModuloOperatorData,
  'level1-shift-operator': level1ShiftOperatorData,
  'level1-increment-decrement': level1IncrementDecrementData,
  'level1-constant-define': level1ConstantDefineData,
  'level1-multi-dimensional-array': level1MultiDimensionalArrayData,
  'level1-string-array': level1StringArrayData,
  'level1-function-param-pass': level1FunctionParamPassData,
  'level1-global-local-var': level1GlobalLocalVarData,
  'level1-static-var': level1StaticVarData,
  'level1-goto-statement': level1GotoStatementData,
  'level1-bitwise-and-or': level1BitwiseAndOrData,
  'level1-comma-operator': level1CommaOperatorData,
  'level1-type-cast': level1TypeCastData,
  'level1-enum-const': level1EnumConstData,
  'level1-typedef': level1TypedefData,
  'level1-struct-basic': level1StructBasicData,
  'level1-union-basic': level1UnionBasicData,
  'level1-sizeof-array': level1SizeofArrayData,
  'level1-array-pointer': level1ArrayPointerData,
  'level1-string-functions': level1StringFunctionsData,
  'level1-recursion': level1RecursionData,
  'level1-variable-arguments': level1VariableArgumentsData,
  'level1-function-pointer': level1FunctionPointerData,
  'level1-const-pointer': level1ConstPointerData,
  'level1-memcpy-memset': level1MemcpyMemsetData,
  'level1-bit-field': level1BitFieldData,
  'level1-volatile-keyword': level1VolatileKeywordData,
  'level1-preprocessor-conditional': level1PreprocessorConditionalData,
  'level1-inline-function': level1InlineFunctionData,
  'level1-hex-dec-conversion': level1HexDecConversionData,
  'level1-ascii-table': level1AsciiTableData,
  'level1-boolean-logic': level1BooleanLogicData,
  'level1-auto-register-static': level1AutoRegisterStaticData,
  'level1-floating-point': level1FloatingPointData,
  'level1-uchar-ushort': level1UcharUshortData,
  'level1-schar-sshort': level1ScharSshortData,
  'level1-varargs-sum': level1VarargsSumData,
  'level1-sizeof-pointer': level1SizeofPointerData,
  'level1-void-pointer': level1VoidPointerData,
  'level1-null-pointer': level1NullPointerData,
  'level1-pointer-arithmetic': level1PointerArithmeticData,
  // Level 1 题目ID映射
  '2001': level1RegisterPrintData,
  '2002': level1SensorDataData,
  '2003': uint8OverflowData,
  '2004': signedUnsignedCompareData,
  '2005': level1SwitchCommandData,
  '2006': level1WhileTimeoutData,
  '2007': level1FunctionReturnData,
  '2008': level1BitSetData,
  '2009': level1BitClearData,
  '1010': int8OverflowData,
  '1011': signedUnsignedCompareData,
  '1057': bitSetRegisterData,
  '1058': bitClearRegisterData,
  '1017': deviceStatusData,
  '1018': switchCaseData,
  '1025': arraySumLoopData,
  '1026': whileTimeoutData,
  '1034': passByValueData,
  '1049': bitMacroData,
  '1050': macroSideEffectData,
  // 动画演示栏目 vizId
  '2004': pointerBasicData,
  '3005': pointerTypesData,
  '247': pthreadCreateData,
  // 新栏目 ID (10001-10012)
  '10001': uint8OverflowData,
  '10002': int8OverflowData,
  '10003': signedUnsignedCompareData,
  '10004': bitSetRegisterData,
  '10005': bitClearRegisterData,
  '10006': deviceStatusData,
  '10007': switchCaseData,
  '10008': arraySumLoopData,
  '10009': whileTimeoutData,
  '10010': passByValueData,
  '10011': bitMacroData,
  '10012': macroSideEffectData,
};

export function getVisualizationData(questionId: string): VisualizationData | undefined {
  return visualizationDataMap[questionId];
}

export {
  uint8OverflowData,
  int8OverflowData,
  signedUnsignedCompareData,
  bitSetRegisterData,
  bitClearRegisterData,
  deviceStatusData,
  switchCaseData,
  arraySumLoopData,
  whileTimeoutData,
  passByValueData,
  bitMacroData,
  macroSideEffectData,
  pointerBasicData,
  pointerTypesData,
  pthreadCreateData,
  level1RegisterPrintData,
  level1SensorDataData,
  level1SwitchCommandData,
  level1WhileTimeoutData,
  level1FunctionReturnData,
  level1BitSetData,
  level1BitClearData,
  level1BitMacroData,
  level1ArraySumData,
  level1StringLengthData,
  level1ForLoopData,
  level1IfElseBranchData,
  level1ArrayInitData,
  level1PointerBasicData,
  level1DoWhileData,
  level1BreakContinueData,
  level1NestedLoopData,
  level1PrintfFormatData,
  level1OperatorPrecedenceData,
  level1LogicalOperatorData,
  level1SizeofTypeData,
  level1TernaryOperatorData,
  level1ModuloOperatorData,
  level1ShiftOperatorData,
  level1IncrementDecrementData,
  level1ConstantDefineData,
  level1MultiDimensionalArrayData,
  level1StringArrayData,
  level1FunctionParamPassData,
  level1GlobalLocalVarData,
  level1StaticVarData,
  level1GotoStatementData,
  level1BitwiseAndOrData,
  level1CommaOperatorData,
  level1TypeCastData,
  level1EnumConstData,
  level1TypedefData,
  level1StructBasicData,
  level1UnionBasicData,
  level1SizeofArrayData,
  level1ArrayPointerData,
  level1StringFunctionsData,
  level1RecursionData,
  level1VariableArgumentsData,
  level1FunctionPointerData,
  level1ConstPointerData,
  level1MemcpyMemsetData,
  level1BitFieldData,
  level1VolatileKeywordData,
  level1PreprocessorConditionalData,
  level1InlineFunctionData,
  level1HexDecConversionData,
  level1AsciiTableData,
  level1BooleanLogicData,
  level1AutoRegisterStaticData,
  level1FloatingPointData,
  level1UcharUshortData,
  level1ScharSshortData,
  level1VarargsSumData,
  level1SizeofPointerData,
  level1VoidPointerData,
  level1NullPointerData,
  level1PointerArithmeticData,
};
