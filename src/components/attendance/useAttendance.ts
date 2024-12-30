import { useState, useEffect, useCallback } from 'react';
import { getAttendance, AttendanceWithDetails } from '../../lib/api/attendance';

export function useAttendance(courseId: string) {
  const [attendance, setAttendance] = useState<AttendanceWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAttendance(courseId);
      setAttendance(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch attendance'));
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      fetchAttendance();
    }
  }, [courseId, fetchAttendance]);

  return { attendance, isLoading, error, refetch: fetchAttendance };
}