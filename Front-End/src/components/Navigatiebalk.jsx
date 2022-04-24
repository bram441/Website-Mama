import React from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import PhoneNavBar from "./PhoneNavBar";
import {
  ButtonGroup,
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import groenLogo from "../assets/images/groenLogo.png";

export default function Navigatiebalk() {
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#9DB0C6" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">
                <img className="logo" src={groenLogo} alt="Main" />
              </Link>
            </Typography>
            <div className="knopjes">
              <ButtonGroup
                size="large"
                color="primary"
                variant="text"
                aria-label="text button group"
              >
                <Button>
                  <Link to="/">Home</Link>
                </Button>
                <Button>
                  <Link to="/WieBenIkPagina">Wie ben ik?</Link>
                </Button>
                <Button>
                  <Link to="/Visie">Visie</Link>
                </Button>
                <Button>
                  <Link to="/Praktisch">Praktisch</Link>
                </Button>
                <Button>
                  <Link to="/Producten">Producten</Link>
                </Button>
              </ButtonGroup>
            </div>
            <Button color="inherit">
              <DropDownMenu />
            </Button>
            <Button id="PhoneNavButton" color="inherit">
              <PhoneNavBar />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}
