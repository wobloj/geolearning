import { auth, db } from "./firebase";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

    // Zapis danych do Firestore, w tym loginTimestamp
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      points: points,
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

const updateUserPoints = async (region, quizType, mode, points, username) => {
  const user = auth.currentUser;
  console.log(user) // Pobierz zalogowanego użytkownika
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

    // Konstrukcja ścieżki do leaderboarda
    const leaderboardRef = doc(db, "leaderboard", `${region}_${quizType}_${mode}`);
    const leaderboardSnapshot = await getDoc(leaderboardRef);

    if (!leaderboardSnapshot.exists()) {
      console.warn("Dokument leaderboarda nie istnieje. Tworzę nowy.");
      await setDoc(leaderboardRef, {});
    }

    // Sprawdź obecne punkty użytkownika w leaderboardzie
    const leaderboardData = leaderboardSnapshot.data() || {};
    const currentPoints = leaderboardData[user.displayName]?.points || 0;

    if (points > currentPoints) {
      // Aktualizacja punktów w leaderboardzie
      await updateDoc(leaderboardRef, {
        [`${username}`]: { points },
      });
      console.log("Punkty zostały zaktualizowane w leaderboardzie:", user.displayName, points);
    } else {
      console.log("Nowe punkty nie są większe niż obecne. Aktualizacja nie jest wymagana.");
    }
  } catch (error) {
    console.error("Błąd podczas aktualizacji punktów:", error);
    throw new Error("Nie udało się zaktualizować punktów.");
  }
};

const getLeaderboard = async (region, quizType, mode) => {
  console.log("Rozpoczęto pobieranie tablicy wyników...");
  try {
    if (!region || !quizType || !mode) {
      throw new Error("Nie wszystkie parametry są zdefiniowane.");
    }

    const leaderboardRef = doc(db, "leaderboard", `${region}_${quizType}_${mode}`);
    const leaderboardSnapshot = await getDoc(leaderboardRef);

    if (!leaderboardSnapshot.exists()) {
      console.warn("Nie znaleziono dokumentu leaderboard dla region:", region, "quizType:", quizType, "mode:", mode);
      return [];
    }

    console.log("Pobrano dane leaderboard:", leaderboardSnapshot.data());

    // Konwersja danych do tablicy
    const leaderboardData = Object.entries(leaderboardSnapshot.data()).map(([username, data]) => ({
      username,
      points: data.points,
    }));

    console.log(leaderboardData)

    // Sortowanie wyników w kolejności malejącej
    leaderboardData.sort((a, b) => b.points - a.points);

    console.log("Posortowane dane leaderboard:", leaderboardData);
    return leaderboardData;
  } catch (error) {
    console.error("Błąd podczas pobierania tablicy wyników:", error);
    throw new Error("Nie udało się pobrać tablicy wyników.");
  }
};

export { registerUser, loginUser, updateUserPoints, getLeaderboard };
