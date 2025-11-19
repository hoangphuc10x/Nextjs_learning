// app/admin/departments/components/DepartmentList.tsx
'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Department } from '../types';
import { DeleteDepartmentConfirm } from './DeleteDepartmentConfirm';

type Props = {
  departments: Department[];
  onOpenAddUser: (id: number) => void;
  onDelete: (id: number) => void;
};

const columns: ColumnDef<Department>[] = [
  {
    accessorKey: 'departmentName',
    header: 'Tên phòng ban',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.departmentName}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === 'active' ? 'default' : 'secondary'}
      >
        {row.original.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
      </Badge>
    ),
  },
  {
    accessorKey: 'userDepartments',
    header: 'Số thành viên',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span>{row.original.userDepartments.length} người</span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Hành động', // Thêm header để đẹp hơn
    cell: ({ row }) => {
      const dept = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => row.getValue('id')} // Không dùng trực tiếp onOpenAddUser ở đây
            // Fix lỗi: dùng getValue hoặc original để lấy id
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Thêm
          </Button>

          <DeleteDepartmentConfirm
            departmentName={dept.departmentName}
            onConfirm={() => row.getValue('id')} // Tương tự
          />
        </div>
      );
    },
  },
];

export function DepartmentList({
  departments,
  onOpenAddUser,
  onDelete,
}: Props) {
  const columns: ColumnDef<Department>[] = [
    {
      id: 'actions',
      header: 'Hành động',
      cell: ({ row }) => {
        const dept = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenAddUser(dept.id)} // Bây giờ hợp lệ!
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Thêm
            </Button>

            <DeleteDepartmentConfirm
              departmentName={dept.departmentName}
              onConfirm={() => onDelete(dept.id)} // Bây giờ hợp lệ!
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: departments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Chưa có phòng ban nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
