export type student = {
  id: number;
  name: string;
  score: number;
};

export const student: student[] = [
  { id: 1, name: 'An', score: 7.5 },
  { id: 2, name: 'Bình', score: 4.8 },
  { id: 3, name: 'Châu', score: 9.1 },
  { id: 4, name: 'Dũng', score: 5.0 },
];

export function filterPassStudents(data: student[]) {
  return data.filter(student => student.score >= 5);
}

export function calculateAverageScore(data: student[]) {
  const total = data.reduce((sum, student) => sum + student.score, 0);
  //reduce là một phương thức để tính toán tổng hợp từ một mảng
  //công thức:
  //mảng.reduce(
  // (biến lưu giá trị, mảng cần lặp qua)
  // => thuật toán , giá trị khởi tạo của biến lưu giá trị
  // )
  return total / data.length;
}
