import { useState } from 'react';
import { Code2, Play } from 'lucide-react';
import { CodeVisualizer } from './visualizer';

const vizQuestions = [
  { id: '10001', title: 'uint8_t 计数器溢出', desc: '无符号8位整数溢出回绕演示', category: '溢出与类型' },
  { id: '10002', title: 'int8_t 温度值溢出', desc: '有符号8位整数溢出演示', category: '溢出与类型' },
  { id: '10003', title: '有符号无符号比较陷阱', desc: '隐式类型转换导致的比较错误', category: '溢出与类型' },
  { id: '10004', title: '设置寄存器位', desc: '使用位或运算设置GPIO寄存器', category: '位运算' },
  { id: '10005', title: '清除寄存器位', desc: '使用位与取反清除标志位', category: '位运算' },
  { id: '10006', title: '设备状态判断-早返回', desc: '使用早返回模式简化代码', category: '控制流' },
  { id: '10007', title: 'switch-case 命令分发', desc: '多路分支的典型应用', category: '控制流' },
  { id: '10008', title: 'for循环数组求和', desc: '数组遍历累加', category: '控制流' },
  { id: '10009', title: 'while超时等待', desc: '带重试次数的轮询', category: '控制流' },
  { id: '10010', title: '参数传值', desc: '函数参数是值的拷贝', category: '进阶主题' },
  { id: '10011', title: 'BIT宏定义', desc: '位操作常用宏', category: '进阶主题' },
  { id: '10012', title: '宏的副作用', desc: '宏参数避免使用++/--', category: '进阶主题' },
];

interface VizQuestionListProps {
  isDarkMode: boolean;
  vizQuestionId: string | null;
  setVizQuestionId: (id: string | null) => void;
}

export default function VizQuestionList({ isDarkMode, vizQuestionId, setVizQuestionId }: VizQuestionListProps) {
  const categories = ['溢出与类型', '位运算', '控制流', '进阶主题'];

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          🎬 动画演示题目
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          点击题目卡片上的 🎬 按钮查看可视化动画
        </p>
      </div>

      <div className="space-y-6">
        {categories.map(category => {
          const questions = vizQuestions.filter(q => q.category === category);
          return (
            <div key={category}>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                {category}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {questions.map(q => (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl transition-all ${
                      vizQuestionId === q.id
                        ? 'bg-pink-500/20 border-pink-500/50'
                        : isDarkMode
                        ? 'bg-slate-800/50 border-slate-700/50'
                        : 'bg-white border-slate-200'
                    } border`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Code2 className={`w-5 h-5 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        ID: {q.id}
                      </span>
                    </div>
                    <h5 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {q.title}
                    </h5>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {q.desc}
                    </p>
                    <button
                      onClick={() => setVizQuestionId(q.id)}
                      className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        vizQuestionId === q.id
                          ? 'bg-pink-600 text-white'
                          : 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30'
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      🎬 动画演示
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 动画演示弹窗 */}
      {vizQuestionId && (
        <CodeVisualizer
          questionId={vizQuestionId}
          onClose={() => setVizQuestionId(null)}
        />
      )}

      {/* 说明 */}
      <div className={`mt-8 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'} border border-slate-200/20`}>
        <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          💡 使用方法
        </h4>
        <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <li>• 点击题目卡片上的 🎬 动画演示 按钮</li>
          <li>• 弹出可视化窗口展示代码执行过程</li>
          <li>• 使用键盘 ← → 控制动画步骤</li>
          <li>• 按 Enter 播放/暂停动画</li>
        </ul>
      </div>
    </div>
  );
}
