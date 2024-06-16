import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function ArtistDetail() {
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchArtist = async () => {
      if (id) {
        try {
          const artistDoc = await getDoc(doc(db, 'artists', id));
          setArtist(artistDoc.data());

          const q = query(collection(db, 'songs'), where('artistId', '==', id));
          const songDocs = await getDocs(q);
          const songsList = songDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSongs(songsList);
        } catch (error) {
          console.error('Error fetching artist or songs:', error);
        }
      }
    };

    fetchArtist();
  }, [id]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <img src={artist.photoUrl} alt={artist.name} />
      <p>{artist.bio}</p>
      <h2>Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title}
            <audio controls>
              <source src={song.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
