-- deathcare.live initial schema
-- Apply with: mcp__Supabase__apply_migration or supabase db push

-- ── Profiles ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  display_name text NOT NULL,
  role text NOT NULL DEFAULT 'observer'
    CHECK (role IN ('director','operator','supplier','association','educator','observer')),
  state text,
  license_number text,
  verified_at timestamptz,
  verified_by text,
  bio text,
  avatar_url text,
  website text,
  years_active int,
  expertise text[] DEFAULT '{}',
  post_count int DEFAULT 0,
  endorsement_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── Posts ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  kind text NOT NULL DEFAULT 'note'
    CHECK (kind IN ('note','analysis','position','question','report')),
  body text NOT NULL CHECK (char_length(body) BETWEEN 10 AND 3000),
  state text,
  bill_id text,
  is_anonymous bool DEFAULT false,
  upvotes int DEFAULT 0,
  comment_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── Comments ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES comments(id),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 1000),
  created_at timestamptz DEFAULT now()
);

-- ── Bill follows ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bill_follows (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  bill_id text NOT NULL,
  state text NOT NULL,
  followed_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, bill_id)
);

-- ── Coalitions ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coalitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id text NOT NULL,
  state text NOT NULL,
  position text NOT NULL CHECK (position IN ('support','oppose','amend')),
  name text NOT NULL,
  statement text,
  lead_profile_id uuid REFERENCES profiles(id),
  member_count int DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coalition_members (
  coalition_id uuid REFERENCES coalitions(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (coalition_id, profile_id)
);

-- ── Bill position tallies ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bill_positions (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  bill_id text NOT NULL,
  state text NOT NULL,
  position text NOT NULL CHECK (position IN ('support','oppose','amend','monitor')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, bill_id)
);

-- ── Endorsements ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS endorsements (
  from_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  to_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  expertise text,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (from_id, to_id)
);

-- ── CE credit log ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ce_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider text NOT NULL,
  course_name text NOT NULL,
  hours numeric(4,1) NOT NULL CHECK (hours > 0 AND hours <= 40),
  completed_date date NOT NULL,
  state text,
  certificate_url text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON posts(author_id);
CREATE INDEX IF NOT EXISTS posts_state_idx ON posts(state);
CREATE INDEX IF NOT EXISTS posts_bill_id_idx ON posts(bill_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS bill_follows_profile_id_idx ON bill_follows(profile_id);
CREATE INDEX IF NOT EXISTS coalitions_bill_id_idx ON coalitions(bill_id);
CREATE INDEX IF NOT EXISTS ce_credits_profile_id_idx ON ce_credits(profile_id);

-- ── Row Level Security ────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE coalitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coalition_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ce_credits ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_owner_insert" ON profiles FOR INSERT WITH CHECK (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');
CREATE POLICY "profiles_owner_update" ON profiles FOR UPDATE USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Posts: public read, author write
CREATE POLICY "posts_public_read" ON posts FOR SELECT USING (true);
CREATE POLICY "posts_author_insert" ON posts FOR INSERT WITH CHECK (
  author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);
CREATE POLICY "posts_author_update" ON posts FOR UPDATE USING (
  author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);
CREATE POLICY "posts_author_delete" ON posts FOR DELETE USING (
  author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);

-- Comments: public read, author write
CREATE POLICY "comments_public_read" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_author_write" ON comments FOR INSERT WITH CHECK (
  author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);

-- Bill follows: owner only
CREATE POLICY "bill_follows_owner" ON bill_follows USING (
  profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);

-- Coalitions: public read, authenticated write
CREATE POLICY "coalitions_public_read" ON coalitions FOR SELECT USING (true);
CREATE POLICY "coalition_members_public_read" ON coalition_members FOR SELECT USING (true);

-- Bill positions: public read, owner write
CREATE POLICY "bill_positions_public_read" ON bill_positions FOR SELECT USING (true);
CREATE POLICY "bill_positions_owner_write" ON bill_positions FOR INSERT WITH CHECK (
  profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);

-- CE credits: owner only
CREATE POLICY "ce_credits_owner" ON ce_credits USING (
  profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
);

-- ── updated_at triggers ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
