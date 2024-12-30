import { supabase } from '../supabase';
import { Attendance } from '../../types/schema';

export interface AttendanceWithDetails extends Attendance {
  student: {
    email: string;
    profile: {
      first_name: string;
      last_name: string;
    };
  };
  course: {
    name: string;
    code: string;
  };
}

export async function getAttendance(courseId: string): Promise<AttendanceWithDetails[]> {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      student:student_id(
        email,
        profile:profiles(
          first_name,
          last_name
        )
      ),
      course:course_id(
        name,
        code
      )
    `)
    .eq('course_id', courseId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function markAttendance(attendance: Partial<Attendance>): Promise<Attendance> {
  const { data, error } = await supabase
    .from('attendance')
    .upsert({
      ...attendance,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}