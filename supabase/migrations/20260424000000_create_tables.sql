-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Recipes Table
CREATE TABLE public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    iddsi_level INTEGER NOT NULL CHECK (iddsi_level >= 0 AND iddsi_level <= 7),
    base_ingredients TEXT[] NOT NULL,
    recommended_temp TEXT NOT NULL,
    taste_profile TEXT[] NOT NULL,
    image_url TEXT,
    instruction TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Comments Table
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Assuming we might have a users table later, or just simple UUID for now
    recipe_id TEXT NOT NULL,
    thickener_ratio TEXT,
    custom_tip TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)

-- Recipes RLS: Anyone can read recipes.
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recipes are viewable by everyone" 
ON public.recipes FOR SELECT 
USING (true);

-- Comments RLS: Anyone can read comments, and anyone can insert for now (to facilitate local testing).
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone" 
ON public.comments FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert comments" 
ON public.comments FOR INSERT 
WITH CHECK (true);
