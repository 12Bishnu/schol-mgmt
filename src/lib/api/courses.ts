import { supabase } from '../supabase';
import { Course, User } from '../../types/schema';

export interface CourseWithTeacher extends Course {
  teacher: User | null;
}

export async function getCourses(): Promise<CourseWithTeacher[]> {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      teacher:teacher_id(*)
    `);
  
  if (error) throw error;
  return data || [];
}

export async function createCourse(course: Partial<Course>): Promise<Course> {
  const { data, error } = await supabase
    .from('courses')
    .insert(course)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}