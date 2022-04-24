import { Redirect, Route, useLocation } from "react-router-dom";
import { useSession } from "../context/UserProvider";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthed } = useSession();
  const { pathname } = useLocation();
  return (
    <Route {...rest}>
      {isAuthed ? children : <Redirect from={pathname} to="/login" />}
    </Route>
  );
}
