'use client';
import Greeting from './components/Greeting';
import NameInput from './components/NameInput';
import { useState } from 'react';

export default function LiftingStatePage() {
  const [name, setName] = useState('');

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        📤 Lifting State Up - Tách Component
      </h1>
      <NameInput NameInject={setName} />
      <Greeting name={name} />
    </main>
  );
}
