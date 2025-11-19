import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Department } from '../types';
import { useToast } from '@/components/ui/use-toast';
import { gql } from '@/lib/graphql';

const DEPARTMENTS_QUERY = `
  query Departments {
    departments {
      id
      departmentName
      status
      userDepartments {
        id
        assignedAt
        user {
          userid
          username
          email
        }
      }
    }
  }
`;

const CREATE_DEPARTMENT = `
  mutation Create($input: CreateDepartmentInput!) {
    createDepartment(input: $input) { id departmentName status }
  }
`;

const ADD_USER = `
  mutation AddUser($input: AddUserToDepartmentInput!) {
    addUserToDepartment(input: $input) { id }
  }
`;

const DELETE_DEPARTMENT = `
  mutation Delete($id: Int!) {
    removeDepartment(id: $id)
  }
`;

export const useDepartments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: departments = [], isLoading } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: () => gql(DEPARTMENTS_QUERY).then(d => d.departments),
  });

  const createMut = useMutation({
    mutationFn: (name: string) =>
      gql(CREATE_DEPARTMENT, {
        input: { departmentName: name, status: 'active' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast({ title: 'Thành công', description: 'Tạo phòng ban mới' });
    },
  });

  const addUserMut = useMutation({
    mutationFn: (variables: { userId: string; departmentId: number }) =>
      gql(ADD_USER, { input: variables }), // ← đúng format
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast({ title: 'Thành công', description: 'Đã thêm thành viên' });
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => gql(DELETE_DEPARTMENT, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast({ title: 'Đã xóa phòng ban' });
    },
  });

  return {
    departments,
    isLoading,
    createDepartment: createMut.mutate,
    addUserToDepartment: (userId: string, departmentId: number) =>
      addUserMut.mutate({ userId, departmentId }),
    deleteDepartment: deleteMut.mutate,
  };
};
