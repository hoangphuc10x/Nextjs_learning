'use client';
type Props = {
  name: string;
};

export default function Greeting({ name }: Props) {
  return <p className="text-xl">Hello xin chao ban co ten la: {name}</p>;
}
