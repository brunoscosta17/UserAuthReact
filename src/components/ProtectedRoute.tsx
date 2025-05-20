'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else {
      setChecked(true);
    }
  }, [user, loading]);

    if (loading) return <Spinner />;

    if (!user) return null;

    if (!checked) return null;

  return <>{children}</>;
}
