'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useDateNavigation } from '@/hooks/useDateNavigation';

interface DateContextValue {
  currentDate: Date;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  year: number;
  month: number;
}

const DateContext = createContext<DateContextValue | undefined>(undefined);

interface DateProviderProps {
  children: ReactNode;
}

export function DateProvider({ children }: DateProviderProps) {
  const dateNavigation = useDateNavigation();

  return (
    <DateContext.Provider value={dateNavigation}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
}
