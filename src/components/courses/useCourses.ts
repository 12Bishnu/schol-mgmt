import { useState, useEffect } from 'react';
import { getCourses, CourseWithTeacher } from '../../lib/api/courses';

export function useCourses() {
  const [courses, setCourses] = useState<CourseWithTeacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, isLoading, error };
}