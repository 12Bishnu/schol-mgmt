import { useState, useEffect } from 'react';
import { getStudents, StudentWithProfile } from '../../lib/api/students';

export function useStudents() {
  const [students, setStudents] = useState<StudentWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch students'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
  }, []);

  return { students, isLoading, error };
}