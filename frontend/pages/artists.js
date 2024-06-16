import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artists'));
        const artistsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArtists(artistsList);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/artists/${artist.id}`}>
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
