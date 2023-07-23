import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import initializeAuthentication from "../firebase/firebase-init";

initializeAuthentication();

const useFirebase = () => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = (navigate, location) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        const person = {
          name: result.user.displayName,
          email: result.user.email,
        };
        setUser(person);
        navigate(location);
      })
      .catch((error) => console.log(error.message));
  };

  const createNewUser = (username, email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => setNotification("Email verification sent"))
              .catch((error) => console.log(error));
            setLoading(false);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const signInUser = (email, password, navigate, location) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user.emailVerified === false) {
          setNotification("User not verified! Please check your mail.");
          setLoading(false);
          return;
        }
        const person = {
          name: result.user.displayName,
          email: result.user.email,
        };
        setLoading(false);
        setUser(person);
        navigate(location);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [notification]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        const person = {
          name: user.displayName,
          email: user.email,
        };
        setUser(person);
      }
      setLoading(false);
    });
    return () => unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    googleSignIn,
    user,
    setUser,
    auth,
    signOut,
    createNewUser,
    signInUser,
    loading,
    notification,
  };
};

export default useFirebase;
