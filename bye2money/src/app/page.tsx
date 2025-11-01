'use client';

import Header from '@/components/Header';
import InputBar from '@/components/InputBar';
import { DateProvider } from '@/contexts/DateContext';

export default function Home() {

  return (
    <DateProvider>
      <div className="min-h-screen bg-gray-50">
        <main className="py-8 px-4">
          <div className="relative w-full">
            <Header />
            <div className="mt-8">
              <InputBar onAdd={(transaction) => console.log(transaction)} />
            </div>
          </div>
        </main>
      </div>
    </DateProvider>
  );
}
