import React, { useState } from 'react';
import { markAttendance } from '../../lib/api/attendance';
import { StudentWithProfile } from '../../lib/api/students';

interface AttendanceFormProps {
  student: StudentWithProfile;
  courseId: string;
  onAttendanceMarked: () => void;
}

export function AttendanceForm({
  student,
  courseId,
  onAttendanceMarked,
}: AttendanceFormProps) {
  const [status, setStatus] = useState('present');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await markAttendance({
        student_id: student.id,
        course_id: courseId,
        date: new Date().toISOString().split('T')[0],
        status,
      });
      onAttendanceMarked();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to mark attendance'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">
          {student.profile.first_name} {student.profile.last_name}
        </span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Marking...' : 'Mark Attendance'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
