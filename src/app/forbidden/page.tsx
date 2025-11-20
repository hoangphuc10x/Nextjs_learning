// app/forbidden/page.tsx   (hoặc app/403/page.tsx nếu thích)
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldAlert, ArrowLeft, Home, LogOut } from 'lucide-react';

export default function ForbiddenPage() {
  const isLoggedIn =
    typeof document !== 'undefined' &&
    (document.cookie.includes('access_token') ||
      document.cookie.includes('refresh_token'));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <Card className="w-full max-w-lg shadow-2xl border-red-200">
        <CardHeader className="text-center pb-8 pt-10">
          <div className="mx-auto w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <ShieldAlert className="w-16 h-16 text-red-600" />
          </div>
          <CardTitle className="text-4xl font-bold text-gray-800">
            403
          </CardTitle>
          <CardDescription className="text-xl mt-3 text-gray-600">
            Truy cập bị từ chối
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 text-center pb-10">
          <div className="space-y-3">
            <p className="text-lg text-gray-700">
              Bạn <strong>không có quyền</strong> truy cập trang này.
            </p>
            <p className="text-sm text-gray-500">
              {isLoggedIn
                ? 'Tài khoản của bạn không đủ quyền hạn để xem nội dung này.'
                : 'Bạn cần đăng nhập với tài khoản có quyền phù hợp.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {isLoggedIn ? (
              <>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/department">
                    <Home className="w-5 h-5" />
                    Về Trang chủ
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/profile">
                    <ArrowLeft className="w-5 h-5" />
                    Trang cá nhân
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/login">
                    <LogOut className="w-5 h-5 rotate-180" />
                    Đăng nhập
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/">
                    <Home className="w-5 h-5" />
                    Trang chủ
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="text-xs text-gray-400 mt-8">
            Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ quản trị viên hệ
            thống.
            <br />
            Mã lỗi: 403 - Forbidden
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
