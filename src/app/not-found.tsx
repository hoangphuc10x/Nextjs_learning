'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, LogIn } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(5);
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const cookie = document.cookie;
    setHasToken(
      cookie.includes('access_token') || cookie.includes('refresh_token'),
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        document.cookie.includes('refresh_token') ||
        document.cookie.includes('access_token')
      ) {
        router.replace('/department'); // hoặc /admin
      } else {
        router.replace('/login');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoHome = () => {
    if (
      document.cookie.includes('refresh_token') ||
      document.cookie.includes('access_token')
    ) {
      router.replace('/department');
    } else {
      router.replace('/login');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-5xl font-bold text-red-600">404</span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Oops! Trang không tồn tại
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Có vẻ như bạn đang cố truy cập một trang không có quyền hoặc đã bị
            xóa.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-sm text-gray-500">
            Bạn sẽ được chuyển hướng tự động trong <strong>{count}</strong>...
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoHome}
              size="lg"
              className="flex items-center gap-2"
            >
              {hasToken ? (
                <>
                  <Home className="w-5 h-5" />
                  Về Trang chủ
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Đăng nhập lại
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-gray-400 mt-8">
            Nếu bạn nghĩ đây là lỗi, vui lòng liên hệ quản trị viên.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
