import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

console.log('=== 修复切换题目时效效重复播放的问题 ===\n');

// 问题 1: soundPlayedRef 在 question 变化时被重置
const oldResetPattern = /setShowHint\(false\);\s*\n\s*soundPlayedRef\.current = false;/g;
if (content.match(oldResetPattern)) {
  console.log('✓ 找到音效重置代码');
  
  // 修复：只在未答题时重置音效标记
  const newResetLogic = `setShowHint(false);
    // 只在题目未回答过时重置音效标记
    const hasAnswered = userAnswers && userAnswers.length > 0;
    if (!hasAnswered) {
      soundPlayedRef.current = false;
    }`;
  
  content = content.replace(oldResetPattern, newResetLogic);
  console.log('  → 修改为：只在未答题时重置音效');
} else {
  console.log('✗ 未找到音效重置代码');
}

// 问题 2: 切换题目时应该检查是否已播放过音效
const playEffectPattern = /if \(showResult && !soundPlayedRef\.current\) \{/g;
if (content.match(playEffectPattern)) {
  console.log('✓ 找到音效播放条件');
  console.log('  → 已有防重复播放逻辑，保持不动');
} else {
  console.log('✗ 未找到音效播放条件');
}

// 问题 3: 添加答案恢复后的音效状态恢复
const restoreAnswerPattern = /const restoreAnswer = \(questionId: number\) => \{[\s\S]{0,300}?setUserAnswers\(saved\[questionId\]\);/;
const restoreMatch = content.match(restoreAnswerPattern);
if (restoreMatch) {
  console.log('✓ 找到 restoreAnswer 函数');
  
  // 在恢复答案后，如果题目已回答过，设置音效标记
  const enhancedRestore = `const restoreAnswer = (questionId: number) => {
    const saved = JSON.parse(localStorage.getItem('c-trainer-user-answers') || '{}');
    if (saved[questionId]) {
      setUserAnswers(saved[questionId]);
      // 已答题目，允许播放音效
      soundPlayedRef.current = false;
    } else {
      setUserAnswers([]);
      // 未答题目，禁止播放音效
      soundPlayedRef.current = true;
    }
  };`;
  
  content = content.replace(restoreAnswerPattern, enhancedRestore);
  console.log('  → 添加音效状态恢复逻辑');
} else {
  console.log('✗ 未找到 restoreAnswer 函数');
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('\n✅ 修复完成！文件已保存');
console.log('\n修复内容:');
console.log('1. 切换题目时，已答题目不重置音效标记');
console.log('2. 恢复答案时，根据答题状态设置音效标记');
console.log('3. 未答题目切换时不播放音效');
