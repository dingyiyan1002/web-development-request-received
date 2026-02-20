import { useState, useEffect, useRef } from 'react';

interface PageTransitionProps {
  viewKey: string;
  direction?: 'forward' | 'back';
  children: React.ReactNode;
}

export function PageTransition({ viewKey, direction = 'forward', children }: PageTransitionProps) {
  const [displayKey, setDisplayKey] = useState(viewKey);
  const [animClass, setAnimClass] = useState('page-enter');
  const prevKey = useRef(viewKey);

  useEffect(() => {
    if (viewKey !== prevKey.current) {
      setAnimClass('page-exit');

      const timer = setTimeout(() => {
        setDisplayKey(viewKey);
        prevKey.current = viewKey;
        setAnimClass(direction === 'back' ? 'page-enter-left' : 'page-enter');
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [viewKey, direction]);

  return (
    <div key={displayKey} className={animClass}>
      {children}
    </div>
  );
}
