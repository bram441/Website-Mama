import { Redirect, Route, useLocation } from "react-router-dom";
import { useSession } from "../context/UserProvider";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthed, isAdmin } = useSession();
  const { pathname } = useLocation();
  let checker = false;
  if (isAuthed) {
    if (isAdmin) {
      checker = true;
    }
  }
  return (
    <Route {...rest}>
      {checker ? children : <Redirect from={pathname} to="/" />}
    </Route>
  );
}
