import { auth } from "../firebase/firebase";
import {
  loginUser,
  registerUser,
  updateUserPoints,
  getLeaderboard,
  getUserData,
  addToLearn,
  getToLearn,
} from "../firebase/services";

import {
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, getDoc, updateDoc } from "firebase/firestore";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  setPersistence: jest.fn(),
  browserLocalPersistence: "browserLocalPersistence",
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn((db, collection, id) => ({ db, collection, id })),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn((value) => [value]),
}));

describe("Testy funkcji Firebase", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

    describe("loginUser", () => {
    it("powinno zalogować użytkownika i ustawić dane w kontekście, jeśli dokument istnieje", async () => {
      const fakeUser = { uid: "12345" };
      const fakeUserCredential = { user: fakeUser };

      signInWithEmailAndPassword.mockResolvedValue(fakeUserCredential);
      setPersistence.mockResolvedValue();

      const fakeUserData = { username: "testUser" };
      const fakeDocSnapshot = {
        exists: () => true,
        data: () => fakeUserData,
      };
      getDoc.mockResolvedValue(fakeDocSnapshot);

      const context = {
        setUsername: jest.fn(),
        setIsLoggedIn: jest.fn(),
        setUserUid: jest.fn(),
      };

      await loginUser("test@example.com", "password123", context);

      expect(setPersistence).toHaveBeenCalledWith(auth, "browserLocalPersistence");
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, "test@example.com", "password123");
      expect(getDoc).toHaveBeenCalled();

      expect(context.setUsername).toHaveBeenCalledWith("testUser");
      expect(context.setUserUid).toHaveBeenCalledWith("12345");
      expect(context.setIsLoggedIn).toHaveBeenCalledWith(true);
    });

    it("powinno rzucić błąd, jeśli dokument użytkownika nie istnieje", async () => {
      const fakeUser = { uid: "12345" };
      const fakeUserCredential = { user: fakeUser };

      signInWithEmailAndPassword.mockResolvedValue(fakeUserCredential);
      setPersistence.mockResolvedValue();

      const fakeDocSnapshot = { exists: () => false };
      getDoc.mockResolvedValue(fakeDocSnapshot);

      const context = {
        setUsername: jest.fn(),
        setIsLoggedIn: jest.fn(),
        setUserUid: jest.fn(),
      };

      await expect(
        loginUser("test@example.com", "password123", context)
      ).rejects.toThrow("Brak danych użytkownika w bazie.");
    });
  });

  describe("registerUser", () => {
    it("powinno zarejestrować użytkownika i zapisać dane do Firestore", async () => {
      const fakeUser = { uid: "67890" };
      const fakeUserCredential = { user: fakeUser };

      createUserWithEmailAndPassword.mockResolvedValue(fakeUserCredential);
      setDoc.mockResolvedValue();

      await registerUser("newuser@example.com", "newpassword", "newUsername", 100);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "newuser@example.com",
        "newpassword"
      );
      expect(setDoc).toHaveBeenCalledWith(
        expect.any(Object),
        { username: "newUsername", points: 100 }
      );
    });

    it("powinno rzucić błąd, gdy rejestracja się nie powiedzie", async () => {
      createUserWithEmailAndPassword.mockRejectedValue(new Error("Registration Error"));

      await expect(
        registerUser("fail@example.com", "password", "failUser", 50)
      ).rejects.toThrow("Rejestracja nie powiodła się.");
    });
  });

  describe("updateUserPoints", () => {
    beforeEach(() => {
      auth.currentUser = { uid: "12345", displayName: "testDisplay" };
      jest.spyOn(console, "log").mockImplementation(() => {});
    });
    afterEach(() => {
      auth.currentUser = null;
    });

    it("powinno zaktualizować punkty, gdy nowe punkty są wyższe", async () => {
      const fakeUserDoc = { exists: () => true };
      getDoc.mockResolvedValueOnce(fakeUserDoc);

      const leaderboardData = { "12345": { points: 50 } };
      const fakeLeaderboardDoc = {
        exists: () => true,
        data: () => leaderboardData,
      };
      getDoc.mockResolvedValueOnce(fakeLeaderboardDoc);

      updateDoc.mockResolvedValue();

      await updateUserPoints("region1", "quiz1", "mode1", 100, "testUser");

      expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
        ["12345"]: { points: 100, username: "testUser" },
      });
    });

    it("nie powinno aktualizować punktów, gdy nowe punkty są mniejsze lub równe", async () => {
      const fakeUserDoc = { exists: () => true };
      getDoc.mockResolvedValueOnce(fakeUserDoc);

      const leaderboardData = { "12345": { points: 150 } };
      const fakeLeaderboardDoc = {
        exists: () => true,
        data: () => leaderboardData,
      };
      getDoc.mockResolvedValueOnce(fakeLeaderboardDoc);

      await updateUserPoints("region1", "quiz1", "mode1", 100, "testUser");

      expect(updateDoc).not.toHaveBeenCalled();
    });
  });

 describe("getLeaderboard", () => {
    it("powinno zwrócić posortowaną tablicę wyników", async () => {
      const fakeLeaderboardData = {
        user1: { points: 100, username: "User1" },
        user2: { points: 150, username: "User2" },
        user3: { points: 120, username: "User3" },
      };
      const fakeLeaderboardDoc = {
        exists: () => true,
        data: () => fakeLeaderboardData,
      };
      getDoc.mockResolvedValue(fakeLeaderboardDoc);

      const result = await getLeaderboard("region1", "quiz1", "mode1");

      expect(result).toEqual([
        { useruid: "user2", points: 150, username: "User2" },
        { useruid: "user3", points: 120, username: "User3" },
        { useruid: "user1", points: 100, username: "User1" },
      ]);
    });

    it("powinno zwrócić pustą tablicę, gdy dokument leaderboarda nie istnieje", async () => {
      const fakeLeaderboardDoc = { exists: () => false };
      getDoc.mockResolvedValue(fakeLeaderboardDoc);

      const result = await getLeaderboard("region1", "quiz1", "mode1");
      expect(result).toEqual([]);
    });

    it("powinno rzucić błąd, gdy brakuje wymaganych parametrów", async () => {
      await expect(getLeaderboard(null, "quiz1", "mode1")).rejects.toThrow(
        "Nie udało się pobrać tablicy wyników."
      );
    });
  });

  describe("addToLearn", () => {
    beforeEach(() => {
      auth.currentUser = { uid: "12345" };
    });
    afterEach(() => {
      auth.currentUser = null;
    });

    it("powinno zaktualizować dokument użytkownika, gdy istnieje", async () => {
      const fakeUserDoc = { exists: () => true };
      getDoc.mockResolvedValue(fakeUserDoc);

      updateDoc.mockResolvedValue();

      await addToLearn("Polska");

      expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
        countries: expect.anything()
      });
    });

    it("powinno utworzyć dokument użytkownika, gdy nie istnieje", async () => {
      const fakeUserDoc = { exists: () => false };
      getDoc.mockResolvedValue(fakeUserDoc);

      setDoc.mockResolvedValue();

      await addToLearn("Niemcy");

      expect(setDoc).toHaveBeenCalledWith(expect.any(Object), {
        countries: ["Niemcy"],
      });
    });
  });

  describe("getToLearn", () => {
    beforeEach(() => {
      auth.currentUser = { uid: "12345" };
    });
    afterEach(() => {
      auth.currentUser = null;
    });

    it("powinno zwrócić komunikat, gdy lista krajów jest pusta", async () => {
      const fakeUserDoc = { data: () => ({ countries: [] }) };
      getDoc.mockResolvedValue(fakeUserDoc);

      const result = await getToLearn();
      expect(result).toBe("Brak krajów do nauki");
    });

    it("powinno zwrócić listę krajów, gdy są dostępne", async () => {
      const fakeUserDoc = { data: () => ({ countries: ["Hiszpania", "Włochy"] }) };
      getDoc.mockResolvedValue(fakeUserDoc);

      const result = await getToLearn();
      expect(result).toEqual(["Hiszpania", "Włochy"]);
    });
  });

  describe("getUserData", () => {
    beforeEach(() => {
      auth.currentUser = { uid: "12345", email: "user@example.com" };
    });
    afterEach(() => {
      auth.currentUser = null;
    });

    it("powinno zwrócić dane użytkownika, gdy dokument istnieje", async () => {
      const fakeUserData = { username: "testUser" };
      const fakeUserDoc = {
        exists: () => true,
        data: () => fakeUserData,
      };
      getDoc.mockResolvedValue(fakeUserDoc);

      const result = await getUserData();
      expect(result).toEqual({ username: "testUser", email: "user@example.com" });
    });

    it("powinno rzucić błąd, gdy dokument użytkownika nie istnieje", async () => {
      const fakeUserDoc = { exists: () => false };
      getDoc.mockResolvedValue(fakeUserDoc);

      await expect(getUserData()).rejects.toThrow("Brak danych użytkownika w bazie.");
    });
  });
});