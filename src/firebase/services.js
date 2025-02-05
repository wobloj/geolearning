import { auth, db } from "./firebase";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

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

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      console.log("Dane użytkownika z Firestore:", userData);

      setUsername(userData.username);
      setUserUid(user.uid);
      setIsLoggedIn(true);

      console.log("Zalogowano użytkownika:", user.uid);
    } else {
      throw new Error("Brak danych użytkownika w bazie.");
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    throw new Error(error.message || "Logowanie nie powiodło się.");
  }
};

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
    throw new Error("Rejestracja nie powiodła się.");
  }
};


const updateUserPoints = async (region, quizType, mode, points, username) => {
  const user = auth.currentUser;
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

    const leaderboardRef = doc(db, "leaderboard", `${region}_${quizType}_${mode}`);
    const leaderboardSnapshot = await getDoc(leaderboardRef);

    if (!leaderboardSnapshot.exists()) {
      console.warn("Dokument leaderboarda nie istnieje. Tworzę nowy.");
      await setDoc(leaderboardRef, {});
    }

    const leaderboardData = leaderboardSnapshot.data() || {};
    const currentPoints = leaderboardData[user.displayName]?.points || 0;

    if (points > currentPoints) {
      await updateDoc(leaderboardRef, {
      [`${user.uid}`]: { points, username },
    });
      console.log("Punkty zostały zaktualizowane w leaderboardzie:", username, points);
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

    const leaderboardData = Object.entries(leaderboardSnapshot.data()).map(([useruid, data]) => ({
      useruid,
      points: data.points,
      username: data.username,
    }));

    console.log(leaderboardData)

    leaderboardData.sort((a, b) => b.points - a.points);

    console.log("Posortowane dane leaderboard:", leaderboardData);
    return leaderboardData;
  } catch (error) {
    console.error("Błąd podczas pobierania tablicy wyników:", error);
    throw new Error("Nie udało się pobrać tablicy wyników.");
  }
};

const addToLearn = async (country) => {
  const user = auth.currentUser;

  const userRef = doc(db, "users", user.uid);
  
  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Aktualizacja listy krajów, jeśli dokument użytkownika istnieje
      if(userDoc.data().countries.includes(country)){
        return "Kraj jest już na liście nauki";
      }else{
        await updateDoc(userRef, {
        countries: arrayUnion(country)
      });
      }
      
    } else {
      // Tworzenie dokumentu użytkownika, jeśli jeszcze nie istnieje
      await setDoc(userRef, {
        countries: [country]
      });
    }

    console.log(`Dodano ${country} do listy nauki dla użytkownika ${user.uid}`);
  } catch (error) {
    console.error("Błąd podczas aktualizacji Firestore:", error);
  }
};

const getToLearn = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Użytkownik nie jest zalogowany.");
    return;
  }
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  
  if(userDoc.data().countries.length === 0){
    return "Brak krajów do nauki";
  }else{
    return userDoc.data().countries;
  }
}

const getUserData = async () =>{
  let username, email;
  const user = auth.currentUser;
  if (!user) {
    console.warn("Użytkownik nie jest zalogowany.");
    return;
  }
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
      const userData = userDoc.data();

      username = userData.username;
      email = user.email;

      console.log("Zalogowano użytkownika:", user.uid);
    } else {
      throw new Error("Brak danych użytkownika w bazie.");
    }
  return {username, email};
}

export { registerUser, loginUser, updateUserPoints, getLeaderboard, getUserData, addToLearn, getToLearn };
