// app/admin/departments/types.ts
export type UserDepartment = {
  id: number;
  status: string;
  assignedAt: string;
  user: {
    username: string;
    email: string;
  };
};

export type Department = {
  id: number;
  departmentName: string;
  status: string;
  userDepartments: UserDepartment[];
};
