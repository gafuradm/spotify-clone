import { useState } from 'react';
import { storage, auth, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [photo, setPhoto] = useState(null);
  const [displayName, setDisplayName] = useState(user.displayName || '');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    if (photo) {
      const storageRef = ref(storage, `profiles/${user.uid}`);
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL, displayName });
      await updateDoc(doc(db, 'users', user.uid), { photoURL, displayName });
    } else {
      await updateProfile(user, { displayName });
      await updateDoc(doc(db, 'users', user.uid), { displayName });
    }

    setUser(auth.currentUser);
    alert('Profile updated successfully');
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
      />
      <input type="file" onChange={handlePhotoChange} />
      <button onClick={handleUpdateProfile}>Update Profile</button>
      {user.photoURL && <img src={user.photoURL} alt="Profile" />}
    </div>
  );
}
