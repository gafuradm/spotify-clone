import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ songs: [], artists: [] });

  const handleSearch = async () => {
    const songQuery = query(collection(db, 'songs'), where('title', '==', searchTerm));
    const artistQuery = query(collection(db, 'artists'), where('name', '==', searchTerm));

    const songSnapshot = await getDocs(songQuery);
    const artistSnapshot = await getDocs(artistQuery);

    const songs = songSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const artists = artistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setResults({ songs, artists });
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for songs or artists"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Songs</h2>
        <ul>
          {results.songs.map((song) => (
            <li key={song.id}>
              {song.title}
              <audio controls>
                <source src={song.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
        <h2>Artists</h2>
        <ul>
          {results.artists.map((artist) => (
            <li key={artist.id}>
              <Link href={`/artists/${artist.id}`}>
                {artist.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
