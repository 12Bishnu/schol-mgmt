import React from 'react';
import { useParams } from 'react-router-dom';
import { AttendanceSection } from '../components/attendance/AttendanceSection';

export function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) {
    return <div>Course not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Course Details</h1>
      <AttendanceSection courseId={courseId} />
    </div>
  );
}