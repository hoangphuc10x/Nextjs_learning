'use client';
type Props = {
  NameInject: (value: string) => void;
};

export default function NameInput({ NameInject }: Props) {
  return (
    <input
      type="text"
      placeholder="Nhập giá trị truyền vào"
      onChange={e => NameInject(e.target.value)}
      className="p-2 border rounded w-full mb-4"
    />
  );
}
