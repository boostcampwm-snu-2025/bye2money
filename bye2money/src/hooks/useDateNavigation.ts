'use client';

import { useState } from 'react';

export function useDateNavigation() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return {
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    year,
    month,
  };
}
