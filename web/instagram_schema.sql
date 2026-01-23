-- Instagram Integration Schema

-- connection & auth
create table if not exists instagram_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null unique,
  instagram_user_id text not null,
  username text,
  access_token text not null, -- Encrypted
  token_expires_at timestamptz,
  account_type text, 
  updated_at timestamptz
);

-- display settings
create table if not exists instagram_settings (
  user_id uuid references auth.users(id) primary key,
  display_mode text check (display_mode in ('grid', 'gallery', 'simple_link')),
  items_limit int default 9
);

-- custom links for grid mode
create table if not exists instagram_post_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  instagram_media_id text not null,
  target_url text, -- The custom link
  created_at timestamptz default now()
);

-- Policies (RLS)
alter table instagram_connections enable row level security;
alter table instagram_settings enable row level security;
alter table instagram_post_links enable row level security;

-- Users can only see their own connection
create policy "Users can view own connection"
  on instagram_connections for select
  using (auth.uid() = user_id);

create policy "Users can update own connection"
  on instagram_connections for all
  using (auth.uid() = user_id);

-- Settings policies
create policy "Users can view own settings"
  on instagram_settings for select
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on instagram_settings for all
  using (auth.uid() = user_id);
  
-- Allow public read of settings for the extensive profile view (if applicable)
-- But usually the public profile page fetches this server-side with admin/service role or via a public API. 
-- For now, let's allow public read for settings as they control display.
create policy "Public can view settings"
  on instagram_settings for select
  using (true);

-- Post links policies
create policy "Users can manage own links"
  on instagram_post_links for all
  using (auth.uid() = user_id);

create policy "Public can view post links"
  on instagram_post_links for select
  using (true);
