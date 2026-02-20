import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  maxStreak: number;
  totalTime: number;
  chaptersCompleted: string[];
  achievements: Achievement[];
}

const DEFAULT_STATS: UserStats = {
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentStreak: 0,
  maxStreak: 0,
  totalTime: 0,
  chaptersCompleted: [],
  achievements: []
};

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(() => {
    // 强制使用默认统计，忽略 localStorage 的错误数据
    return DEFAULT_STATS;
  });

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  const recordAnswer = (isCorrect: boolean, chapterId: string) => {
    setStats(prev => {
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newAchievements = [...prev.achievements];

      if (isCorrect && prev.correctAnswers === 0) {
        newAchievements.push({
          id: 'first_correct',
          name: '🎯 初次成功',
          description: '答对第一道题',
          icon: '🎯',
          unlockedAt: new Date()
        });
      }

      if (newStreak >= 5 && !newAchievements.find(a => a.id === 'streak_5')) {
        newAchievements.push({
          id: 'streak_5',
          name: '🔥 五连对',
          description: '连续答对5道题',
          icon: '🔥',
          unlockedAt: new Date()
        });
      }

      if (newStreak >= 10 && !newAchievements.find(a => a.id === 'streak_10')) {
        newAchievements.push({
          id: 'streak_10',
          name: '⚡ 十连对',
          description: '连续答对10道题',
          icon: '⚡',
          unlockedAt: new Date()
        });
      }

      if (newStreak >= 20 && !newAchievements.find(a => a.id === 'streak_20')) {
        newAchievements.push({
          id: 'streak_20',
          name: '🌟 二十连对',
          description: '连续答对20道题',
          icon: '🌟',
          unlockedAt: new Date()
        });
      }

      return {
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
        currentStreak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        achievements: newAchievements
      };
    });
  };

  const resetStats = () => {
    setStats(DEFAULT_STATS);
  };

  return { stats, recordAnswer, resetStats };
}

interface StatsPanelProps {
  stats: UserStats;
  isDarkMode?: boolean;
}

export function StatsPanel({ stats, isDarkMode = true }: StatsPanelProps) {
  const accuracy = stats.totalQuestions > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
    : 0;

  return (
    <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
        📊 学习统计
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {stats.correctAnswers}
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>正确答案</div>
        </div>
        
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
            {stats.wrongAnswers}
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>错误答案</div>
        </div>
        
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {accuracy}%
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>正确率</div>
        </div>
        
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            {stats.currentStreak}
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>当前连对</div>
        </div>
      </div>

      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        最高连对: <span className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}>{stats.maxStreak}</span>
      </div>
    </div>
  );
}

interface AchievementsPanelProps {
  achievements: Achievement[];
  isDarkMode?: boolean;
}

export function AchievementsPanel({ achievements, isDarkMode = true }: AchievementsPanelProps) {
  const [showNew, setShowNew] = useState<Achievement | null>(null);

  useEffect(() => {
    if (achievements.length > 0) {
      const latest = achievements[achievements.length - 1];
      if (latest.unlockedAt && Date.now() - new Date(latest.unlockedAt).getTime() < 5000) {
        setShowNew(latest);
        setTimeout(() => setShowNew(null), 3000);
      }
    }
  }, [achievements]);

  return (
    <>
      {/* 新成就弹窗 */}
      {showNew && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className={`animate-bounce p-6 rounded-2xl shadow-2xl ${
            isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'
          }`}>
            <div className="text-4xl mb-2 text-center">{showNew.icon}</div>
            <div className="text-white font-bold text-lg">{showNew.name}</div>
            <div className="text-white/80 text-sm">{showNew.description}</div>
          </div>
        </div>
      )}

      {/* 成就列表 */}
      <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          🏆 成就 ({achievements.length})
        </h3>
        
        {achievements.length === 0 ? (
          <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="text-4xl mb-2">🎯</div>
            <div>开始答题解锁成就吧！</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-2 rounded-lg flex items-center gap-2 ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

interface StreakDisplayProps {
  currentStreak: number;
  isDarkMode?: boolean;
}

export function StreakDisplay({ currentStreak, isDarkMode = true }: StreakDisplayProps) {
  if (currentStreak < 3) return null;

  const getEmoji = () => {
    if (currentStreak >= 20) return '🌟';
    if (currentStreak >= 10) return '⚡';
    if (currentStreak >= 5) return '🔥';
    return '✨';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full animate-pulse ${
      isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
    }`}>
      <span className="text-lg">{getEmoji()}</span>
      <span className="font-bold">{currentStreak} 连对!</span>
    </div>
  );
}
