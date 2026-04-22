-- INITIAL SCHEMA FOR REAL MODE APP

-- Enable Row Level Security
-- 1. PROFILES
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'Atleta',
    streak_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TASKS
CREATE TABLE public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    text TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('BAIXA', 'MEDIA', 'ALTA')) DEFAULT 'MEDIA',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WORKOUTS (Fichas de Treino)
CREATE TABLE public.workouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    duration_minutes INTEGER,
    active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXERCISES (Catálogo de Exercícios)
CREATE TABLE public.exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    target_muscle TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. WORKOUT_EXERCISES (Relacionamento Exercício -> Treino)
CREATE TABLE public.workout_exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workout_id UUID REFERENCES public.workouts ON DELETE CASCADE NOT NULL,
    exercise_id UUID REFERENCES public.exercises ON DELETE CASCADE NOT NULL,
    sets INTEGER DEFAULT 3,
    reps TEXT,
    target_weight_kg NUMERIC,
    "order" INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WORKOUT_SESSIONS (Histórico de Execuções)
CREATE TABLE public.workout_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    workout_id UUID REFERENCES public.workouts ON DELETE SET NULL,
    duration_seconds INTEGER,
    total_volume_kg NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) RULES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Tasks: Private to each user
CREATE POLICY "Tasks are private to owners" ON public.tasks 
    FOR ALL USING (auth.uid() = user_id);

-- Workouts: Private to each user
CREATE POLICY "Workouts are private to owners" ON public.workouts 
    FOR ALL USING (auth.uid() = user_id);

-- Workout Exercises: Linked to workouts
CREATE POLICY "Workout exercises access based on workout ownership" ON public.workout_exercises
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.workouts 
            WHERE id = workout_id AND user_id = auth.uid()
        )
    );

-- Workout Sessions: Private to owner
CREATE POLICY "Sessions are private to owners" ON public.workout_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'Atleta');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
