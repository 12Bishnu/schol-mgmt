import React from 'react';
import { useAuthStore } from '../lib/store';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Welcome back!</h2>
        <p className="mt-1 text-sm text-gray-500">
          You are logged in as {user?.email} ({user?.role})
        </p>
      </div>
    </div>
  );
}