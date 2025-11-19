// app/admin/departments/components/AddUserToDepartmentDialog.tsx
'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: number;
  onAdd: (userId: string, deptId: number) => void;
};

export function AddUserToDepartmentDialog({
  open,
  onOpenChange,
  departmentId,
  onAdd,
}: Props) {
  const [userId, setUserId] = useState('');

  const handleAdd = () => {
    if (userId.trim()) {
      onAdd(userId.trim(), departmentId);
      setUserId('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm thành viên vào phòng ban</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="userid">User ID</Label>
          <Input
            id="userid"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="auth0|123456 hoặc 60d21b..."
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAdd} disabled={!userId.trim()}>
            Thêm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
