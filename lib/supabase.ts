import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }

  return data as ExerciseRow[];
}

export async function getExerciseById(id: string) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching exercise:', error);
    return null;
  }

  return data as ExerciseRow;
}

export async function getExerciseVariations(exerciseId: string) {
  const { data, error } = await supabase
    .from('variations')
    .select('*')
    .eq('exercise_id', exerciseId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching variations:', error);
    return [];
  }

  return data as VariationRow[];
}

export async function getHints(variationId: string) {
  const { data, error } = await supabase
    .from('hints')
    .select('*')
    .eq('variation_id', variationId)
    .order('hint_order', { ascending: true });

  if (error) {
    console.error('Error fetching hints:', error);
    return [];
  }

  return data as HintRow[];
}

export async function getWorkSteps(variationId: string) {
  const { data, error } = await supabase
    .from('work_steps')
    .select('*')
    .eq('variation_id', variationId)
    .order('step_order', { ascending: true });

  if (error) {
    console.error('Error fetching work steps:', error);
    return [];
  }

  return data as WorkStepRow[];
}

export async function addExercise(exercise: Omit<ExerciseRow, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('exercises')
    .insert([exercise])
    .select()
    .single();

  if (error) {
    console.error('Error adding exercise:', error);
    throw error;
  }

  return data as ExerciseRow;
}

export async function addVariation(variation: Omit<VariationRow, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('variations')
    .insert([variation])
    .select()
    .single();

  if (error) {
    console.error('Error adding variation:', error);
    throw error;
  }

  return data as VariationRow;
}

export async function addHint(hint: Omit<HintRow, 'id'>) {
  const { data, error } = await supabase
    .from('hints')
    .insert([hint])
    .select()
    .single();

  if (error) {
    console.error('Error adding hint:', error);
    throw error;
  }

  return data as HintRow;
}

export async function addWorkStep(step: Omit<WorkStepRow, 'id'>) {
  const { data, error } = await supabase
    .from('work_steps')
    .insert([step])
    .select()
    .single();

  if (error) {
    console.error('Error adding work step:', error);
    throw error;
  }

  return data as WorkStepRow;
}
