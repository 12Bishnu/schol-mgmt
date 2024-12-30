import React from 'react';
import { BookOpen, User } from 'lucide-react';
import { CourseWithTeacher } from '../../lib/api/courses';

interface CourseCardProps {
  course: CourseWithTeacher;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <BookOpen className="h-12 w-12 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
            <p className="text-sm text-gray-500">Code: {course.code}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">{course.description || 'No description available.'}</p>
        </div>
        <div className="mt-4 border-t pt-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Credits</dt>
              <dd className="mt-1 text-sm text-gray-900">{course.credits}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Teacher</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <User className="h-4 w-4 mr-1" />
                {course.teacher?.email || 'Unassigned'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}