'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { gql } from '@/lib/graphql';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        userid
        username
        email
      }
      accessToken
      refreshToken
      expiresIn
    }
  }
`;

export default function LoginPage() {
  const [phone, setPhone] = useState('0111111111');
  const [password, setPassword] = useState('123456');
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (variables: { input: { phone: string; password: string } }) =>
      gql(LOGIN_MUTATION, variables),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync({ input: { phone, password } });

      toast({ title: 'Đăng nhập thành công!' });
      const callbackUrl = searchParams.get('callbackUrl') || '/department';
      window.location.href = callbackUrl;
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description:
          typeof err === 'object' && err !== null && 'message' in err
            ? (err as { message?: string }).message ||
              'Số điện thoại hoặc mật khẩu sai'
            : 'Số điện thoại hoặc mật khẩu sai',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Đăng nhập hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0901234567"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
