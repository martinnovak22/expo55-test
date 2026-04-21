import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type ActivityFilter = 'all' | 'settled' | 'posted' | 'pending';

const FILTER_SEQUENCE: ActivityFilter[] = ['all', 'posted', 'pending', 'settled'];

type ActivityTabStateValue = {
  filter: ActivityFilter;
  setFilter: (nextFilter: ActivityFilter) => void;
  cycleFilter: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  disableTransparentOnScrollEdge: boolean;
  setDisableTransparentOnScrollEdge: (value: boolean) => void;
};

const ActivityTabStateContext = createContext<ActivityTabStateValue | null>(null);

export function ActivityTabStateProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<ActivityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [disableTransparentOnScrollEdge, setDisableTransparentOnScrollEdge] = useState(false);

  const cycleFilter = useCallback(() => {
    setFilter((currentFilter) => {
      const currentIndex = FILTER_SEQUENCE.indexOf(currentFilter);
      const nextIndex = (currentIndex + 1) % FILTER_SEQUENCE.length;
      return FILTER_SEQUENCE[nextIndex] ?? 'all';
    });
  }, []);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      cycleFilter,
      searchQuery,
      setSearchQuery,
      disableTransparentOnScrollEdge,
      setDisableTransparentOnScrollEdge,
    }),
    [cycleFilter, disableTransparentOnScrollEdge, filter, searchQuery]
  );

  return (
    <ActivityTabStateContext.Provider value={value}>{children}</ActivityTabStateContext.Provider>
  );
}

export function useActivityTabState(): ActivityTabStateValue {
  const value = useContext(ActivityTabStateContext);

  if (!value) {
    throw new Error('useActivityTabState must be used inside ActivityTabStateProvider');
  }

  return value;
}
