// app/admin/departments/page.tsx (phiên bản hoàn chỉnh có cả table + cards)
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { useDepartments } from './hooks/useDepartments';
import { CreateDepartmentDialog } from './components/CreateDepartmentDialog';
import { AddUserToDepartmentDialog } from './components/AddUserToDepartmentDialog';
import { DepartmentList } from './components/DepartmentList';
import { DepartmentCards } from './components/DepartmentCards';

export default function DepartmentsPage() {
  const {
    departments,
    isLoading,
    createDepartment,
    addUserToDepartment,
    deleteDepartment,
  } = useDepartments();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);

  const handleOpenAddUser = (id: number) => {
    setSelectedDeptId(id);
    setAddUserOpen(true);
  };

  if (isLoading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý Phòng ban</h1>
        <CreateDepartmentDialog onCreate={createDepartment} />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Danh sách phòng ban (bảng)</CardTitle>
          <CardDescription>
            Tổng cộng {departments.length} phòng ban
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DepartmentList
            departments={departments}
            onOpenAddUser={handleOpenAddUser}
            onDelete={deleteDepartment}
          />
        </CardContent>
      </Card>

      <h2 className="text-4xl font-semibold mb-6">Chi tiết từng phòng ban</h2>
      <DepartmentCards
        departments={departments}
        onOpenAddUser={handleOpenAddUser}
      />

      {selectedDeptId && (
        <AddUserToDepartmentDialog
          open={addUserOpen}
          onOpenChange={setAddUserOpen}
          departmentId={selectedDeptId}
          onAdd={addUserToDepartment}
        />
      )}
    </div>
  );
}
