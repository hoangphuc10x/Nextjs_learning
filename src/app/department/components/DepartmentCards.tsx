// app/admin/departments/components/DepartmentCards.tsx
'use client';

import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../../../components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { Department } from '../types';

type Props = {
  departments: Department[];
  onOpenAddUser: (id: number) => void;
};

export function DepartmentCards({ departments, onOpenAddUser }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map(dept => (
        <Card key={dept.id}>
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{dept.departmentName}</CardTitle>
                <Badge
                  className="mt-2"
                  variant={dept.status === 'active' ? 'default' : 'secondary'}
                >
                  {dept.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              {dept.userDepartments.length} thành viên
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dept.userDepartments.length === 0 ? (
                <p className="text-sm italic text-muted-foreground">
                  Chưa có thành viên
                </p>
              ) : (
                dept.userDepartments.map(ud => (
                  <div key={ud.id} className="p-3 bg-muted rounded-lg text-sm">
                    <p className="font-medium">{ud.user.username}</p>
                    <p className="text-muted-foreground">{ud.user.email}</p>
                    <p className="text-xs mt-1">
                      Tham gia: {format(new Date(ud.assignedAt), 'dd/MM/yyyy')}
                    </p>
                  </div>
                ))
              )}
            </div>

            <Button
              className="w-full mt-4"
              variant="outline"
              size="sm"
              onClick={() => onOpenAddUser(dept.id)}
            >
              <UserPlus className="w-4 h-4 mr-2" /> Thêm thành viên
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
