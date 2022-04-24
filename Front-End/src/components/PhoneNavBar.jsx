import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function PhoneNavBar() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Button>
            <Link to="/">home</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button>
            <Link to="/WieBenIkPagina">Wie ben ik?</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button>
            <Link to="/Visie">Visie</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button>
            <Link to="/Praktisch">Praktisch</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button>
            <Link to="/Producten">Producten</Link>
          </Button>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default PhoneNavBar;
