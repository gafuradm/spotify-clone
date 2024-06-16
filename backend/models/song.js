const { db } = require('../firebaseConfig');
const { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

const songsCollection = collection(db, 'songs');

const getAllSongs = async () => {
  const snapshot = await getDocs(songsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getSongById = async (id) => {
  const songDoc = await getDoc(doc(db, 'songs', id));
  return songDoc.exists() ? { id: songDoc.id, ...songDoc.data() } : null;
};

const createSong = async (songData) => {
  const newSongRef = await addDoc(songsCollection, songData);
  return { id: newSongRef.id, ...songData };
};

const updateSong = async (id, songData) => {
  const songRef = doc(db, 'songs', id);
  await updateDoc(songRef, songData);
  return { id, ...songData };
};

const deleteSong = async (id) => {
  await deleteDoc(doc(db, 'songs', id));
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
