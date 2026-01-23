import { getInstagramFeed, getInstagramSettings } from '@/lib/instagram-service';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

interface InstagramWidgetProps {
    userId: string;
}

export default async function InstagramWidget({ userId }: InstagramWidgetProps) {
    // Parallel fetch
    const [feed, settings] = await Promise.all([
        getInstagramFeed(userId),
        getInstagramSettings(userId)
    ]);

    if (!feed || feed.length === 0 || !settings) {
        // Fallback or nothing. If Simple Mode is forced, we might want to check connection existence separately.
        // For now, if feed fails (token invalid), return null.
        return null;
    }

    const { display_mode } = settings;

    // --- Display Modes ---

    // 1. Simple Link Mode
    if (display_mode === 'simple_link') {
        // We assume the first post's username is correct or we should have fetched the profile.
        // Ideally we store username in settings or connection. 
        // `feed[0].username` works if feed has items.
        const username = feed[0]?.username;
        if (!username) return null;

        return (
            <Link
                href={`https://instagram.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all gap-3"
            >
                <Instagram className="w-6 h-6" />
                <span className="font-medium">@{username}</span>
            </Link>
        );
    }

    // 2. Grid Mode
    if (display_mode === 'grid') {
        return (
            <div className="w-full grid grid-cols-3 gap-1 @container">
                {feed.slice(0, 9).map((post) => (
                    <Link
                        key={post.id}
                        href={post.custom_link || post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square block overflow-hidden bg-gray-100 dark:bg-gray-800 group"
                    >
                        {post.media_type === 'VIDEO' ? (
                            <Image
                                src={post.thumbnail_url || post.media_url} // Fallback if thumb missing (some endpoints differ)
                                alt={post.caption || 'Instagram Video'}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 33vw, 20vw"
                            />
                        ) : (
                            <Image
                                src={post.media_url}
                                alt={post.caption || 'Instagram Post'}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 33vw, 20vw"
                            />
                        )}
                        {/* Overlay Icon for Video or Album if needed */}
                    </Link>
                ))}
            </div>
        );
    }

    // 3. Gallery Mode (Horizontal Scroll)
    if (display_mode === 'gallery') {
        return (
            <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 w-max">
                    {feed.slice(0, 12).map((post) => (
                        <Link
                            key={post.id}
                            href={post.custom_link || post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all md:hover:-translate-y-1"
                        >
                            {post.media_type === 'VIDEO' ? (
                                <Image
                                    src={post.thumbnail_url || post.media_url}
                                    alt={post.caption || 'Instagram Video'}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            ) : (
                                <Image
                                    src={post.media_url}
                                    alt={post.caption || 'Instagram Post'}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
