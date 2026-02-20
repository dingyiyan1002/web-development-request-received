import { useMemo, useState } from "react";
import { BookOpen, Copy, Check, Info, AlertTriangle } from "lucide-react";

export type RefVocab = { word: string; meaning: string; category?: string };

export function ReferenceSidebar({
  modeLabel,
  focusPoints,
  mistakes,
  vocabulary,
  isDarkMode
}: {
  modeLabel: string;
  focusPoints: string[];
  mistakes: string[];
  vocabulary: RefVocab[];
  isDarkMode: boolean;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, RefVocab[]>();
    for (const v of vocabulary) {
      const key = v.category || "关键词";
      const arr = map.get(key) || [];
      arr.push(v);
      map.set(key, arr);
    }
    return Array.from(map.entries());
  }, [vocabulary]);

  const doCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied((prev) => (prev === text ? null : prev)), 900);
    } catch {
      // ignore
    }
  };

  return (
    <aside className={`glass rounded-xl lg:sticky lg:top-20 h-fit ${isDarkMode ? '' : 'bg-white/60 border-slate-200'}`}>
      <div className="flex items-center gap-2 mb-4 text-emerald-400 font-medium">
        <BookOpen className="w-5 h-5" />
        <span>知识点参考</span>
      </div>

      <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-2 space-y-4">
        <section className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800/40 border border-slate-700/40' : 'bg-slate-50 border border-slate-200'}`}>
          <div className={`text-xs mb-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <Info className="w-4 h-4" />
            本题训练模式
          </div>
          <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{modeLabel}</div>
          {focusPoints.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {focusPoints.map((p, i) => (
                <span key={i} className="px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {p}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className={`p-3 rounded-lg ${isDarkMode ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
          <div className="text-xs text-amber-300 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            易错提醒
          </div>
          {mistakes.length === 0 ? (
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>本题暂无特殊易错点，按顺序逐行读代码即可。</div>
          ) : (
            <ul className="space-y-2">
              {mistakes.map((m, i) => (
                <li key={i} className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  • {m}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800/30 border border-slate-700/40' : 'bg-slate-50 border border-slate-200'}`}>
          <div className={`text-xs mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>中英关键字对照（点击可复制）</div>

          <div className="space-y-3">
            {grouped.map(([group, items]) => (
              <div key={group}>
                <div className={`text-[11px] uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{group}</div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.word}
                      onClick={() => doCopy(item.word)}
                      className={`w-full text-left p-2.5 rounded-lg border hover:border-emerald-500/30 transition-colors group ${isDarkMode ? 'bg-slate-900/30 border-slate-700/40 hover:bg-slate-900/50' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                      title="点击复制关键字"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-mono text-emerald-300 font-semibold text-base leading-tight">
                            {item.word}
                          </div>
                          <div className={`text-xs mt-0.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.meaning}</div>
                        </div>
                        <div className="mt-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100">
                          {copied === item.word ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-3 pt-3 border-t border-white/5 text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            建议做题方式：先看中文理解 → 再手打英文关键字 → 最后结合解析查漏补缺。
          </div>
        </section>
      </div>
    </aside>
  );
}
