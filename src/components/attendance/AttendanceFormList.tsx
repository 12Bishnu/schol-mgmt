import React from 'react';
import { AttendanceForm } from './AttendanceForm';
import { useStudentsInCourse } from '../../hooks/useStudentsInCourse';

interface AttendanceFormListProps {
  courseId: string;
  onAttendanceMarked: () => void;
}

export function AttendanceFormList({ courseId, onAttendanceMarked }: AttendanceFormListProps) {
  const { students, isLoading, error } = useStudentsInCourse(courseId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Error loading students: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <AttendanceForm
          key={student.id}
          student={student}
          courseId={courseId}
          onAttendanceMarked={onAttendanceMarked}
        />
      ))}
    </div>
  );
}