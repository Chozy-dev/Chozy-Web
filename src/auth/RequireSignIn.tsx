import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthSession } from "./AuthSession";

export default function RequireSignIn() {
  const { signedIn } = useAuthSession();
  const { pathname, search, hash } = useLocation();

  if (signedIn) return <Outlet />;

  return <Navigate to="/login" replace state={{ returnTo: pathname + search + hash }} />;
}
