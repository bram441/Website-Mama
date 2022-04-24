import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link, useHistory } from "react-router-dom";
import { useLogout, useDelete } from "../context/UserProvider";
import { useSession } from "../context/UserProvider";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const logout = useLogout();
  const deleteUser = useDelete();
  const open = Boolean(anchorEl);
  const { isAuthed, voornaam, user } = useSession();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const succes = logout();
    if (succes) {
      history.replace("/");
    }
  };

  const handleDeleteAccount = () => {
    deleteUser(user.userId);
    logout();
    history.push({
      pathname: "/NotificationScreen",
      state: { type: "success", message: "Gebruiker verwijderd" },
    });
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <p>{voornaam}</p>
      <Menu
        className="dropdown"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled={true}>
          <Avatar /> Profile (werkt nog niet)
        </MenuItem>
        <MenuItem disabled={!isAuthed}>
          <Avatar />
          <button class="links" onClick={handleDeleteAccount}>
            <li>Delete my account</li>
          </button>
        </MenuItem>
        <Divider />
        <MenuItem disabled={isAuthed}>
          <ListItemIcon></ListItemIcon>
          <Link class="links" to="/Login">
            <li>Login</li>
          </Link>
        </MenuItem>
        <MenuItem disabled={!isAuthed}>
          <ListItemIcon></ListItemIcon>
          <button class="links" onClick={handleLogout}>
            <li>Logout</li>
          </button>
        </MenuItem>
        <MenuItem disabled={isAuthed}>
          <ListItemIcon></ListItemIcon>
          <Link class="links" to="/register">
            <li>Register</li>
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
