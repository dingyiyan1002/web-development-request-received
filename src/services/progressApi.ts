const API_BASE = 'http://localhost:3001/api';

let cachedData: Progress | null = null;

export interface Progress {
  completed: number[];
  correct: number[];
  wrong: number[];
  attempts: Record<number, number>;
  bookmarked: number[];
  analyzed: number[];
}

const defaultProgress: Progress = {
  completed: [],
  correct: [],
  wrong: [],
  attempts: {},
  bookmarked: [],
  analyzed: []
};

export const loadProgress = async (): Promise<Progress> => {
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(`${API_BASE}/progress`);
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        cachedData = result.data;
        return result.data;
      }
    }
  } catch (error) {
    console.warn('API unavailable, falling back to localStorage:', error);
  }
  
  try {
    const saved = localStorage.getItem('c-trainer-progress-v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      // 检查数据是否异常（比如 wrong 数组过大），如果是则重置
      if (parsed.wrong && parsed.wrong.length > 1000) {
        console.warn('检测到异常数据，强制重置进度');
        localStorage.removeItem('c-trainer-progress-v3');
        return defaultProgress;
      }
      cachedData = {
        completed: parsed.completed || [],
        correct: parsed.correct || [],
        wrong: parsed.wrong || [],
        attempts: parsed.attempts || {},
        bookmarked: parsed.bookmarked || [],
        analyzed: parsed.analyzed || []
      };
      return cachedData;
    }
  } catch {}
  
  return defaultProgress;
};

export const saveProgress = async (progress: Progress): Promise<void> => {
  cachedData = progress;
  
  try {
    await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    });
  } catch (error) {
    console.warn('API unavailable, saving to localStorage:', error);
  }
  
  localStorage.setItem('c-trainer-progress-v3', JSON.stringify(progress));
};

export const clearProgress = async (): Promise<void> => {
  cachedData = null;
  
  try {
    await fetch(`${API_BASE}/progress`, { method: 'DELETE' });
  } catch (error) {
    console.warn('API unavailable:', error);
  }
  
  localStorage.removeItem('c-trainer-progress-v3');
};
