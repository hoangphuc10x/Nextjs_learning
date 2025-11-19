'use client';
import { calculateAverageScore, filterPassStudents, student } from './helpers';

export default function StudentPage() {
  const passed = filterPassStudents(student);
  const avg = calculateAverageScore(student);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎓 Danh sách học sinh đậu</h1>
      <ul className="mb-4 list-disc list-inside">
        {passed.map(student => (
          <li key={student.id}>
            name: {student.name} score: {student.score}
          </li>
        ))}
      </ul>
      <p className="font-semibold">📊 Điểm trung bình: {avg}</p>
    </main>
  );
}
