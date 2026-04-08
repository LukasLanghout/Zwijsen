import { createClient } from '@supabase/supabase-js';

let supabaseInstance: any = null;

function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables not configured');
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Exercise types
export interface ExerciseRow {
  id: string;
  title: string;
  description: string | null;
  exercise_type: string;
  grade_level: string;
  difficulty: string;
  topic: string | null;
  original_problem: string | null;
  estimated_time: number;
  source_file: string | null;
  created_at: string;
  updated_at: string;
  validation_status: 'pending' | 'approved' | 'rejected' | 'needs_review';
  editor_notes: string | null;
  question_type: string | null;
  validated_by: string | null;
  validated_at: string | null;
}

export interface VariationRow {
  id: string;
  exercise_id: string;
  problem: string;
  correct_answer: string | null;
  explanation: string | null;
  created_at: string;
}

export interface HintRow {
  id: string;
  variation_id: string;
  hint_text: string;
  hint_order: number;
}

export interface WorkStepRow {
  id: string;
  variation_id: string;
  step_text: string;
  step_order: number;
}

// Database functions
export async function getExercises() {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('exercises')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }

    return (data || []) as ExerciseRow[];
  } catch (err) {
    console.error('Exception fetching exercises:', err);
    return [];
  }
}

export async function getExerciseById(id: string) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching exercise:', error);
      return null;
    }

    return data as ExerciseRow;
  } catch (err) {
    console.error('Exception fetching exercise:', err);
    return null;
  }
}

export async function getExerciseVariations(exerciseId: string) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('variations')
      .select('*')
      .eq('exercise_id', exerciseId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching variations:', error);
      return [];
    }

    return (data || []) as VariationRow[];
  } catch (err) {
    console.error('Exception fetching variations:', err);
    return [];
  }
}

export async function getHints(variationId: string) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('hints')
      .select('*')
      .eq('variation_id', variationId)
      .order('hint_order', { ascending: true });

    if (error) {
      console.error('Error fetching hints:', error);
      return [];
    }

    return (data || []) as HintRow[];
  } catch (err) {
    console.error('Exception fetching hints:', err);
    return [];
  }
}

export async function getWorkSteps(variationId: string) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('work_steps')
      .select('*')
      .eq('variation_id', variationId)
      .order('step_order', { ascending: true });

    if (error) {
      console.error('Error fetching work steps:', error);
      return [];
    }

    return (data || []) as WorkStepRow[];
  } catch (err) {
    console.error('Exception fetching work steps:', err);
    return [];
  }
}

export async function addExercise(exercise: Omit<ExerciseRow, 'id' | 'created_at' | 'updated_at'>) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase not configured');

  try {
    const { data, error } = await client
      .from('exercises')
      .insert([exercise])
      .select()
      .single();

    if (error) throw error;
    return data as ExerciseRow;
  } catch (err) {
    console.error('Error adding exercise:', err);
    throw err;
  }
}

export async function addVariation(variation: Omit<VariationRow, 'id' | 'created_at'>) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase not configured');

  try {
    const { data, error } = await client
      .from('variations')
      .insert([variation])
      .select()
      .single();

    if (error) throw error;
    return data as VariationRow;
  } catch (err) {
    console.error('Error adding variation:', err);
    throw err;
  }
}

export async function addHint(hint: Omit<HintRow, 'id'>) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase not configured');

  try {
    const { data, error } = await client
      .from('hints')
      .insert([hint])
      .select()
      .single();

    if (error) throw error;
    return data as HintRow;
  } catch (err) {
    console.error('Error adding hint:', err);
    throw err;
  }
}

export async function addWorkStep(step: Omit<WorkStepRow, 'id'>) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase not configured');

  try {
    const { data, error } = await client
      .from('work_steps')
      .insert([step])
      .select()
      .single();

    if (error) throw error;
    return data as WorkStepRow;
  } catch (err) {
    console.error('Error adding work step:', err);
    throw err;
  }
}

// Validation functions
export async function getExercisesByStatus(status: string) {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('exercises')
      .select('*')
      .eq('validation_status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching exercises by status:', error);
      return [];
    }

    return (data || []) as ExerciseRow[];
  } catch (err) {
    console.error('Exception fetching exercises by status:', err);
    return [];
  }
}

export async function updateExerciseValidation(
  id: string,
  updates: {
    validation_status?: 'pending' | 'approved' | 'rejected' | 'needs_review';
    editor_notes?: string | null;
    question_type?: string | null;
    title?: string;
    description?: string;
  }
) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('exercises')
      .update({
        ...updates,
        validated_at: updates.validation_status ? new Date().toISOString() : undefined
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating exercise validation:', error);
      return null;
    }

    return data as ExerciseRow;
  } catch (err) {
    console.error('Exception updating exercise validation:', err);
    return null;
  }
}

export async function updateVariationDetails(
  id: string,
  updates: {
    problem?: string;
    correct_answer?: string;
    explanation?: string;
  }
) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('variations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating variation:', error);
      return null;
    }

    return data as VariationRow;
  } catch (err) {
    console.error('Exception updating variation:', err);
    return null;
  }
}
