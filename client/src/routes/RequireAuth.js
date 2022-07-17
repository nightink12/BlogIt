import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const authed = userAuth();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
