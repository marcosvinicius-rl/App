import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  full_name: string;
  role: string;
  streak_count: number;
}

export interface Task {
  id: string;
  text: string;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  completed: boolean;
}

export const dataService = {
  // Profiles
  async getProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Tasks
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createTask(text: string, priority: Task['priority'] = 'MEDIA'): Promise<Task> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ text, priority, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleTask(id: string, completed: boolean): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', id);

    if (error) throw error;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
