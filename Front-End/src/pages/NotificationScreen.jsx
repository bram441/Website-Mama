import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import Navigatiebalk from "../components/Navigatiebalk";
export default function NotificationScreen() {
  const location = useLocation();
  const { type, message } = location.state;
  return (
    <>
      <Navigatiebalk />
      <Alert variant="standard" severity={type}>
        {message}
      </Alert>
      <div className="backHome">
        <Button variant="contained">
          <Link to="/">Terug naar Home</Link>
        </Button>
      </div>
    </>
  );
}
