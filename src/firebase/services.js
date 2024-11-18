import { auth, db } from "./firebase";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const registerUser = async (email, password, username, points) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      points: points,
    });

    console.log("Zarejestrowano i zapisano dane użytkownika:", user.uid);
  } catch (error) {
    console.error("Błąd rejestracji:", error.code, error.message);
  }
};

const loginUser = async (email, password, context) => {
  const { setUsername, setIsLoggedIn, setUserUid } = context;

  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setUsername(userData.username);
    } else {
      console.log("Brak danych użytkownika w Firestore");
    }
    setUserUid(user.uid);
    setIsLoggedIn(true);
    console.log(user);
  } catch (error) {
    console.error("Błąd logowania:", error.code, error.message);
  }
};

const updatePoints = async (context, continent, level, points) => {
  const userUid = null;
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    points: {
      continent: {
        level: points,
      },
    },
  });
};

export { registerUser, loginUser };
