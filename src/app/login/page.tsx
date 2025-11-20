// app/login/page.tsx (hoặc app/auth/login/page.tsx)
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
import { LogIn, Phone, Lock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        userid
        username
        email
        role {
          id
          roleName
        }
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

      toast({
        title: '🎉 Đăng nhập thành công!',
        description: 'Chào mừng bạn trở lại hệ thống',
      });

      const callbackUrl = searchParams.get('callbackUrl') || '/department';
      window.location.href = callbackUrl;
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description:
          typeof err === 'object' && err !== null && 'message' in err
            ? (err as { message?: string }).message ||
              'Số điện thoại hoặc mật khẩu không đúng'
            : 'Số điện thoại hoặc mật khẩu không đúng',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Background gradient + particles effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-600/30 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Card - Glassmorphism + hover lift */}
      <Card
        className={cn(
          'relative w-full max-w-md shadow-2xl backdrop-blur-xl',
          'bg-white/10 dark:bg-black/10 border-white/20',
          'transition-all duration-500 hover:shadow-3xl hover:shadow-primary/20 hover:-translate-y-2',
        )}
      >
        {/* Logo + Title */}
        <CardHeader className="space-y-6 pb-8 text-center">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
              Chào mừng trở lại
            </CardTitle>
            <p className="text-white/70 mt-2 text-sm">
              Đăng nhập để tiếp tục quản lý phòng ban
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/90 font-medium">
                Số điện thoại
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0901234567"
                  required
                  className={cn(
                    'pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40',
                    'focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all',
                  )}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 font-medium">
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={cn(
                    'pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40',
                    'focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all',
                  )}
                />
              </div>
            </div>

            {/* Submit Button - Gradient + Pulse */}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className={cn(
                'w-full h-12 text-white font-bold text-lg shadow-xl',
                'bg-gradient-to-r from-cyan-500 to-blue-600',
                'hover:from-cyan-600 hover:to-blue-700',
                'disabled:opacity-70 disabled:cursor-not-allowed',
                'transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105',
              )}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Đăng nhập ngay
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
