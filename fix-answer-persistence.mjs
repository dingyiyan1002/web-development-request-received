import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

console.log('=== 修复题目切换时答案被清空的问题 ===\n');

// 问题 1: 找到所有清空答案的导航函数
const patterns = [
  { name: '错题本下一题', search: /(const goToNext = \(\) => \{[\s\S]{0,200})setUserAnswers\(\[\]\)/ },
  { name: '错题本上一题', search: /(const goToPrev = \(\) => \{[\s\S]{0,200})setUserAnswers\(\[\]\)/ },
  { name: '收藏本下一题', search: /(if \(questionIndex < bookmarkedQuestions\.length - 1\) \{[\s\S]{0,100})setUserAnswers\(\[\]\)/ },
  { name: '收藏本上一题', search: /(if \(questionIndex > 0\) \{[\s\S]{0,100})setUserAnswers\(\[\]\)/ }
];

let fixCount = 0;
patterns.forEach(({ name, search }) => {
  const match = content.match(search);
  if (match) {
    console.log(`✓ 修复：${name}`);
    const before = match[0];
    const after = match[1] + '/* 保存当前答案，切换后恢复 */';
    content = content.replace(before, after);
    fixCount++;
  } else {
    console.log(`✗ 未找到：${name}`);
  }
});

console.log(`\n共修复 ${fixCount} 处`);

// 添加答案保存和恢复逻辑
const answerSaveLogic = `
  // 保存当前题目的答案
  const saveCurrentAnswer = () => {
    if (currentQuestion && userAnswers.length > 0) {
      const saved = JSON.parse(localStorage.getItem('c-trainer-user-answers') || '{}');
      saved[currentQuestion.id] = userAnswers;
      localStorage.setItem('c-trainer-user-answers', JSON.stringify(saved));
    }
  };

  // 恢复已答题目的答案
  const restoreAnswer = (questionId: number) => {
    const saved = JSON.parse(localStorage.getItem('c-trainer-user-answers') || '{}');
    if (saved[questionId]) {
      setUserAnswers(saved[questionId]);
    } else {
      setUserAnswers([]);
    }
  };
`;

// 在组件内添加这些函数
const componentStart = content.indexOf('}) {');
if (componentStart > 0) {
  const insertPos = content.indexOf('const [questionIndex', componentStart);
  if (insertPos > 0) {
    content = content.substring(0, insertPos) + answerSaveLogic + '\n' + content.substring(insertPos);
    console.log('✓ 添加答案保存/恢复函数');
  }
}

// 修改切换题目时调用保存
const switchPatterns = [
  { search: /(setQuestionIndex\(questionIndex \+ 1\);)/, replace: 'saveCurrentAnswer();\n        $1' },
  { search: /(setQuestionIndex\(questionIndex - 1\);)/, replace: 'saveCurrentAnswer();\n        $1' }
];

switchPatterns.forEach(({ search, replace }) => {
  if (content.match(search)) {
    content = content.replace(search, replace);
    console.log('✓ 添加切换前保存逻辑');
  }
});

// 在设置 questionIndex 后添加恢复逻辑
const restoreLogic = `
      setTimeout(() => {
        restoreAnswer(chapterQuestions[questionIndex].id);
      }, 100);
`;

content = content.replace(/(setQuestionIndex\([^(]+\);)/g, `$1${restoreLogic}`);
console.log('✓ 添加切换后恢复逻辑');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('\n✅ 修复完成！文件已保存');
