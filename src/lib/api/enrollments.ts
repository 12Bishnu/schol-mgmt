import { supabase } from '../supabase';
import { StudentWithProfile } from './students';

export async function getStudentsInCourse(courseId: string): Promise<StudentWithProfile[]> {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      student:student_id(
        id,
        email,
        role,
        created_at,
        updated_at,
        profile:profiles(*)
      )
    `)
    .eq('course_id', courseId)
    .eq('status', 'active');

  if (error) throw error;
  return data?.map(enrollment => enrollment.student) || [];
}