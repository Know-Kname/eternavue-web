-- deathcare.live community schema
-- Apply with: supabase db push  OR  mcp__Supabase__apply_migration

-- ── Profiles ──────────────────────────────────────────────────────────────────
CREATE TABLE profiles (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id      text        UNIQUE NOT NULL,
  username      text        UNIQUE NOT NULL,
  display_name  text,
  role          text        NOT NULL DEFAULT 'observer'
                            CHECK (role IN ('director','operator','supplier','association','educator','observer')),
  state         text,
  license_number text,
  verified_at   timestamptz,
  verified_by   text,
  bio           text,
  avatar_url    text,
  website       text,
  years_active  int,
  expertise     text[]      DEFAULT '{}',
  created_at    timestamptz DEFAULT now()
);

-- ── Posts ─────────────────────────────────────────────────────────────────────
CREATE TABLE posts (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id    uuid        REFERENCES profiles(id) ON DELETE CASCADE,
  kind         text        NOT NULL DEFAULT 'note'
                           CHECK (kind IN ('note','analysis','position','question','report')),
  body         text        NOT NULL CHECK (char_length(body) <= 3000),
  state        text,
  bill_id      text,
  is_anonymous bool        DEFAULT false,
  upvotes      int         DEFAULT 0,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- ── Comments ──────────────────────────────────────────────────────────────────
CREATE TABLE comments (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid        REFERENCES posts(id) ON DELETE CASCADE,
  parent_id  uuid        REFERENCES comments(id),
  author_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE,
  body       text        NOT NULL CHECK (char_length(body) <= 1000),
  created_at timestamptz DEFAULT now()
);

-- ── Bill follows ──────────────────────────────────────────────────────────────
CREATE TABLE bill_follows (
  profile_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE,
  bill_id     text        NOT NULL,
  state       text        NOT NULL,
  followed_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, bill_id)
);

-- ── Coalitions ────────────────────────────────────────────────────────────────
CREATE TABLE coalitions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id         text        NOT NULL,
  state           text        NOT NULL,
  position        text        NOT NULL CHECK (position IN ('support','oppose','amend')),
  name            text        NOT NULL,
  statement       text,
  lead_profile_id uuid        REFERENCES profiles(id),
  member_count    int         DEFAULT 1,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE coalition_members (
  coalition_id uuid        REFERENCES coalitions(id) ON DELETE CASCADE,
  profile_id   uuid        REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at    timestamptz DEFAULT now(),
  PRIMARY KEY (coalition_id, profile_id)
);

-- ── Endorsements ─────────────────────────────────────────────────────────────
CREATE TABLE endorsements (
  from_id    uuid REFERENCES profiles(id) ON DELETE CASCADE,
  to_id      uuid REFERENCES profiles(id) ON DELETE CASCADE,
  expertise  text,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (from_id, to_id)
);

-- ── Bills cache (LegiScan) ────────────────────────────────────────────────────
CREATE TABLE bills_cache (
  bill_id      text        PRIMARY KEY,
  state        text        NOT NULL,
  bill_number  text        NOT NULL,
  title        text        NOT NULL,
  description  text,
  status       text,
  status_date  text,
  last_action  text,
  last_action_date text,
  url          text,
  sponsors     jsonb       DEFAULT '[]',
  history      jsonb       DEFAULT '[]',
  raw          jsonb,
  cached_at    timestamptz DEFAULT now(),
  expires_at   timestamptz DEFAULT (now() + INTERVAL '6 hours')
);

CREATE INDEX bills_cache_state_idx ON bills_cache (state);
CREATE INDEX bills_cache_expires_idx ON bills_cache (expires_at);

-- ── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_follows      ENABLE ROW LEVEL SECURITY;
ALTER TABLE coalitions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE coalition_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements      ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills_cache       ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Posts: public read, authenticated insert
CREATE POLICY "posts_select"   ON posts FOR SELECT USING (true);
CREATE POLICY "posts_insert"   ON posts FOR INSERT WITH CHECK (author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "posts_update"   ON posts FOR UPDATE USING (author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "posts_delete"   ON posts FOR DELETE USING (author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Comments: public read, authenticated insert
CREATE POLICY "comments_select" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "comments_delete" ON comments FOR DELETE USING (author_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Bill follows: owner only
CREATE POLICY "bill_follows_select" ON bill_follows FOR SELECT USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "bill_follows_insert" ON bill_follows FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "bill_follows_delete" ON bill_follows FOR DELETE USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Coalitions: public read, authenticated insert
CREATE POLICY "coalitions_select" ON coalitions FOR SELECT USING (true);
CREATE POLICY "coalitions_insert" ON coalitions FOR INSERT WITH CHECK (lead_profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Coalition members: public read, self-manage
CREATE POLICY "coalition_members_select" ON coalition_members FOR SELECT USING (true);
CREATE POLICY "coalition_members_insert" ON coalition_members FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "coalition_members_delete" ON coalition_members FOR DELETE USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Endorsements: public read, authenticated insert (can't endorse self)
CREATE POLICY "endorsements_select" ON endorsements FOR SELECT USING (true);
CREATE POLICY "endorsements_insert" ON endorsements FOR INSERT WITH CHECK (
  from_id IN (SELECT id FROM profiles WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
  AND from_id != to_id
);

-- Bills cache: public read, service-role write (cron job uses service role)
CREATE POLICY "bills_cache_select" ON bills_cache FOR SELECT USING (true);
