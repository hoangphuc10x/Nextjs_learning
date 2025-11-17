'use client';
import React from 'react';

type GreetingProps = {
  name: string;
  age: number;
};

// Component con
function Greeting({ name, age }: GreetingProps) {
  return (
    <p>
      👋 Xin chào {name}, bạn {age} tuổi!
    </p>
  );
}

// Component cha
export default function ComponentPropsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Component & Props</h1>
      <Greeting name="Phúc" age={22} />
      <Greeting name="An" age={30} />
    </main>
  );
}
