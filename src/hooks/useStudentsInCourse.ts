import { useState, useEffect } from 'react';
import { getStudentsInCourse } from '../lib/api/enrollments';
import { StudentWithProfile } from '../lib/api/students';

export function useStudentsInCourse(courseId: string) {
  const [students, setStudents] = useState<StudentWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getStudentsInCourse(courseId);
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch students'));
      } finally {
        setIsLoading(false);
      }
    }

    if (courseId) {
      fetchStudents();
    }
  }, [courseId]);

  return { students, isLoading, error };
}