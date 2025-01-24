'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMusicByGenre } from '@/lib/actions/fetchMusic';

export default function Player() {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (genre) {
          setLoading(true);
          const results = await fetchMusicByGenre(genre);
          setTracks(results);
        }
      } catch (err) {
        setError('Failed to fetch music tracks.');
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [genre]);

  if (!genre) {
    return <p className="text-center mt-10">Loading genre...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Music Player - Genre: {genre}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center mt-10">Loading tracks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white p-4 shadow-md rounded">
              <img
                src={track.album_image || 'default-cover.jpg'}
                alt={track.name || 'Unknown Track'}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="font-bold">{track.name || 'Unknown Title'}</h2>
              <p className="text-sm text-gray-500">{track.artist_name || 'Unknown Artist'}</p>
              <audio controls   src={track.audio || undefined} className="mt-2 w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
