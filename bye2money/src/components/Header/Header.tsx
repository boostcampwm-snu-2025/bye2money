'use client';

import { HeaderTitle } from './HeaderTitle';
import { DateNavigator } from './DateNavigator';
import { HeaderActions } from './HeaderActions';

export default function Header() {
  return (
    <header 
      className="flex flex-row justify-between items-center w-full max-w-[846px] h-[112px] mx-auto"
      style={{
        padding: '0px',
        gap: '199px',
      }}
    >
      <HeaderTitle />
      <DateNavigator />
      <HeaderActions />
    </header>
  );
}
