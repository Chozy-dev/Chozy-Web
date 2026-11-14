import { createContext, useContext, useState, type ReactNode } from "react";

const SESSION_KEY = "chozy:dev-login";

interface AuthSession {
  signedIn: boolean;
  signIn: (id: string, password: string) => boolean;
  signOut: () => void;
}

const AuthSessionContext = createContext<AuthSession | null>(null);

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    if (!import.meta.env.DEV) return false;

    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  function signIn(id: string, password: string) {
    // 인증 API 연동 전 화면 흐름을 확인하는 개발 서버 전용 계정.
    if (!import.meta.env.DEV || id !== "admin" || password !== "1111") return false;

    setSignedIn(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // 저장소를 사용할 수 없으면 현재 페이지에서만 로그인 상태를 유지한다.
    }
    return true;
  }

  function signOut() {
    setSignedIn(false);
    if (!import.meta.env.DEV) return;

    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // 저장소에 접근할 수 없는 경우에도 현재 페이지에서는 로그아웃한다.
    }
  }

  return (
    <AuthSessionContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const session = useContext(AuthSessionContext);
  if (!session) throw new Error("AuthSessionProvider가 필요합니다.");
  return session;
}
