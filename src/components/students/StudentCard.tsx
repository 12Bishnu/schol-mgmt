import React from 'react';
import { User } from 'lucide-react';
import { StudentWithProfile } from '../../lib/api/students';

interface StudentCardProps {
  student: StudentWithProfile;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {student.profile.first_name} {student.profile.last_name}
            </h3>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.profile.phone || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {student.profile.date_of_birth ? new Date(student.profile.date_of_birth).toLocaleDateString() : 'N/A'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}