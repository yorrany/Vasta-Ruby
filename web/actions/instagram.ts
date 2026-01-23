'use server';

import { createClient } from '@/lib/supabase/server';
import { updateInstagramSettings, disconnectInstagram, getInstagramFeed } from '@/lib/instagram-service';
import { revalidateTag } from 'next/cache';

export async function updateDisplayMode(mode: 'grid' | 'gallery' | 'simple_link') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  await updateInstagramSettings(user.id, { display_mode: mode });
  revalidateTag(`instagram-${user.id}`); // Revalidate widget
}

export async function savePostLink(mediaId: string, url: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // Check if link exists
  const { data: existing } = await supabase
    .from('instagram_post_links')
    .select('id')
    .eq('user_id', user.id)
    .eq('instagram_media_id', mediaId)
    .single();

  if (existing) {
    if (!url) {
      await supabase.from('instagram_post_links').delete().eq('id', existing.id);
    } else {
        await supabase
        .from('instagram_post_links')
        .update({ target_url: url })
        .eq('id', existing.id);
    }
  } else if (url) {
    await supabase.from('instagram_post_links').insert({
        user_id: user.id,
        instagram_media_id: mediaId,
        target_url: url
    });
  }

  revalidateTag(`instagram-${user.id}`);
}

export async function disconnectIntegration() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    await disconnectInstagram(user.id);
    revalidateTag(`instagram-${user.id}`);
}

export async function getMyInstagramFeed() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    return await getInstagramFeed(user.id);
}
