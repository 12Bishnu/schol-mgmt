import React from 'react';
import { CourseList } from '../components/courses/CourseList';

export function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
      </div>
      <CourseList />
    </div>
  );
}