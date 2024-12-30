import React, { useState } from 'react';
import { AttendanceTable } from './AttendanceTable';
import { AttendanceFormList } from './AttendanceFormList';
import { useAttendance } from './useAttendance';

interface AttendanceSectionProps {
  courseId: string;
}

export function AttendanceSection({ courseId }: AttendanceSectionProps) {
  const { attendance, isLoading, error, refetch } = useAttendance(courseId);
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Error loading attendance: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Attendance Records</h2>
        <button
          onClick={() => setShowMarkAttendance(!showMarkAttendance)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showMarkAttendance ? 'Hide Form' : 'Mark Attendance'}
        </button>
      </div>

      {showMarkAttendance && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mark Today's Attendance</h3>
          <AttendanceFormList courseId={courseId} onAttendanceMarked={refetch} />
        </div>
      )}

      <AttendanceTable attendance={attendance} isLoading={isLoading} />
    </div>
  );
}