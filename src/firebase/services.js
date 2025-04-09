import { auth, db } from "./firebase";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const loginUser = async (email, password, context) => {
  const { setUsername, setIsLoggedIn, setUserUid } = context;

  try {
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

      setUsername(userData.username);
      setUserUid(user.uid);
      setIsLoggedIn(true);

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

    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      points: points,
    });

    console.log("Zarejestrowano i wysłano link weryfikacyjny:", user.uid);
  } catch (error) {
    console.error("Błąd rejestracji:", error.code, error.message);
    throw new Error("Rejestracja nie powiodła się.");
  }
};


const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Wysłano e-mail do resetowania hasła.");
  } catch (error) {
    console.error("Błąd podczas wysyłania e-maila do resetowania hasła:", error);
    throw new Error("Nie udało się wysłać e-maila do resetowania hasła.");
  }
}

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
      await setDoc(userRef, { points: {}, });
      console.log("Utworzono nowy dokument użytkownika:", user.uid);
    }

    const leaderboardRef = doc(db, "leaderboard", `${region}_${quizType}_${mode}`);
    const leaderboardSnapshot = await getDoc(leaderboardRef);

    if (!leaderboardSnapshot.exists()) {
      await setDoc(leaderboardRef, {});
      console.log("Utworzono nowy dokument leaderboarda:", region, quizType, mode);
    }

    const leaderboardData = leaderboardSnapshot.data() || {};
    const currentPoints = leaderboardData[user.uid]?.points || 0;

    console.log("Leaderboard data before update:", leaderboardData);
    console.log(`Current points for ${user.uid}: ${currentPoints}, new points: ${points}`);

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
        await updateDoc(userRef, {
        countries: arrayUnion(country)
      });

      
    } else {
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

export { registerUser, loginUser, updateUserPoints, getLeaderboard, getUserData, addToLearn, getToLearn, resetPassword };
