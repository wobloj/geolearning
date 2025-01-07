import { auth, db } from "./firebase";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const isSessionValid = (timestamp) => {
  if (!timestamp) {
    console.warn("Brak znacznika czasu logowania (timestamp).");
    return false;
  }
  const now = Date.now();
  const diffInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
  return diffInDays < 180; // Ważność sesji: 180 dni
};

const registerUser = async (email, password, username, points) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Zapis danych do Firestore, w tym loginTimestamp
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      points: points,
      loginTimestamp: Date.now(), // Zapis aktualnego czasu
    });

    console.log("Zarejestrowano i zapisano dane użytkownika:", user.uid);
  } catch (error) {
    console.error("Błąd rejestracji:", error.code, error.message);
    throw new Error("Rejestracja nie powiodła się.");
  }
};

const loginUser = async (email, password, context) => {
  const { setUsername, setIsLoggedIn, setUserUid } = context;

  try {
    // Ustawienie przetrwania sesji
    await setPersistence(auth, browserLocalPersistence);

    // Logowanie użytkownika
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Pobranie danych użytkownika z Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      console.log("Dane użytkownika z Firestore:", userData);

      // Jeśli brak loginTimestamp, ustaw go teraz
      if (!userData.loginTimestamp) {
        console.warn("Brak znacznika czasu logowania, ustawiam aktualny czas.");
        await updateDoc(userRef, {
          loginTimestamp: Date.now(),
        });
        userData.loginTimestamp = Date.now(); // Zaktualizuj lokalnie, by uniknąć błędu
      }

      // Sprawdzenie ważności sesji
      if (!isSessionValid(userData.loginTimestamp)) {
        console.warn("Sesja użytkownika wygasła. Wylogowywanie...");
        await signOut(auth);
        throw new Error("Sesja użytkownika wygasła. Zaloguj się ponownie.");
      }

      // Zapis danych do kontekstu aplikacji
      setUsername(userData.username);
      setUserUid(user.uid);
      setIsLoggedIn(true);

      // Aktualizacja czasu logowania
      await updateDoc(userRef, {
        loginTimestamp: Date.now(),
      });

      console.log("Zalogowano użytkownika:", user.uid);
    } else {
      throw new Error("Brak danych użytkownika w bazie.");
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    throw new Error(error.message || "Logowanie nie powiodło się.");
  }
};

const updateUserPoints = async (region, quizType, points) => {
  const user = auth.currentUser; // Pobierz zalogowanego użytkownika
  if (!user) {
    console.warn("Użytkownik nie jest zalogowany.");
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.warn("Dokument użytkownika nie istnieje. Tworzę nowy.");
      await setDoc(userRef, { points: {} });
    }

    // Konstrukcja ścieżki do zapisania punktów
    const regionPath = `points.${region}.${quizType}`;

    await updateDoc(userRef, {
      [regionPath]: points,
    });

    console.log("Punkty zostały zaktualizowane:", region, quizType, points);
  } catch (error) {
    console.error("Błąd podczas aktualizacji punktów:", error);
    throw new Error("Nie udało się zaktualizować punktów.");
  }
};

const getLeaderboard = async (continent, level) => {};

export { registerUser, loginUser, updateUserPoints };
