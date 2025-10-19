'use client';

import InputBar from '@/components/InputBar';

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8 px-4">
        <InputBar  onAdd={(transaction) => console.log(transaction)} />
      </main>
    </div>
  );
}
