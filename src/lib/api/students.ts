import { supabase } from '../supabase';
import { Profile, User } from '../../types/schema';

export interface StudentWithProfile extends User {
  profile: Profile;
}

export async function getStudents(): Promise<StudentWithProfile[]> {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq('role', 'student');
  
  if (error) throw error;
  return data || [];
}