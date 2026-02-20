import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

// ============================================
// 3-Column Dashboard Layout - "圣杯布局"
// ============================================
// 中间: 代码编辑器 + 题目描述 (视觉焦点)
// 左侧: 可视化内存模型/动态图解
// 右侧: 实时输出/变量监视/原理解析

interface DashboardLayoutProps {
  // 中间栏内容
  centerContent: React.ReactNode;
  
  // 左侧栏内容 - 可视化区域
  leftContent?: React.ReactNode;
  
  // 右侧栏内容 - 输出/解析区域
  rightContent?: React.ReactNode;
  
  // 主题
  isDarkMode: boolean;
  
  // 题目信息
  title: string;
  difficulty: number;
  type: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  centerContent,
  leftContent,
  rightContent,
  isDarkMode,
  title,
  difficulty,
  type
}) => {
  // 侧边栏折叠状态
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  
  // 响应式：小屏幕自动折叠
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setLeftCollapsed(true);
        setRightCollapsed(true);
      } else {
        setLeftCollapsed(false);
        setRightCollapsed(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* 顶部标题栏 - 毛玻璃效果 */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <span className="type-badge">{type}</span>
            <h1 className="title">{title}</h1>
            <div className="difficulty-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < difficulty ? 'active' : ''}>★</span>
              ))}
            </div>
          </div>
          
          {/* 折叠按钮 */}
          <div className="collapse-controls">
            <button 
              onClick={() => setLeftCollapsed(!leftCollapsed)}
              className={`collapse-btn ${leftCollapsed ? 'collapsed' : ''}`}
            >
              {leftCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              <span>可视化</span>
            </button>
            <button 
              onClick={() => setRightCollapsed(!rightCollapsed)}
              className={`collapse-btn ${rightCollapsed ? 'collapsed' : ''}`}
            >
              <span>解析</span>
              {rightCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* 3栏主体布局 */}
      <main className="dashboard-main">
        {/* 左侧栏 - 可视化区域 */}
        <aside className={`sidebar left ${leftCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <span className="sidebar-title">🎯 内存可视化</span>
          </div>
          <div className="sidebar-content">
            {leftContent || <EmptyState message="暂无可视化" />}
          </div>
        </aside>

        {/* 中间栏 - 核心内容 */}
        <section className="center-stage">
          <div className="center-content">
            {centerContent}
          </div>
        </section>

        {/* 右侧栏 - 输出/解析区域 */}
        <aside className={`sidebar right ${rightCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <span className="sidebar-title">📊 运行监控</span>
          </div>
          <div className="sidebar-content">
            {rightContent || <EmptyState message="运行代码查看结果" />}
          </div>
        </aside>
      </main>

      {/* 内联样式 - 确保一屏展示 */}
      <style>{`
        .dashboard-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* 毛玻璃头部 */
        .dashboard-header {
          height: 60px;
          background: ${isDarkMode 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
          flex-shrink: 0;
          z-index: 100;
        }

        .header-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          max-width: 1920px;
          margin: 0 auto;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .type-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
            : 'linear-gradient(135deg, #2563eb, #7c3aed)'};
          color: white;
        }

        .title {
          font-size: 18px;
          font-weight: 600;
          color: ${isDarkMode ? '#f8fafc' : '#1e293b'};
          margin: 0;
        }

        .difficulty-stars {
          display: flex;
          gap: 2px;
        }

        .difficulty-stars span {
          color: ${isDarkMode ? '#334155' : '#cbd5e1'};
          font-size: 14px;
        }

        .difficulty-stars span.active {
          color: #fbbf24;
        }

        /* 折叠控制 */
        .collapse-controls {
          display: flex;
          gap: 8px;
        }

        .collapse-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
          color: ${isDarkMode ? '#94a3b8' : '#64748b'};
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .collapse-btn:hover {
          background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'};
          color: ${isDarkMode ? '#e2e8f0' : '#475569'};
        }

        .collapse-btn.collapsed {
          opacity: 0.6;
        }

        /* 3栏主体 */
        .dashboard-main {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(300px, 1fr) minmax(500px, 2fr) minmax(300px, 1fr);
          gap: 1px;
          background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
          overflow: hidden;
        }

        /* 侧边栏 */
        .sidebar {
          background: ${isDarkMode ? '#0f172a' : '#f8fafc'};
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .sidebar.collapsed {
          width: 0;
          min-width: 0;
          opacity: 0;
        }

        .sidebar-header {
          height: 44px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          border-bottom: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          flex-shrink: 0;
        }

        .sidebar-title {
          font-size: 13px;
          font-weight: 600;
          color: ${isDarkMode ? '#94a3b8' : '#64748b'};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        /* 中间舞台 */
        .center-stage {
          background: ${isDarkMode ? '#1e293b' : '#ffffff'};
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .center-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        /* 空状态 */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: ${isDarkMode ? '#475569' : '#94a3b8'};
          font-size: 13px;
          text-align: center;
        }

        /* 响应式 */
        @media (max-width: 1200px) {
          .dashboard-main {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            position: fixed;
            top: 60px;
            bottom: 0;
            width: 320px;
            z-index: 90;
            box-shadow: 0 0 40px rgba(0,0,0,0.2);
          }
          
          .sidebar.left {
            left: 0;
            transform: translateX(${leftCollapsed ? '-100%' : '0'});
          }
          
          .sidebar.right {
            right: 0;
            transform: translateX(${rightCollapsed ? '100%' : '0'});
          }
        }

        /* 滚动条美化 */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
        }
      `}</style>
    </div>
  );
};

// 空状态组件
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="empty-state">
    <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.3 }}>💡</div>
    {message}
  </div>
);

export default DashboardLayout;
