import { createContext, useState } from 'react';
import { auth,storage,firestore } from './config';  //

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FirebaseContext.Provider value={{ auth ,storage,firestore}}>
        {children}
      </FirebaseContext.Provider>
    </AuthContext.Provider>
  );
}
