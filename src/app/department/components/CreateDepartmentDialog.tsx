// app/admin/departments/components/CreateDepartmentDialog.tsx
'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

type Props = {
  onCreate: (name: string) => void;
};

export function CreateDepartmentDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Tạo phòng ban mới
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo phòng ban mới</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="dept-name">Tên phòng ban</Label>
          <Input
            id="dept-name"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="VD: Phát triển phần mềm"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Tạo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
